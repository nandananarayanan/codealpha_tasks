const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const searchBox = document.getElementById('search');

let isPlaying = false;
let currentSongIndex = 0;
const songs = Array.from(playlist.getElementsByTagName('li'));

function loadSong(index) {
  songs.forEach((song, i) => song.classList.toggle('active', i === index));
  audioPlayer.src = songs[index].dataset.file;
}

function togglePlayPause() {
  isPlaying ? audioPlayer.pause() : audioPlayer.play();
  playPauseBtn.textContent = isPlaying ? '▶️' : '⏸️';
  isPlaying = !isPlaying;
}

function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸️';
}

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸️';
}

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrevious);
volumeControl.addEventListener('input', (e) => {
  audioPlayer.volume = e.target.value;
});

playlist.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    currentSongIndex = songs.indexOf(e.target);
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸️';
  }
});

searchBox.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();
  songs.forEach(song => {
    song.style.display = song.textContent.toLowerCase().includes(searchText) ? '' : 'none';
  });
});

loadSong(currentSongIndex);



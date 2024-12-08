const books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", borrowed: false },
    { title: "1984", author: "George Orwell", category: "Dystopian", borrowed: false },
    { title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", borrowed: false },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", borrowed: false },
    { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", borrowed: false },
    { title: "Dune", author: "Frank Herbert", category: "Science Fiction", borrowed: false },
    { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "History", borrowed: false },
    { title: "The Da Vinci Code", author: "Dan Brown", category: "Thriller", borrowed: false },
    { title: "Atomic Habits", author: "James Clear", category: "Self-help", borrowed: false },
    { title: "War and Peace", author: "Leo Tolstoy", category: "Historical Fiction", borrowed: false },
  ];
  
  const borrowHistory = [];
  
  document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
  });
  
  document.getElementById('add-book').addEventListener('click', () => {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const category = document.getElementById('book-category').value;
  
    if (title && author && category) {
      const book = { title, author, category, borrowed: false };
      books.push(book);
      displayBooks();
      clearForm();
    } else {
      alert('Please fill all fields');
    }
  });
  
  document.getElementById('search-bar').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    displayBooks(query);
  });
  
  function displayBooks(query = '') {
    const bookList = document.getElementById('books');
    bookList.innerHTML = '';
    books
      .filter(book => book.title.toLowerCase().includes(query))
      .forEach((book, index) => {
        const bookItem = document.createElement('li');
        bookItem.textContent = `${book.title} by ${book.author} [${book.category}]`;
        const borrowButton = document.createElement('button');
        borrowButton.textContent = book.borrowed ? 'Return' : 'Borrow';
        borrowButton.addEventListener('click', () => toggleBorrow(index));
        bookItem.appendChild(borrowButton);
        bookList.appendChild(bookItem);
      });
  }
  
  function toggleBorrow(index) {
    books[index].borrowed = !books[index].borrowed;
    const action = books[index].borrowed ? 'Borrowed' : 'Returned';
    borrowHistory.push(`${action} "${books[index].title}"`);
    displayBooks();
    displayHistory();
  }
  
  function displayHistory() {
    const historyList = document.getElementById('history');
    historyList.innerHTML = '';
    borrowHistory.forEach(entry => {
      const historyItem = document.createElement('li');
      historyItem.textContent = entry;
      historyList.appendChild(historyItem);
    });
  }
  
  function clearForm() {
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-category').value = '';
  }
  
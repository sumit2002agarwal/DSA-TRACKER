
class Book {
    constructor(quesno,ques,links) {
      this.quesno=quesno;
      this.ques=ques;
      this.links=links;
    }
  }
  
  
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.quesno}</td>
        <td>${book.ques}</td>
        <td>${book.links}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
     
      setTimeout(() => document.querySelector('.alert').remove(), 500);
    }
  
    static clearFields() {
      document.querySelector('#quesno').value = '';
      document.querySelector('#ques').value = '';
      document.querySelector('#links').value = '';
    }
  }
  
  
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(links) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.links === links) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
 
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    
    e.preventDefault();
  
   
    const quesno= document.querySelector('#quesno').value;
    const ques = document.querySelector('#ques').value;
    const links= document.querySelector('#links').value;
  
   
    if(quesno === '' || ques === '' || links === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      
      const book = new Book(quesno,ques,links);
  
     
      UI.addBookToList(book);
  
     
      Store.addBook(book);
  
     
      UI.showAlert('Question Added', 'success');
  
      
      UI.clearFields();
    }
  });
  
 
  document.querySelector('#book-list').addEventListener('click', (e) => {
    
    UI.deleteBook(e.target);
  
    
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
  
    UI.showAlert('Question Removed', 'success');
  });

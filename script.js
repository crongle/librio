///////////// Global Variables ///////////////

let bookLibrary = []; // initialises book library

///////////// Objects ///////////////

function Book(title, author, pages, status) { // constructor for the book object
  this.id = bookLibrary.length;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;

  this.info = function() { // generates single line detailing each book
    let bookSummary = (title + " by " + author + ", " + pages + " pages, " + status);
    return bookSummary
  }

  this.toggleStatus = function(id) {
    this.status = !this.status
  }

  this.card = function() { // generates DOM output for each book card
    const container = document.querySelector('.cardContainer');
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');
    bookCard.id = this.id;

    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const status = document.createElement('div');
    const removeBook = document.createElement('div');

    title.classList.add('bookCardTitle');
    author.classList.add('bookCardAuthor');
    pages.classList.add('bookCardPages');
    status.classList.add('bookCardStatus');
    removeBook.classList.add('bookCardDelete');

    title.textContent = this.title;
    author.textContent = this.author;
    pages.textContent = this.pages + " pages";
    //status.textContent = this.status
    if (this.status == true) {
      status.textContent = "Read";
      status.classList.add('bookCardStatusRead');
      status.classList.remove('bookCardStatusUnread');
    }
    else {
      status.textContent = "Unread";
      status.classList.add('bookCardStatusUnread');
      status.classList.remove('bookCardStatusRead');
    }

    status.setAttribute("onclick", "updateStatus(" + bookCard.id + ")");
    removeBook.textContent = "Remove from library";
    removeBook.setAttribute("onclick", "removeBookFromLibrary(" + bookCard.id + ")");


    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(status);
    bookCard.appendChild(removeBook);

    container.appendChild(bookCard);
  }
}

///////////// Functions ///////////////

function addBookToLibrary() { // generates and adds books to library
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var pages = document.getElementById("pages").value;
  var status = document.getElementById("status").value;
  document.getElementById("addBook").reset();
  let newBook = ("book" + bookLibrary.length);
  const book = new Book(title, author, pages, status);
  bookLibrary.push(book);
  outputLibrary();
}

function removeBookFromLibrary(id) { //removes selected book from library
  let toRemove = bookLibrary.find(book => book.id == id);
  bookLibrary.splice(bookLibrary.indexOf(toRemove), 1);
  outputLibrary();
}

function updateStatus(id) {
  let toToggle = bookLibrary.find(book => book.id == id);
  bookLibrary[bookLibrary.indexOf(toToggle)].toggleStatus();
  outputLibrary();
}

function outputLibrary() { // updates the bookCards on display based on current library
  const container = document.querySelector(".cardContainer");
  let child = document.getElementsByClassName("bookCard");
  while(child[0]) { // Loop removes the entirity of the previous DOM
    child[0].parentNode.removeChild(child[0]);
  }

  bookLibrary.forEach(function(element) { // outputs books in library
    element.card();
    console.log(this.id);
  });
}

///////////// Setup ///////////////

function manuallyAddBookToLibrary(title, author, pages, status) { // generates and adds books to library
  let newBook = ("book" + bookLibrary.length)
  const book = new Book(title, author, pages, status)
  bookLibrary.push(book)
}
manuallyAddBookToLibrary("The Hobbit", "J. R. Tolkein", 294, true) // manually add 3 books to library for testing
manuallyAddBookToLibrary("1984", "George Orwell", 198, false)
manuallyAddBookToLibrary("Mr Nice", "Howard Marks", 230, true)

outputLibrary();
console.log(bookLibrary)

///////////// Main ///////////////

function openPopupForm() {
  document.getElementById("addBookPopup").style.display = "block";
}

function closePopupForm() {
  document.getElementById("addBookPopup").style.display = "none";
}

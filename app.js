const addBtn = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".close")
const submitBtn = document.querySelector(".submit");
let title = "";
let author = "";
let pages = "";
let read = "";
// array of books
const myLibrary = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}



function addBookToLibrary() {
    let newBook = new book(title, author, pages, read);
    myLibrary.push(newBook)
    createCard(newBook);

}

function createCard(newBook) {
    let cardHtml = `
 
    <div class="content">
          <label for="title">Title<h2 class="title">${newBook.title}</h2></label>
          <label for="author">Author<p class="author">${newBook.author}</p></label>
          <label for="pages">Pages<p class="pages">${newBook.pages}</p></label>
          <div class="btn"><button class="read">${newBook.read}</button>  <button class="Edit">Edit</button></div>
    </div>`;
    console.log(myLibrary)
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = cardHtml;
    console.log(card)
    document.querySelector(".cards").appendChild(card);
}

function getReadStatus() {
    readLoop = document.getElementsByName("ReadStatus");
    for (let i = 0; i < readLoop.length; i++) {
        if (readLoop[i].checked)
            return readLoop[i].value;
    }
}

addBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeDialog.addEventListener("click", () => {
    dialog.close();
})

submitBtn.addEventListener("click", () => {
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    read = getReadStatus();
    addBookToLibrary();
})


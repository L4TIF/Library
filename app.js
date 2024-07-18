const addBtn = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".close")
const submitBtn = document.querySelector(".submit");
let title = "Game Of Thrones";
let author = "Unknown";
let pages = "500";
let read = "Completed";
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
    traverseLibrary();
}
addBookToLibrary();  //calling it first time so there will be one card by default.




function traverseLibrary() {
    document.querySelector(".cards").innerHTML = "";
    for (const iterator of myLibrary) {
        console.log(iterator)
        createCard(iterator)
    }
}

// creating card
function createCard(iterator) {
    let cardHtml = `  
    <div class="content">
          <label for="title">Title<h2 class="title">${iterator.title}</h2></label>
          <label for="author">Author<p class="author">${iterator.author}</p></label>
          <label for="pages">Pages<p class="pages">${iterator.pages}</p></label>
          <div class="btn"><button class="read">${iterator.read}</button>  <button class="Edit">Edit</button></div>
    </div>`;
    console.log(myLibrary)
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = cardHtml;
    document.querySelector(".cards").appendChild(card);

}

function getReadStatus() {
    readLoop = document.getElementsByName("ReadStatus");
    for (let i = 0; i < readLoop.length; i++) {
        if (readLoop[i].checked)
            return readLoop[i].value;
    }
}


// resetting form after clicking OK
function resetForm() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
}

addBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeDialog.addEventListener("click", () => {
    dialog.close();
    resetForm();
})

submitBtn.addEventListener("click", () => {
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    read = getReadStatus();
    if ((title && author && pages)) {
        addBookToLibrary();
        resetForm();
        dialog.close();
    }
    else
        window.alert("Enter all fields")

})


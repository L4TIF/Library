const addBtn = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".close")
const submitBtn = document.querySelector(".submit");

let title;
let author;
let pages;
let read;
// array of books
const myLibrary = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//calling it first time so there will be one card by default.
let newBook = new book("Game Of Thrones", "Unknown", "500", "COMPLETED");
myLibrary.push(newBook)
traverseLibrary(myLibrary);


function addBookToLibrary() {
    let newBook = new book(title, author, pages, read);
    myLibrary.push(newBook)
}

function traverseLibrary() {
    document.querySelector(".cards").innerHTML = "";
    for (const iterator of myLibrary) {
        createCard(iterator)
    }
    handleDelete();
    handleToggle();
}

// creating card
function createCard(iterator) {
    let cardHtml = `  
    <div class="content">
          <label for="title">Title<h2 class="title">${iterator.title}</h2></label>
          <label for="author">Author<p class="author">${iterator.author}</p></label>
          <label for="pages">Pages<p class="pages">${iterator.pages}</p></label>
          <div class="btn"><button class="read">${iterator.read}</button>  <button class="Delete">DELETE</button></div>
    </div>`;
    console.log(myLibrary)
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = cardHtml;
    document.querySelector(".cards").appendChild(card);
    // adding index to card to identify and delete
    card.setAttribute("data-index", myLibrary.indexOf(iterator));

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

submitBtn.addEventListener("click", (e) => {
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    read = getReadStatus();
    if ((title && author && pages)) {
        addBookToLibrary();
        traverseLibrary(myLibrary);
        resetForm();
        dialog.close();
        e.preventDefault();
    }
    else
        window.alert("Enter all fields")

})

function handleToggle() {
    // adding Event listener to buttons
    let readStatusBtn = document.querySelectorAll(".read");

    // toggle read status
    readStatusBtn.forEach(element => {
        element.addEventListener("click", (e) => {
            let index = e.target.parentNode.parentNode.parentNode.getAttribute("data-index");

            myLibrary[index].read === "COMPLETED" ?
                myLibrary[index].read = "READING" :
                myLibrary[index].read = "COMPLETED";
            traverseLibrary(myLibrary)
        })
    });

}

// handles book deletion
function handleDelete() {
    let deleteBtn = document.querySelectorAll(".Delete");
    deleteBtn.forEach(element => {
        element.addEventListener('click', (e) => {

            let index = e.target.parentNode.parentNode.parentNode.getAttribute("data-index");
            myLibrary.splice(index,1)
            // re-render book cards after deletion
            traverseLibrary(myLibrary);
        });
    });

}


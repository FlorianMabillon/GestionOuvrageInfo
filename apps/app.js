let selectAuthors = document.querySelector('#selectAuthors');
let selectCategories = document.querySelector('#selectCategories');
let infoBooks = document.querySelector('#infoBooks');
const main = document.querySelector('main');
const template = document.querySelector('#template-info');

fetch("data/books.json")
.then((response) => response.json())
.then((data) => allApply(data))


function allApply(data){
    selectListBooks(data)
    selectListCategory(data)
    monoSelection()
    imgBooks(data)
}

function selectListBooks(data){

    let authors = [];
    let listAuthors = '<option value="">Sélectionner un auteur</option>'

    data.forEach(books => {
        
        books.authors.forEach(author => {
            if (!authors.includes(author) && author != "") {
                authors.push(author);
            }    
        });
    });

    authors.sort();

    for (const author of authors) {
        
        listAuthors +=`
        <option value="${author}">${author}</option>
        `
    }
    selectAuthors.innerHTML = listAuthors;
}


function selectListCategory(data){

    let categories = [];
    let listCategories = '<option value="">Sélectionner une catégorie</option>'

    data.forEach(books => {
        
        books.categories.forEach(category => {
            if (!categories.includes(category) && category != "") {
                categories.push(category);
            }    
        });
    });

    categories.sort();

    for (const category of categories) {
        
        listCategories +=`
        <option value="${category}">${category}</option>
        `
    }
    selectCategories.innerHTML = listCategories;
}



function monoSelection(){
    
    selectAuthors.addEventListener("change", (e) => {choiceAuthors(e)})
    selectCategories.addEventListener("change",(e) => {choiceCategories(e)})

    function choiceAuthors() {
        selectCategories.value = "";
    }
    
    function choiceCategories() {
        selectAuthors.value = "";
}
}

function imgBooks(data){

for(let book of data){
    const clone = document.importNode(template.content, true)
    const imgBook = clone.querySelector('#imgBook')
    const h2 = clone.querySelector('h2')
    const isbn = clone.querySelector('#p-isbn')
    const publishedDate = clone.querySelector('#p-publishedDate')
    const pageCount = clone.querySelector('#p-pageCount')
    const shortDescription = clone.querySelector('#p-shortDescription')

    if (book.isbn) {
        isbn.textContent = book.isbn
    }

    if (book.publishedDate) {
    publishedDate.textContent = book.publishedDate.dt_txt
    }
    imgBook.src = book.thumbnailUrl
    h2.textContent = book.title
    pageCount.textContent = book.pageCount
    shortDescription.textContent = book.shortDescription
    main.appendChild(clone)

}

function selectionAuthor(){
    
}

function selectionCategory(){

}


    // let books = [];
    // listBooks = '';

    // data.forEach(books => {
        
        
        
    //     listBooks += `
    //         <img src="${books.thumbnailUrl}" alt="">
    //         <h2>${books.title}</h2>
    //         <p>${books.isbn}</p>
    //         <p>${books.publishedDate ? books.publishedDate.dt_txt : undefined}</p>
    //         <p>${books.pageCount}</p>
    //         <p>${books.shortDescription}</p>
    //     `
    //     console.log(books.publishedDate);
    // })
    // infoBooks.innerHTML = listBooks
}
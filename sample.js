
window.onload = () => {

    // Book class to crete multiple instance of books object
    class Books {
        constructor(title, auther, msbn){

            this.title = title;
            this.auther = auther;
            this.msbn = msbn; //unique id

        }
    }


    // UI Features, add, delete, validation, success / error msg
    // Crete static class

    class UIFeatures {

        static displayBooks(){            
            let books = LocalStore.getBooks();
           // console.log('books loaded==',books);
            books.forEach( book => {
                UIFeatures.addBook(book);
            });
        }

        static addBook(book){

            let table = document.querySelector('#itemList');

            let tr = document.createElement('tr');

            table.appendChild(tr).innerHTML = `<td>${book.title}</td><td>${book.auther}</td><td>${book.msbn}</td><td><button class="delete">X</button></td>`;
            //console.log('book=',book);
        }

        static deleteBook(bookElement){
            bookElement.target.parentElement.parentElement.remove();
        }

        static clearFields(){

            document.querySelector('#title').value = '';
            document.querySelector('#author').value = '';
            document.querySelector('#msbn').value = '';

        }

        static showMessage(msg){
            document.querySelector('#msg').innerHTML = msg;
        }

    }

    // Local Storage
    class LocalStore {

        static addBook(book){

            let books = this.getBooks();
            books.push(book)
            localStorage.setItem('bookList',JSON.stringify(books));

        }  
        
        static getBooks(){
            return localStorage.getItem('bookList') ? JSON.parse(localStorage.getItem('bookList')):[];
        }

        static deleteBook(bookElement){

            let books = this.getBooks();
            let msbn = bookElement.target.parentElement.previousElementSibling.textContent;
            let updatedBooks = books.filter(book => book.msbn != msbn);
            localStorage.setItem('bookList',JSON.stringify(updatedBooks));
            

        }

    }

    // Displays books on DOM content loaded
    UIFeatures.displayBooks();

    // Add event
    document.querySelector('.content').addEventListener('click', (e)=>{

        e.preventDefault();

        
        if(e.target.classList.contains('save')){
            //alert('save');
            let title = document.querySelector('#title').value;
            let author = document.querySelector('#author').value;
            let msbn = document.querySelector('#msbn').value;

            // validations
            if(title == "" || author == "" || msbn == ""){
                alert('All fields are requred!');
                return;
            }
    
            // Add book in UI
            let book = new Books(title, author, msbn);
            UIFeatures.addBook(book);
            LocalStore.addBook(book);
            UIFeatures.clearFields(book);
            UIFeatures.showMessage('book added successfully!');
    
           // console.log(`${title} ${author} ${msbn}`);
        }
        else if(e.target.classList.contains('delete')){
            // delete book from UI
            UIFeatures.deleteBook(e);
            LocalStore.deleteBook(e);
            UIFeatures.showMessage('book deleted successfully!');
        }
        

    });

    // Search feature
    function searchBooks(){
        
        console.log(args);  // Get arguments value       
                

        let table = document.querySelectorAll('#itemList tr');
        outputHtml = '';
        table.forEach((row, index)=>{      
            if(index == 0) return; // to manage table header / titles
            if(row.textContent.toLowerCase().indexOf(this.value.toLowerCase()) !== -1){
                //console.log(row.textContent);                
                autocomplete.style.display = '';
                outputHtml += `<li> ${row.firstElementChild.textContent} </li>`;
                if(this.value == ''){
                    outputHtml = '';
                }
                row.style.display = '';
            }else{
                row.style.display = 'none';
            }
        });       
        autocomplete.innerHTML = outputHtml;
        if(this.value == '') {
            autocomplete.style.display = 'none';            
        }
    }
    
    function deBounceSearch(fun, delay){        
        let timer;    
        args = {pgtest:'pranay', test:'kk'} ; //pass arguments

        return function(){
            const searchText = document.querySelector('#search').value;
            clearTimeout(timer);   
            timer = setTimeout(()=>{                
                fun.apply(this, args);
            }, delay);
        }       

    }

    const searchWrapper = deBounceSearch(searchBooks, 500, 'pgtest');

    document.querySelector('#search').addEventListener('keyup', searchWrapper);

    let autocomplete = document.querySelector('.autocomplete');
    let outputHtml = '';

    if(outputHtml == '') {
        autocomplete.style.display = 'none';
    }  
    
    // On mouseover change rgb color using Throttling approach
    let changeBackgroundColor = () => {       
        
        console.log(event.clientX);
         
        document.querySelector('.dynamicColor').style.backgroundColor = `rgba(${event.clientX+75}, ${event.clientY}, 0, 0.8)`;
    }

    document.querySelector('.dynamicColor').addEventListener("mouseover", changeBackgroundColor);

}


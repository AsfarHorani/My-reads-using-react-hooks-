import React from 'react';

const searchPage = (props)=>{


const setShelf=(event,book)=>{
    let updatedShelf= event.target.value
    props.changeShelf(book,updatedShelf)
    

}

const inputChangedHandler = (event)=>{

    let query = event.target.value;
    props.searchBooks(query)

    
}

let books = <h2>No result</h2>

if (props.books && props.books.length>0)
{
  books = props.books.map(book=>
    {
    return(
    <li key={book.id} >
     <div className="book" >
      <div className="book-top" >
        <div  className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
        <div   className="book-shelf-changer">
          <select value={book.shelf} onChange={(event)=>setShelf(event,book)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  </li>



  )})
}



    return (
        <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={props.back}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
        
        <input placeholder="Seach by title or author " onChange={(event)=>inputChangedHandler(event)}  type="tel"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {books}
          </ol>
        </div>
      </div>
    )
}


export default searchPage
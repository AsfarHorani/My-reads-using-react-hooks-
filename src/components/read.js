import React from 'react';

const read=(props)=>{

    let books =<h1>Empty</h1>
    let updatedShelf;
     
    const setShelf=(event,book)=>{
        updatedShelf= event.target.value
        props.changeShelf(book,updatedShelf)
        

    }
    
    if (props.books)
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


    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {books}
         </ol>
        </div>
      </div>


    )
}

export default read
import React,{useState} from 'react';
import * as BooksAPI from '../BooksAPI'
const SearchPage = (props)=>{

  const [books,setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

 const searchBooksHandler=(query)=>{
  const timer = setTimeout(() => {
    setLoading(true)
   BooksAPI.search(query)
   .then(resData=>{
     console.log(resData)
     setBooks(resData)
     setLoading(false)
  
   }).catch(err=>{
     console.log(err)
     setLoading(false)
   })
  },500)
  return () => {
    clearTimeout(timer);
  };

  }

const setShelf=(event,book)=>{
    let updatedShelf= event.target.value
    console.log(book)
    props.addNewBook(book,updatedShelf)
    
}

const inputChangedHandler = (event)=>{

    let query = event.target.value;
    searchBooksHandler(query)

    
}

let searchedBooks = <h2>No result</h2>

if(loading)
{
  searchedBooks= <h2>Loading...</h2>
}

if (books &&books.length>0)
{
  searchedBooks = books.map(book=>
    {
    return(
    <li key={book.id} >
     <div className="book" >
      <div className="book-top" >
        <div  className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
        <div   className="book-shelf-changer">
        <select value={book.shelf || 'none'} onChange={(event)=>setShelf(event,book)} >
                <option value="move" disabled>Move to...</option>
                <option  value="currentlyReading">Currently Reading</option>
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
              {searchedBooks}
          </ol>
        </div>
      </div>
    )
}


export default SearchPage
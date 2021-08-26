import React,{useEffect, useState, Fragment} from 'react';
import CurrentlyReading from './currentlyReading'
import WantToRead from './wantToRead'
import Read from './read'
import {Link} from 'react-router-dom'
const Home = (props)=>{
 
 const [currentlyReading,setCurrentlyReading] = useState([]);
 const [wantsToRead,setWantsToRead] = useState([]);
 const [read, setRead] = useState([]);
 


 useEffect(() => {
 
  let updatedCurrentlyReading=[];
  let updatedWantsToRead=[];
  let updatedRead= []
props.books.forEach(book=>{
  
  if(book.shelf==='currentlyReading'){
    updatedCurrentlyReading.push(book)
    setCurrentlyReading(updatedCurrentlyReading)
  }
  else if(book.shelf==='wantToRead')
  {
    updatedWantsToRead.push(book)
    setWantsToRead(updatedWantsToRead)
  }
  else if(book.shelf==='read')
  {
    updatedRead.push(book)
    setRead(updatedRead)
  }

})
    },[props.books])


    let app =(  <div className="list-books">
    <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <h2>Loading...</h2>;
  </div>)
  if(!props.loading)
    {app= (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentlyReading changeShelf={props.changeShelfHandler} books = {currentlyReading}/>
            <WantToRead changeShelf={props.changeShelfHandler} books={wantsToRead}/>
            <Read changeShelf={props.changeShelfHandler} books={read}/>
          </div>
        </div>
       
      </div>)
    }

    return(
      <Fragment>
      <div className="open-search">
      <Link to='/search'>
        <button>Add a book</button>
        </Link>
      </div>   
     { app}
      </Fragment>
      )
}

export default Home
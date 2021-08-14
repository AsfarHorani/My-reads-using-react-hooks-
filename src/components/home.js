import React from 'react';
import CurrentlyReading from './currentlyReading'
import WantToRead from './wantToRead'
import Read from './read'
import {Link} from 'react-router-dom'
const home = (props)=>{

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
            <CurrentlyReading changeShelf={props.changeShelfHandler} books = {props.currentlyReading}/>
            <WantToRead changeShelf={props.changeShelfHandler} books={props.wantToRead}/>
            <Read changeShelf={props.changeShelfHandler} books={props.read}/>
          </div>
        </div>
        <div className="open-search">
        <Link to='/search'>
          <button>Add a book</button>
          </Link>
        </div>
      </div>)
    }

    return(app)
}

export default home
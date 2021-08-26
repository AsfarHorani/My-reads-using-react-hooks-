import React, { useEffect, useState  } from 'react'
import { useHistory } from 'react-router-dom';
 import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/search';
import {Route, Switch} from 'react-router-dom'
import Home from  './components/home'



const BooksApp = props => {
  const history = useHistory();
  const [books,setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    console.log('Rendering App...')
    getAllBooks()
  }, []);






  const  getAllBooks=()=>{
    setLoading(true)
    BooksAPI.getAll()
    .then(books=>{
      setLoading(false)
    
      setBooks(books)
    }).catch(err=>{
      setLoading(false)
      console.log(err)
    })
  }



const addNewBook=(book,shelf)=>{
  console.log(shelf)
  BooksAPI.update(book,shelf)
  
  .then(resData=>{
    
    console.log(resData)
    getAllBooks()
   
  })
  .catch(err=>{
    console.log(err)
  })
}

const changeShelfHandler=(book,shelf)=>{
 
  BooksAPI.update(book,shelf)
  .then(resData=>{

    let updatedBooks = books.map(b=>{if(book.id===b.id){
    let updatedBook = b;
    updatedBook.shelf = shelf;
    return updatedBook
   }
   else {return b}

  
   })
  
   setBooks(updatedBooks)
  }).catch(err=>{
    console.log(err)
  })
}

const close=()=>{
  history.push("/")
}


     
    return (  <div className="app">
       
        <Switch>
        <Route path='/' exact render={(props)=><Home {...props}    loading={loading} books={books}  changeShelfHandler={changeShelfHandler}/>}/>
          <Route path='/search' render={(props)=> <Search back={close} {...props} loading={loading}  addNewBook={addNewBook}  />}/>
       
          </Switch>
      </div>
    )
  }


export default  BooksApp

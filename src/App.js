import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/search';
import {Route, Switch, withRouter} from 'react-router-dom'
import Home from  './components/home'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReading:[],
    wantToRead:[],
    read:[],
    searchResult:[],
   // showSearchPage: false,
    loading: false
  }

  searchBooksHandler=(query)=>{
   BooksAPI.search(query)
   .then(resData=>{
     console.log(resData)
    this.setState({searchResult: resData})
   })
  }
  getAllBooks(){
    this.setState({loading: true})
    BooksAPI.getAll()
    .then(books=>{
      this.setState({loading: false})
      console.log(books)
      books.forEach(book => {
      
       if(book.shelf==='currentlyReading'){
  
         this.setState(prevState=>{
           let updatedShelf = [...prevState.currentlyReading]
           updatedShelf = updatedShelf.concat(book);
          
           return{
             currentlyReading: updatedShelf
           }
         })
       }else if(book.shelf==='wantToRead')
       {
        this.setState(prevState=>{
          let updatedShelf = [...prevState.wantToRead]
          updatedShelf = updatedShelf.concat(book);
         
          return{
            wantToRead: updatedShelf
          }
        })
       }else if(book.shelf==='read')
       {
        this.setState(prevState=>{
          let updatedShelf = [...prevState.read]
          updatedShelf = updatedShelf.concat(book);
         
          return{
            read: updatedShelf
          }
        })
       }
      });
      
    }).catch(err=>{
      console.log(err)
    })
  }
  
componentDidMount(){
  this.getAllBooks()
}

changeShelfHandler=(book,shelf)=>{
 
 BooksAPI.update(book,shelf)
 .then(resData=>{
   this.setState({currentlyReading:[],wantToRead:[],read:[]})
  this.getAllBooks()

  }).catch(err=>{
    console.log(err)
  })
}

close=()=>{
  this.props.history.push("/")
}

  render() {

   
     
    return (  <div className="app">
          
        <Switch>
        <Route path='/' exact render={(props)=><Home {...props}    loading={this.state.loading} wantToRead={this.state.wantToRead} currentlyReading={this.state.currentlyReading} read={this.state.read}  changeShelfHandler={this.changeShelfHandler}/>}/>
          <Route path='/search' render={(props)=> <Search back={this.close} {...props} loading={this.state.loading} wantToRead={this.state.wantToRead} currentlyReading={this.state.currentlyReading} read={this.state.read}  changeShelf={this.changeShelfHandler} books={this.state.searchResult} searchBooks={this.searchBooksHandler}/>}/>
       
          </Switch>
      </div>
    )
  }
}

export default  withRouter(BooksApp)

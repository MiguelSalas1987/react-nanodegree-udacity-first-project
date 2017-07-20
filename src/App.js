import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link, Route} from 'react-router-dom'
import './App.css'
import Search from './Search'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            books: []
        }

    }

    getAll = () => {
        BooksAPI.getAll().then( (books) => (this.setState({ books }) ) )
    }

    componentDidMount() {
        this.getAll()
    }

    filterForBookshelf(books, shelf) {
       return  books.filter( (book) =>(book.shelf === shelf))
    }

    isPresentInShelves = (book) => {
        let result = this.state.books.filter( (bookInState ) => (bookInState.id ===  book.id))
        return result.length > 0
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then( (result) => {

            book.shelf = shelf
            if( this.isPresentInShelves(book) ) {
                this.setState({ books: this.replace(book)})
            } else {
                this.setState({ books: this.state.books.concat(book) })
            }

        })
    }



    replace = (book) => {
        let books = this.state.books.map((bookInState) => {
            if (bookInState.id === book.id) {
                return book
            } else {
                return bookInState
            }

        })
        return books
    }


    render() {
        let books = this.state.books
        return (
            <div className="app">
                <Route
                    path='/search'
                    render={() => (
                        <Search
                            updateBook={this.updateBook}
                            booksInShelves={this.state.books}
                        />
                    )}
                />
                <Route
                    exact path="/"
                    render={ () => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                <div>
                                    <Bookshelf
                                        bookshelfTitle="Currently Reading"
                                        books={this.filterForBookshelf(books, 'currentlyReading')}
                                        updateBook={this.updateBook}
                                    />
                                    <Bookshelf
                                        bookshelfTitle="Want To Read"
                                        books={this.filterForBookshelf(books, 'wantToRead')}
                                        updateBook={this.updateBook}
                                    />
                                    <Bookshelf
                                        bookshelfTitle="Read"
                                        books={this.filterForBookshelf(books, 'read')}
                                        updateBook={this.updateBook}
                                    />
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to="/search">Add a book</Link>
                            </div>
                        </div>
                    )}

                />
            </div>
        )
    }
}

export default BooksApp

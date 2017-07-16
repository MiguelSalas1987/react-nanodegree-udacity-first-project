import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link, Route} from 'react-router-dom'
import './App.css'
import Search from './Search'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => ( this.setState({books}) ) )
    }

    filterForBookshelf(shelf) {
       return  this.state.books.filter( (book) =>(book.shelf === shelf))
    }


    render() {
        return (
            <div className="app">
                <Route
                    path='/search'
                    render={() => (
                        <Search/>
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
                                        books={this.filterForBookshelf('currentlyReading')}
                                    />
                                    <Bookshelf
                                        bookshelfTitle="Want To Read"
                                        books={this.filterForBookshelf('wantToRead')}
                                    />
                                    <Bookshelf
                                        bookshelfTitle="Read"
                                        books={this.filterForBookshelf('read')}
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

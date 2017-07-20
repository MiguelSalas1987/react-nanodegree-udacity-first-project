import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book'
import './App.css'

class Search extends React.Component {

    constructor(props){
       super(props)
       this.state = {
           query: '',
           queryBooks: []
       }
    }

    handleInputChange = (value) => {

        this.setState({ query:  value })

        if(this.state.query === '') {

            this.setState({queryBooks: []})

        } else {

            BooksAPI.search(this.state.query, 20).then((queryBooks) => {
                if (Array.isArray(queryBooks)) {
                    this.checkForBooksInShelves(queryBooks)

                }
            })

        }

    }

    checkForBooksInShelves = (actualQueryBooks) => {

        let booksInShelves    = this.props.booksInShelves

        let queryBooks = actualQueryBooks.map( (book)  => {
            booksInShelves.forEach( (bookInShelves)  => {
                if(book.id === bookInShelves.id ){

                    book = bookInShelves

                }

            })

            return book
        })

        this.setState({queryBooks})
    }


    render() {
        let updateBook = this.props.updateBook
        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value={this.state.query}
                               onChange={(event) => this.handleInputChange(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {

                            this.state.queryBooks.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    updateBook={updateBook}
                                />
                            </li>)

                        )}
                    </ol>
                </div>
            </div>

        )
    }
}

export default Search
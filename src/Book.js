import React from 'react'
import './App.css'
import  noCover from './icons/no-image.png'


class Book extends React.Component {

    onBookUpdate = (book, event) => ( this.props.updateBook(book, event.target.value) )

    render() {

        let book = this.props.book
        let imageUrl = book.imageLinks ? book.imageLinks.thumbnail : noCover
        return (

            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageUrl})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event) => this.onBookUpdate(book, event)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{ book.authors  && ( book.authors.join(', ') ) }</div>
            </div>

        )
    }
}

export default Book

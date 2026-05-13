import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import BookList from './BookList'
import BookDetail from './BookDetail'

const BookStore = () => {
  const [books, setBooks] = useState([])
  const [bookSelected, setBookSelected] = useState(null)

  const getBooks = () => {
    fetch('https://striveschool-api.herokuapp.com/food-books')
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('errore nel recupero libri')
        }
      })
      .then((data) => {
        setBooks(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getBooks()
  }, [])

  const changeBook = (book) => setBookSelected(book)

  return (
    <Row className="center-row">
      <Col lg={4}>
        <BookList
          bookSelected={bookSelected}
          changeBook={changeBook}
          books={books}
        />
      </Col>
      <Col lg={8}>
        <BookDetail bookSelected={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookStore

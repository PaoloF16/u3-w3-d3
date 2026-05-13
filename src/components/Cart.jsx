import { Col, Row, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'

// il componente Cart deve sia LEGGERE l'array cart.content (per mostrarne i contenuti)
// sia DISPATCHARE una action per eliminare un libro alla volta
import { useSelector, useDispatch } from 'react-redux'

const Cart = () => {
  const cart = useSelector((tuttoLoStato) => {
    return tuttoLoStato.cart.content
  })

  const dispatch = useDispatch()

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: 'none' }}>
          {cart.map((book, i) => (
            <li key={i} className="my-4">
              <Button
                variant="danger"
                onClick={() => {
                  // noi qui dobbiamo avvisare il reducer di creare un nuovo stato con un libro in meno
                  // "avvisare il reducer" -> dispatchare una action!
                  dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: book.id, // passo l'informazione sul libro da rimuovere al reducer
                  })
                }}
              >
                <FaTrash />
              </Button>
              <img
                className="book-cover-small"
                src={book.imageUrl}
                alt="book selected"
              />
              {book.title}
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="fw-bold mb-3 ms-4">
          TOTALE:{' '}
          {cart.reduce(
            (acc, currentValue) => acc + parseFloat(currentValue.price),
            0,
          )}
          $
        </Col>
      </Row>
    </Row>
  )
}

export default Cart

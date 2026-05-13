import { Col, Row, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const BookDetail = ({ bookSelected }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((storeRedux) => {
    return storeRedux.favorites.content;
  });
  const isFavorite = bookSelected
    ? favorites.some((book) => book.id === bookSelected.id)
    : false;
  return (
    <div className="mt-3 mb-4 mb-lg-0">
      {bookSelected ? (
        <>
          <Row>
            <Col sm={12}>
              <h1>{bookSelected.title}</h1>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={4}>
              <div className="mt-3">
                <img
                  className="book-cover"
                  src={bookSelected.imageUrl}
                  alt="book selected"
                />
              </div>
            </Col>
            <Col sm={8}>
              <p>
                <span className="fw-bold">Description:</span>&nbsp;
                {bookSelected.description}
              </p>
              <p>
                <span className="fw-bold">Price:</span>&nbsp;
                {bookSelected.price}$
              </p>
              <Button
                className="d-flex align-items-center"
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART", // si segue la nomenclatura delle costanti, es. URL
                    payload: bookSelected,
                  });
                }}
              >
                <span className="me-2">AGGIUNGI AL</span>
                <FaShoppingCart />
              </Button>
              <Button
                variant={isFavorite ? "success" : "outline-success"}
                className="d-flex align-items-center mt-3"
                disabled={isFavorite}
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_FAVORITES",
                    payload: bookSelected,
                  });
                }}
              >
                {isFavorite ? "GIÀ NEI PREFERITI" : "AGGIUNGI AI PREFERITI"}
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col sm={12}>
            <h3>Clicca su un libro per i dettagli</h3>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookDetail;

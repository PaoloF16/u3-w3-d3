import { Col, Row, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((storeRedux) => {
    return storeRedux.favorites.content;
  });

  const dispatch = useDispatch();

  return (
    <Row>
      <Col sm={12}>
        <h2 className="my-4">Libri preferiti</h2>

        {favorites.length === 0 ? (
          <p>Non hai ancora libri nei preferiti.</p>
        ) : (
          <ul style={{ listStyle: "none" }}>
            {favorites.map((book) => (
              <li key={book.id} className="my-4">
                <Button
                  variant="danger"
                  className="me-3"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_FAVORITES",
                      payload: book.id,
                    });
                  }}
                >
                  <FaTrash />
                </Button>

                <img
                  className="book-cover-small"
                  src={book.imageUrl}
                  alt="book selected"
                />

                <Link to="/" className="ms-3">
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Col>
    </Row>
  );
};

export default Favorites;

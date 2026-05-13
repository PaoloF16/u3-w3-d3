import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
// importo l'hook useSelector al fine di poter recuperare un valore dal Redux Store
import { useSelector } from 'react-redux'

// REGOLE DEGLI HOOKS
// 1) DENTRO I COMPONENTI A FUNZIONE
// 2) PRIMA DEL RETURN, FUORI DA CONDIZIONI, CICLI E MIE FUNZIONI

const CartIndicator = () => {
  const navigate = useNavigate()
  const carrelloLength = useSelector((storeRedux) => {
    return storeRedux.cart.content.length
  })

  return (
    <div className="d-flex justify-content-end my-4">
      <Button
        onClick={() => navigate('/cart')}
        className="d-flex align-items-center"
      >
        <FaShoppingCart />
        <span className="ms-2">{carrelloLength}</span>
        {/* invece che uno 0 fisso, io vorrei inserire la lunghezza dell'array content
        all'interno della "slice" chiamata cart nel Redux Store */}
      </Button>
    </div>
  )
}

export default CartIndicator

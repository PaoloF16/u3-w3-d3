// qui dentro andiamo a scrivere il "robottino" che grazie allo stato attuale e alle azioni spedite
// è in grado di far avanzare la logica di Redux
// il suo scopo è creare e mantenere lo stato di Redux
// il reducer verrà azionato AUTOMATICAMENTE da REDUX ogni volta che si effettua il dispatch di una action

// ogni reducer è una funzione PURA, ciò significa tra le altre cose che:
// - NON MUTA i propri parametri
// - NON effettua side-effects, chiamate API etc.
// - se fornita dello stesso input, restituisce sempre lo stesso output
// es. funzione che somma due numeri

// poichè il reducer tiene in vita lo stato dell'applicativo, dobbiamo crearne noi una versione iniziale
const initialState = {
  cart: {
    content: [],
  },
  favorites: {
    content: [],
  },
}

const mainReducer = (state = initialState, action) => {
  // con lo stato attuale e la action appena spedita il reducer calcolerà il nuovo stato dell'app
  // inserisco initialState come valore di default per il parametro "state": questo serve alla PRIMA
  // invocazione del mainReducer, quella che inizializza lo stato
  // cosa fa un reducer? :) calcola il nuovo stato dell'app
  // lo fa analizzando l'unica proprietà obbligatoria della action ("type") e prendendo delle decisioni in autonomia

  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        // tutti questi ... servono per ricreare la struttura dell'oggetto precedente!
        // anche se voglio solamente aggiungere un elemento a content, non posso rischiare di
        // perdere altri contenuti dello store!
        ...state,
        cart: {
          ...state.cart,
          content: [...state.cart.content, action.payload], // dobbiamo aggiungere un libro! è trasmesso in "action.payload"
          // in alternativa:
          // content: state.cart.content.concat(action.payload)
        },
        // poichè lo stato dell'app è immutabile e una funzione pura come il reducer NON PUO'
        // alterare i propri parametri (come lo state), dobbiamo trovare delle soluzioni per interagire
        // con gli array in maniera NON-MUTATIVA (https://doesitmutate.xyz)
      }

    case 'REMOVE_FROM_CART':
      // ...e anche qui ritorneremo il nuovo stato di Redux
      return {
        ...state,
        cart: {
          ...state.cart,
          // content: state.cart.content.filter((libro) => {
          //   if (libro.id !== action.payload) {
          //     return true
          //   } else {
          //     //  questo è proprio il libro/i libri che hanno id UGUALE all'action.payload
          //     // cit. Gandalf "TU NON PUOI PASSARE!"
          //     return false
          //   }
          // }),
          // VERSIONE DAVIDE
          content: state.cart.content.filter(
            (libro) => libro.id !== action.payload,
          ),
          // devo creare un nuovo content in cui c'è un elemento di meno rispetto al content attuale
        },
        
      }
      case 'ADD_TO_FAVORITES': {
  const alreadyFavorite = state.favorites.content.some(
    (libro) => libro.id === action.payload.id,
  )

  if (alreadyFavorite) {
    return state
  }

  return {
    ...state,
    favorites: {
      ...state.favorites,
      content: [...state.favorites.content, action.payload],
    },
  }
}

case 'REMOVE_FROM_FAVORITES':
  return {
    ...state,
    favorites: {
      ...state.favorites,
      content: state.favorites.content.filter(
        (libro) => libro.id !== action.payload,
      ),
    },
  }

    default:
      // anche il caso di default, come tutti gli altri, avrà lo stesso scopo: ritornare il nuovo stato dell'app!
      return state // al fine di non fare danni, in questo caso "in extremis" ritorniamo semplicemente
    // lo stato precedente! (non applichiamo nessuna modifica)
  }
}

export default mainReducer

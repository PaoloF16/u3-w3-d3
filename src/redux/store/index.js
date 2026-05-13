// questo file sarà responsabile della creazione del Redux Store, il cervellone centralizzato
// dove verranno salvati i dati a livello dell'applicativo

import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../reducers'

const store = configureStore({
  reducer: mainReducer, // inserisco il reducer scritto in reducers/index.js
})
// "store" è proprio il Redux Store

// un reducer è una funzione pura che calcola il nuovo stato applicativo di Redux
// lo riesce a fare grazie allo stato precedente + la action che è stata appena "dispatchata"
export default store

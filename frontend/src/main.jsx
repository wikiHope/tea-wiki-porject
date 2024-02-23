import ReactDOM from 'react-dom/client'
// Import our custom CSS
import './assets/scss/styles.scss'
// router
import { RouterProvider } from "react-router-dom"
import router from "./router/"
// state
import { Provider } from 'react-redux'
import { store } from './store'
//
import LoadingOverlay from './components/ui/LoadingOverlay'
//
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <LoadingOverlay />
    </PersistGate>
  </Provider>
)

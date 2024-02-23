import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './modules/event'
import placeReducer from './modules/place'
import filterReducer from './modules/filter'
import loadingReducer from './modules/loading'
import authReducer from './modules/auth'
import modalReducer from './modules/modal'

import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { combineReducers } from "redux"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['auth'],
  blacklist: ['event', 'place', 'filter', 'loading', 'modal']
}

const reducer = combineReducers({
  event: eventReducer,
  place: placeReducer,
  filter: filterReducer,
  loading: loadingReducer,
  auth: authReducer,
  modal: modalReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer
})
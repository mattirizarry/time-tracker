import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { compose, createStore } from 'redux'

import { timeLogReducer } from '@/controllers/timeLogController'
import { formReducer } from '@/controllers/formController'
import { projectReducer } from '@/controllers/projectController'
import { payReducer } from '@/controllers/payController'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose
  }
}

const persistConfig  = {
  key: 'root',
  blacklist: [],
  storage
}

const rootReducer = persistCombineReducers(persistConfig, {
  timeLogState: timeLogReducer,
  formState: formReducer,
  projectState: projectReducer,
  payState: payReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())
export const persistor = persistStore(store)
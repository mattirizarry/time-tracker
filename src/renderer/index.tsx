/** @jsx createElement */

import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '@/controllers/reduxController'

import App from '@/views/App'

import '@/assets/styles/app.sass'

const Index = () => (
  <Provider store={ store }>
    <PersistGate persistor={ persistor }>
      <App />
    </PersistGate>
  </Provider>
)

render(<Index />, document.getElementById('app'))
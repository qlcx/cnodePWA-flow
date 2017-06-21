import React from 'react'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './layouts/Layout'
import HomePage from './views/HomePage'

import './styles/main.css'

import rootReducer from './redux'
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const reducer = combineReducers(rootReducer)
const store = createStoreWithMiddleware(reducer)

const router = () => (
  <Provider store={store}>
    <Layout>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </Router>
    </Layout>
  </Provider>
)

export default router
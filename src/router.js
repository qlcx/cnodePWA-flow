import React from 'react'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { withRouter} from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Layout from './layouts/Layout'
import HomePage from './views/HomePage'
import UserPage from './views/UserPage'

import './styles/normalize.css'
import './styles/main.css'

import rootReducer from './redux'
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const reducer = combineReducers(rootReducer)
const store = createStoreWithMiddleware(reducer)

const App = ({match}) => (
  <Layout>
    <Route path='/' exact component={HomePage} />
  </Layout>
)

const router = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/user' component={UserPage} />
      </Switch>
    </Router>
  </Provider>
)

export default router
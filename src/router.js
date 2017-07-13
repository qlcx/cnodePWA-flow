import React, { Component } from 'react'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './layouts/Layout'
import HomePage from './views/HomePage'
import AboutePage from './views/AboutePage'
import UserPage from './views/UserPage'

import './styles/normalize.css'
import './styles/main.css'

import rootReducer from './redux'
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const reducer = combineReducers(rootReducer)
const store = createStoreWithMiddleware(reducer)

const AppLayout = WrappedComponent => {
  return class AppLayout extends Component {
    render() {
      return <Layout><WrappedComponent /></Layout>
    }
  }
}

const router = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' exact component={AppLayout(HomePage)} />
        <Route path='/aboute' component={AppLayout(AboutePage)} />
        <Route path='/user' component={UserPage} />
        <Route component={NoRoute} />
      </Switch>
    </Router>
  </Provider>
)

const NoRoute = () => {
  return <div>no router</div>
}

export default router
import React from 'react'
// import reduxThunk from 'redux-thunk'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, combineReducers } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainPage from './views/MainPage'

const router = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={MainPage} />
    </Switch>
  </Router>
)

export default router
import React, { Component } from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import scrollToTop from './components/Shared/ScrollToTop';

import Layout from './layouts/Layout';
import HomePage from './views/HomePage';
import AboutePage from './views/AboutePage';
import UserPage from './views/UserPage';
import TopicDetailsPage from './views/TopicDetailsPage';
import UserInfoPage from './views/UserInfoPage';

import './styles/normalize.css';
import './styles/main.css';

import rootReducer from './redux';
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const reducer = combineReducers(rootReducer);
const store = createStoreWithMiddleware(reducer);


const AppLayout = (WrappedComponent, ...rest) => {
  return class AppLayout extends Component {
    render() {
      return <Layout><WrappedComponent extra={{...rest[0]}}/></Layout>;
    }
  };;
};

const HomePageComponent = compose(scrollToTop, AppLayout);
const AllTopicList = HomePageComponent(HomePage);
const GoodTopicList = HomePageComponent(HomePage, {tab: 'good'});
const ShareTopicList = HomePageComponent(HomePage, {tab: 'share'});
const AskTopicList = HomePageComponent(HomePage, {tab: 'ask'});
const JobTopicList = HomePageComponent(HomePage, {tab: 'job'});
const TopicDetailsPageComponent = compose(scrollToTop, AppLayout)(TopicDetailsPage);
const UserInfoPageComponent = compose(scrollToTop, AppLayout)(UserInfoPage);

const router = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' exact component={AllTopicList} />
        <Route path='/goodtopics' component={GoodTopicList} />
        <Route path='/sharetopics' component={ShareTopicList} />
        <Route path='/asktopics' component={AskTopicList} />
        <Route path='/jobtopics' component={JobTopicList} />        
        <Route path='/topics/:id' component={TopicDetailsPageComponent} />
        <Route path='/aboute' component={AppLayout(AboutePage)} />
        <Route path='/user' component={UserPage} />
        <Route path='/userInfo/:id' component={UserInfoPageComponent} />        
        <Route component={NoRoute} />
      </Switch>
    </Router>
  </Provider>
);

const NoRoute = () => {
  return <div>no router</div>;
};

export default router;
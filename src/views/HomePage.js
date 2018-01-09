import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TopicsList from '../components/HomePage/TopicsList';
import handleScrollEvent from '../components/Shared/handleScrollEvent';
const TopicsListComponent = handleScrollEvent(TopicsList);

// 分页器
import PaginationComponent from '../components/BasicComponent/PaginationComponent';
import paginationDecorator from '../components/Shared/PaginationDecorator';
const Pagination = paginationDecorator(PaginationComponent);

import { actions } from './HomePageReudx';
import styles from './HomePage.css';

import axios from 'axios';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.paginationChange = this.paginationChange.bind(this);
  }

  componentWillMount() {
    const { actions, extra } = this.props;
    const param = extra ? extra : {};
    // 获取话题列表
    actions.getTopicsList(param);

    axios.get('https://cnodejs.org/setting').then(res => {
      console.log(res.data)
    })
  }

  // 切换页
  paginationChange(pageNum) {
    const { actions } = this.props;

    actions.getTopicsList({page: pageNum});
  }
  
  render() {
    const { state } = this.props;

    return <div>
      <TopicsListComponent {...state} />
      <div className={styles.pagination}>
        {state.topicsList.length ? <Pagination onChange={this.paginationChange} /> : null}
      </div>
    </div>;
  }
}

export default connect(
  state => ({
    state: state.homePageRedux.topicsListReducer
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(MainPage);
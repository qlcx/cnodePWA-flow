import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TopicsList from '../components/HomePage/TopicsList'

import { actions } from './HomePageReudx'

class MainPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { actions } = this.props
    
    // 获取主题首页列表
    actions.getTopicsList()
  }
  
  render() {
    const { state } = this.props

    return <TopicsList {...state} />
  }
}

export default connect(
  state => ({
    state: state.homePageRedux.topicsListReducer
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(MainPage)
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import UserInfoDetails from '../components/UserInfoPage/UserInfoDetails'

import { actions } from './UserInfoPageRedux'

class UserInfoPage extends Component {  
  componentDidMount() {
    const { actions, history } = this.props

    let userID = history.location.pathname.split('/')[2]
    actions.getUserInfo(userID)
  }

  render() {
    const { state } = this.props
    
    const userInfo = state.userInfo
    let userInfoDetailsProps = undefined
    if (userInfo.avatar_url) {
      userInfoDetailsProps = {
        avatar_url: userInfo.avatar_url,
        create_at: userInfo.create_at,
        githubUsername: userInfo.githubUsername,
        loginname: userInfo.loginname,
        score: userInfo.score,
      }
    }
    const recentReplies = userInfo.recent_replies && userInfo.recent_replies
    const recentTopics = userInfo.recent_topics && userInfo.recent_topics

    return <div>
      <UserInfoDetails userInfoDetailsProps={userInfoDetailsProps} />
    </div>
  }
}

export default connect(
  state => ({
    state: state.userInfoPageRedux.userInfoPageReducer
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(withRouter(UserInfoPage))
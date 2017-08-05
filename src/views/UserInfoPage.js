import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import UserInfoDetails from '../components/UserInfoPage/UserInfoDetails'
import TopicsList from '../components/HomePage/TopicsList' 
import handleScrollEvent from '../components/Shared/handleScrollEvent'
const TopicsListComponent = handleScrollEvent(TopicsList)

import { actions } from './UserInfoPageRedux'

const styles = {
  recent: {
    marginTop: '2rem',
  },
}

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
      <div style={styles.recent}>
        <TopicsListComponent
          topicTitle='最近创建的话题' 
          topicsList={recentTopics && recentTopics.length > 6 ? recentTopics.slice(0, 6) : recentTopics} 
          tableLoading={false} />
      </div>
      <div style={styles.recent}>
        <TopicsListComponent
          topicTitle='最近参与的话题' 
          topicsList={recentReplies} 
          tableLoading={false} />
      </div>
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
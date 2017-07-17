import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import TopicInfo from '../components/TopicDetailsPage/TopicInfo'
import ReplyInfo from '../components/TopicDetailsPage/ReplyInfo'

import { actions } from './TopicDetailsPageRedux'

class TopicDetailsPage extends Component {
  constructor(props) {
    super(props)

    this.topicID = props.history.location.pathname.split('/')[2]
  }

  componentWillMount() {
    const { actions } = this.props

    actions.getTopicDetails(this.topicID)
  }

  render() {
    const { state } = this.props
    
    const topicParams = {
      content: state.topicDetails.content, //正文
    }

    return <div>
      <TopicInfo {...topicParams} />
      <ReplyInfo replyList={state.topicDetails.replies} />
    </div>
  }
}

export default connect(
  state => ({
    state: state.topicDetailsPageRedux.topicDetailsPageReducer
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(withRouter(TopicDetailsPage))
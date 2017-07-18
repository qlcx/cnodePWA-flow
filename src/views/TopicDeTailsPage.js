import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import TopicInfo from '../components/TopicDetailsPage/TopicInfo'
import ReplyInfo from '../components/TopicDetailsPage/ReplyInfo'

import { actions } from './TopicDetailsPageRedux'

import * as utils from '../utils'

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
    const { topicDetails } = this.props.state
    const authorName = topicDetails.author.loginname
    const tag = utils.setTopicTag({tab: topicDetails.tab, isGood: topicDetails.good, isTop: topicDetails.top})

    const topicParams = {
      header: {
        // 标题
        title: topicDetails.title,
        // 创建时间
        createTime: topicDetails.create_at,
        // 作者
        authorName: authorName,
        // 标签
        tag: tag,
        // 访问数
        visitNum: topicDetails.visit_count,
      },
      // 正文
      content: topicDetails.content,
    }

    return <div>
      <TopicInfo {...topicParams} />
      <ReplyInfo 
        replyList={topicDetails.replies}
        replyNum={topicDetails.reply_count} />
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
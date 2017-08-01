import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import TopicInfo from '../components/TopicDetailsPage/TopicInfo'
import SpinnerComponent from '../components/BasicComponent/SpinnerComponent'
// 回复列表
import ReplyInfo from '../components/TopicDetailsPage/ReplyInfo'
import handleScrollEvent from '../components/Shared/handleScrollEvent'
const ReplyInfoComponent = handleScrollEvent(ReplyInfo)

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
    const { state } = this.props
    const { topicDetails } = this.props.state
    const authorName = topicDetails.author ? topicDetails.author.loginname : ''
    const tag = (topicDetails.good || topicDetails.top) && utils.setTopicTag({tab: topicDetails.tab, isGood: topicDetails.good, isTop: topicDetails.top})

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

    if (state.fetchLoading) {
      return <div style={{position: 'relative'}}>
        <SpinnerComponent />
      </div>
    }

    return <div>
      <TopicInfo {...topicParams} />
      <ReplyInfoComponent 
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
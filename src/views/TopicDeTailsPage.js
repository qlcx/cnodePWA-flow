import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from './TopicDetailsPageRedux'

class TopicDetailsPage extends Component {
  constructor(props) {
    super(props)

    this.topicID = props.history.location.pathname.split('/')[2]
  }

  render() {
    console.log(this.topicID)
    return <div />
  }
}

export default connect(
  state => ({
    state: state.topicDetailsPageRedux.topicDetailsPageReducer
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(TopicDetailsPage)
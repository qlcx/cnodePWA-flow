// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

class MainPage extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { state } = this.props
    console.log(state)
    
    return <div>home</div>
  }
}

export default connect(
  state => ({
    state: state.homePageRedux.topicsListReducer
  })
)(MainPage)
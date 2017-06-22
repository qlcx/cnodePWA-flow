// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

class MainPage extends Component {
  props: {
    state: string
  }
  
  constructor(props) {
    super(props)
  }
  
  render() {
    const { state } = this.props
    console.log(this.props)
    
    return <div>home</div>
  }
}

export default connect(
  state => ({
    state: state.homePageRedux.topicsListReducer
  })
)(MainPage)
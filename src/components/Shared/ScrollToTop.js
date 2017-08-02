import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export default function scrollToTop(WrappedComponent) {
  class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return withRouter(ScrollToTop)
}
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export default function scrollToTop(WrappedComponent) {
  class ScrollToTop extends Component {
    componentWillMount() {
      window.scrollTo(0, 0);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(ScrollToTop);
};
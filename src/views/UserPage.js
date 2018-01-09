import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QRReaderPage from '../components/UserPage/QRReaderPage';

import { actions } from './UserPageRedux';

class UserPage extends Component {
  render() {
    const { state, actions } = this.props;

    if (state.isUserLogin) {
      return <div> user login info </div>;
    }

    return <QRReaderPage {...actions} modalVisible={state.modalVisible} />;
  }
}

export default connect(
  state => ({
    state: state.userPageRedux.userPageReducer
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(UserPage);
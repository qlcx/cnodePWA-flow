import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import QRReaderPage from '../components/UserPage/QRReaderPage';
import LoginPage from '../components/UserPage/LoginPage';

import { actions } from './UserPageRedux';
import styles from './UserPage.css';

class UserPage extends Component {
  render() {
    const { state, actions } = this.props;
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return <div> user login info </div>;
    }

    if (state.isSwitchQRReader) {
      return <QRReaderPage {...actions} modalVisible={state.modalVisible} />;
    }

    return <div className={styles.content}>
      <LoginPage {...actions} />
    </div>;
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
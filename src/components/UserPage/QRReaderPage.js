import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

import ModalComponent from '../BasicComponent/ModalComponent'

const previewStyle = {
  width: '100%',
  objectFit: 'fill',
}

export default class QRReaderPage extends Component {
 constructor(props){
    super(props)

    this.handleScan = this.handleScan.bind(this)
    this.modalConfirm = this.modalConfirm.bind(this)
    this.modalCancel = this.modalCancel.bind(this)

    this.renderModal = this.renderModal.bind(this)

    this.state = {
      delay: 100,
      result: null,
    }
  }

  componentWillUnmount() {
    this.setState({ result: null })
  }

  modalConfirm() {
    this.props.getUserLoginSta(this.state.result)
  }

  modalCancel() {
    this.props.setUserModalSta(false)
  }

  handleError(err) {
    console.error(err)
  }

  handleScan(data) {
    if (!this.props.modalVisible && data) {
      this.setState({result: data})
      this.props.setUserModalSta(true)
    }
  }

  render() {
    return <div>
      {this.renderModal()}
      <QrReader
        facingMode='rear'
        delay={this.state.delay}
        style={previewStyle}
        onError={this.handleError}
        onScan={this.handleScan}
        /> 
    </div>
  }

  renderModal() {
    if (this.props.modalVisible) {
      return <ModalComponent 
        titleInfo='是否确认登录?'
        visible={this.props.modalVisible}
        onCancel={this.modalCancel}
        onConfirm={this.modalConfirm} /> 
    } else {
      return null
    }
  }
}
import React, { Component } from 'react'

import Button from './Button'
import styles from './ModalComponent.css'

export default class ModalComponent extends Component {
  render() {
    const { footer, modalWidth, visible } = this.props

    if (!visible) {
      return <div />
    }

    return <div 
      style={modalWidth ? {width: modalWidth} : {width: 400}} 
      className={styles.root}>

      {this.renderDefaultHeader()}

      <div className={styles.modalContent}>
         {this.props.children} 
      </div>

      {footer ? footer : this.renderDefaultFooter()}

    </div>
  }

  renderDefaultHeader() {
    const { titleInfo } = this.props
    
    if (!titleInfo) {
       return <div />
    }

    return <div className={styles.modalHeader}>
      {titleInfo}
    </div>
  }

  renderDefaultFooter() {
    const { onCancel, onConfirm } = this.props

    return <div className={styles.modalFooter}>
      <Button btnText='取消' handleClick={onCancel} />
      <Button style={{marginLeft: 8}} btnText='确认' handleClick={onConfirm} />
    </div>
  }
}
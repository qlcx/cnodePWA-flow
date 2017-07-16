import React, { Component } from 'react'

import styles from './Button.css'

export default class Button extends Component {
  render() {
    const { btnText, handleClick, style } = this.props

    return <button 
      style={style}
      className={styles.button} 
      onClick={handleClick}>
      {btnText ? btnText : this.props.children}
    </button>
  }
}
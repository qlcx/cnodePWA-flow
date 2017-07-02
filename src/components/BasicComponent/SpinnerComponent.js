import React, { Component } from 'react'

import styles from './SpinnerComponent.css'

export default class SpinnerComponent extends Component {
  render() {
    const { size } = this.props
    
    let spinStyle = `${styles.default} ${styles['spin-dot']}`
    // size 的取值有 small、default、large
    if (size) {
      spinStyle = `${styles[size]} ${styles['spin-dot']}`
    }

    return (
      <div>
        <div className={styles.mask} />        
        <div className={styles.root}>
          <span className={spinStyle}>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
        </div>
      </div>
    )
  }
}
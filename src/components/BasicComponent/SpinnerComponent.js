import React, { Component } from 'react'

import styles from 'SpinnerComponent.css'

export default class SpinnerComponent extends Component {
  render() {
    return <div className={styles.spinner}>
      <div className={`${sytles[spinner-container]} ${styles.container1}}`>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
        <div className={styles.circle4}></div>
      </div>
      <div className={`${sytles[spinner-container]} ${styles.container2}}`>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
        <div className={styles.circle4}></div>
      </div>
      <div className={`${sytles[spinner-container]} ${styles.container3}}`>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
        <div className={styles.circle4}></div>
      </div>
    </div>
}
import React, { Component } from 'react'

import styles from './PaginationComponent.css'

export default class PaginationComponent extends Component {
  render() {
    return <div className={styles.root}>
      <ul className={styles.pageFooter}>
        <li><a className={styles.pageNum} href="#">«</a></li>
        <li><a className={styles.pageNum} href="#">1</a></li>
        <li><a className={styles.pageNum} href="#">2</a></li>
        <li><a className={styles.pageNum} href="#">3</a></li>
        <li><a className={styles.pageNum} href="#">4</a></li>
        <li><a className={styles.pageNum} href="#">»</a></li>
      </ul>
    </div>
  }
}
import React, { Component } from 'react'

import styles from './PaginationComponent.css'

export default class PaginationComponent extends Component {
  constructor(props) {
    super(props)

    this.renderPageNum = this.renderPageNum.bind(this)
  }

  render() {
    const { paginationActionChange } = this.props
    const { whichBtnDown, pageArr } = this.props

    // 向前&向后
    let previosStyle = styles.pageAction 
    let nextStyle = styles.pageAction
    if (whichBtnDown === 'previous') {
      previosStyle = `${previosStyle} ${styles.pageActionActive}`
    } else if (whichBtnDown === 'next') {
      nextStyle = `${nextStyle} ${styles.pageActionActive}`
    }

    return <div className={styles.root}>
      <ul className={styles.pageFooter}>      
        <li>
          <a 
            className={previosStyle} 
            onMouseDown={() => paginationActionChange('previous-down')}
            onMouseUp={() => paginationActionChange('previous-up')}>
            {'<'}
          </a>
        </li>

        {this.renderPageNum(pageArr)}

        <li>
          <a
            className={nextStyle} 
            onMouseDown={() => paginationActionChange('next-down')}
            onMouseUp={() => paginationActionChange('next-up')}>
            {'>'}
          </a>
        </li>
      </ul>
    </div>
  }

  // 渲染页码
  renderPageNum(pageNumRange) {
    const { paginationChange, pageCurrent } = this.props

    return pageNumRange.map((data, i) => {
      let pageNum = i + 1

      let pageNumStyle = styles.pageNum
      if (Number(pageCurrent) === pageNum) {
        pageNumStyle = `${pageNumStyle} ${styles.pageNumCurrent}`
      }

      if (pageNum == 5) {
        return <a className={styles.pageActionSpeedRight}></a>
      }

      if (pageCurrent <= 5 && pageNum > 5) {
        return <div />
      } else if (pageCurrent <=5 && pageNum == pageNumRange[pageNumRange.length - 1]) {
        return <a className={styles.pageActionSpeedRight}></a>
      }
      
      return <li key={i}>
        <a className={pageNumStyle} onClick={e => paginationChange(e.target.text)}>
          {pageNum}
        </a>
      </li>
    })
  }
}
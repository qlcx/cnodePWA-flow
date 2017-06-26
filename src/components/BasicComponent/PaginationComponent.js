import React, { Component } from 'react'

import styles from './PaginationComponent.css'

export default class PaginationComponent extends Component {
  constructor(props) {
    super(props)

    this.renderPageNum = this.renderPageNum.bind(this)
  }

  render() {
    const { paginationActionChange } = this.props
    const { whichBtnDown } = this.props

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
            ‹
          </a>
        </li>

        {this.renderPageNum([1, 2, 3, 4, 5])}

        <li>
          <a
            className={nextStyle} 
            onMouseDown={() => paginationActionChange('next-down')}
            onMouseUp={() => paginationActionChange('next-up')}>
            ›
          </a>
        </li>
      </ul>
    </div>
  }

  // 渲染页码
  renderPageNum(pageNumRange) {
    const { paginationChange, pageCurrent } = this.props

    return pageNumRange.map((data, i) => {
      let pageNumStyle = styles.pageNum
      if (Number(pageCurrent) === i + 1) {
        pageNumStyle = `${pageNumStyle} ${styles.pageNumCurrent}`
      }
      
      return <li key={i}>
        <a className={pageNumStyle} onClick={e => paginationChange(e.target.text)}>
          {i+1}
        </a>
      </li>
    })
  }
}
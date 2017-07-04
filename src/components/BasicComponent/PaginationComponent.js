import React, { Component } from 'react'

import styles from './PaginationComponent.css'

class PaginationAction extends Component {
  render() {
    return <li />
  }
}

export default class PaginationComponent extends Component {
  constructor(props) {
    super(props)

    this.renderPageNum = this.renderPageNum.bind(this)
    this.renderActionBTN = this.renderActionBTN.bind(this)
  }

  render() {
    const { paginationActionChange } = this.props
    const { whichBtnDown } = this.props

    // 向前&向后
    let prevStyle = `${styles.pageNum} ${styles.prevBTN}`
    let nextStyle = `${styles.pageNum} ${styles.nextBTN}`
    if (whichBtnDown === 'prev') {
      prevStyle = `${prevStyle} ${styles.pageActionActive}`
    } else if (whichBtnDown === 'next') {
      nextStyle = `${nextStyle} ${styles.pageActionActive}`
    }

    return <div className={styles.root}>
      <ul className={styles.pageFooter}>      
        {this.renderActionBTN('prev', prevStyle)}

        {this.renderPageNum()}

        {this.renderActionBTN('next', nextStyle)}
      </ul>
    </div>
  }

  // 渲染操作键
  renderActionBTN(type, style) {
    const { paginationActionChange } = this.props

    return <li key={type}>
      <a 
        className={style}
        onMouseDown={() => paginationActionChange(`${type}-single-down`)}
        onMouseUp={() => paginationActionChange(`${type}-single-up`)}
        href='#' />
    </li>
  }

  // 渲染页码
  renderPageNum() {
    const { paginationChange, paginationActionChange, pageCurrent, pageTotal } = this.props

    let pageNumComponentArr = []

    for (let i = 1; i <= pageTotal; i++) {
      let pageNumItem = ''

      let pageNumStyle = styles.pageNum
      if (Number(pageCurrent) === i) {
        pageNumStyle = `${pageNumStyle} ${styles.pageNumCurrent}`
      }

      if (pageTotal <= 10) {
        pageNumItem = <li key={i} className={pageNumStyle} value={i} onClick={e => paginationChange(e.target.value)}>
          {i}
        </li>
      } else if (pageCurrent <= 5) {
        if (i == pageTotal || i <= 5) {
          pageNumItem = <li key={i} className={pageNumStyle} value={i} onClick={e => paginationChange(e.target.value)}>
            {i}
          </li>
        } else if (i == pageTotal - 1) {
          pageNumItem = <li key={i} className={styles.pageActionSpeedRight} onClick={() => paginationActionChange('next-double-down')}></li>         
        }
      } else if (pageTotal - pageCurrent < 5) {
        if (i == 1 || pageTotal - i < 5) {
          pageNumItem = <li key={i} value={i} className={pageNumStyle} onClick={e => paginationChange(e.target.value)}>
            {i}
          </li>
        } else if (i == 2) {
          pageNumItem = <li key={i} className={styles.pageActionSpeedLeft} onClick={() => paginationActionChange('prev-double-down')}></li>          
        }
      } else {
        if (i == 1 || i == pageTotal || i == pageCurrent || i == pageCurrent + 1 || i == pageCurrent - 1) {
          pageNumItem = <li key={i} value={i} className={pageNumStyle} onClick={e => paginationChange(e.target.value)}>
            {i}
          </li>
        } else if (i == 2) {
          pageNumItem = <li key={i} className={styles.pageActionSpeedLeft} onClick={() => paginationActionChange('prev-double-down')}></li>                    
        } else if (i == pageTotal - 1) {
          pageNumItem = <li key={i} className={styles.pageActionSpeedRight} onClick={() => paginationActionChange('next-double-down')}></li>                    
        }
      }

      if (!pageNumItem) continue

      pageNumComponentArr.push(pageNumItem)
    }

    return pageNumComponentArr
  }
}
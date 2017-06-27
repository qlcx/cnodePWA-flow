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
        <li key='previous'>
          <a
            className={previosStyle} 
            onMouseDown={() => paginationActionChange('previous-down')}
            onMouseUp={() => paginationActionChange('previous-up')}>
            {'<'}
          </a>
        </li>

        {this.renderPageNum()}

        <li key='next'>
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
  renderPageNum() {
    const { paginationChange, pageCurrent, pageTotal } = this.props

    let pageNumComponentArr = []

    for (let i = 1; i <= pageTotal; i++) {
      let pageNumItem = ''

      let pageNumStyle = styles.pageNum
      if (Number(pageCurrent) === i) {
        pageNumStyle = `${pageNumStyle} ${styles.pageNumCurrent}`
      }

      if (pageTotal < 8) {
        pageNumItem = <li key={i}>
          <a className={pageNumStyle} onClick={e => paginationChange(e.target.text)}>
            {i}
          </a>
        </li>
      } else if (pageCurrent < 6) {
        if (i == pageTotal) {
          pageNumItem = <li key={i}>
            <a className={pageNumStyle} onClick={e => paginationChange(e.target.text)}>
              {i}
            </a>
          </li>
        } else if (i > 6) {
          pageNumItem = <li key={i} />
        } else if (i == 6) {
          pageNumItem = <li key={i}><a className={styles.pageActionSpeedRight}></a></li>          
        } else {
          pageNumItem = <li key={i}>
            <a className={pageNumStyle} onClick={e => paginationChange(e.target.text)}>
              {i}
            </a>
          </li>
        }
      } else if (pageTotal - pageCurrent < 6) {
        if (i == 1) {
          pageNumItem = <li key={i}>
            <a className={pageNumStyle} onClick={e => paginationChange(e.target.text)}>
              {i}
            </a>
          </li>
        } else if (pageTotal - i > 6) {
          pageNumItem = <li key={i} />
        } else if (pageTotal - i == 6) {
          pageNumItem = <li key={i}><a className={styles.pageActionSpeedLeft}></a></li>          
        } else {
          pageNumItem = <li key={i}>
            <a className={pageNumStyle} onClick={e => paginationChange(e.target.text)}>
              {i}
            </a>
          </li>
        }
      } else {
        if (i == 1 || i == pageTotal) {
          pageNumItem = <li key={i}>
            <a className={pageNumStyle} onClick={e => paginationChange(e.target.text)}>
              {i}
            </a>
          </li>
        } else if (i == 2) {
          pageNumItem = <li key={i}><a className={styles.pageActionSpeedLeft}></a></li>                    
        } else if (pageTotal - i == 2) {
          pageNumItem = <li key={i}><a className={styles.pageActionSpeedRight}></a></li>                    
        } else if ( i == pageCurrent || i == pageCurrent + 1 || i == pageCurrent - 1) {
          pageNumItem = <li key={i}>
            <a className={pageNumStyle} onClick={e => paginationChange(e.target.text)}>
              {i}
            </a>
          </li>
        } else {
          pageNumItem = <li key={i} />          
        }
      }

      pageNumComponentArr.push(pageNumItem)
    }

    return pageNumComponentArr
  }
}
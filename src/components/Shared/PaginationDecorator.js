import React, { Component } from 'react'

const paginationDecorator = WrappedComponent => {
  class PaginationDecorator extends Component {
    constructor(props) {
      super(props)

      // 页码改变
      this.paginationChange = this.paginationChange.bind(this)
      // 翻页按钮操作
      this.paginationActionChange = this.paginationActionChange.bind(this)

      this.state = {
        whichBtnDown: '',
        pageCurrent: 1,
        pageTotal: 20,
      }
    }

    // 判断翻页按钮是否按下
    paginationActionChange(type) {
      let pageCurrentVal = Number(this.state.pageCurrent)

      let typeArr = type.split('-')
      let isDown = typeArr[1]
      let whichBtn = typeArr[0]
      if (isDown === 'down') {
        this.setState({ whichBtnDown: whichBtn })
      } else {
        this.setState({ whichBtnDown: '' })
      }

      if (isDown === 'down') {
        if (whichBtn === 'previous' && pageCurrentVal > 1) {
          this.setState({ pageCurrent: pageCurrentVal - 1 })
        } else if (whichBtn === 'next') {
          this.setState({ pageCurrent: pageCurrentVal + 1 })        
        }
      }
    }

    paginationChange(pageNum) {
      this.setState({ pageCurrent: Number(pageNum) })
    }

    render() {
      const newProps = {
        paginationChange: this.paginationChange,
        paginationActionChange: this.paginationActionChange
      }

      return <WrappedComponent {...this.props} {...newProps} {...this.state}/>
    }
  }

  return PaginationDecorator
}

export default paginationDecorator
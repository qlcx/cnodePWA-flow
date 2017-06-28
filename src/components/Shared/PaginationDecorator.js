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
        pageTotal: 10,
      }
    }

    // 判断翻页按钮是否按下
    paginationActionChange(type) {
      let pageCurrentVal = Number(this.state.pageCurrent)

      let typeArr = type.split('-')
      let isDown = typeArr[2]
      let actionType = typeArr[1]
      let whichBtn = typeArr[0]
      if (isDown === 'down' && actionType === 'single') {
        this.setState({ whichBtnDown: whichBtn })
      } else {
        this.setState({ whichBtnDown: '' })
      }

      if (isDown === 'down') {
        let len = (actionType === 'single' ? 1 : 3)

        if (whichBtn === 'prev' && pageCurrentVal > len) {
          this.props.onChange(pageCurrentVal - len)
          this.setState({ pageCurrent: pageCurrentVal - len })
        } else if (whichBtn === 'next' && pageCurrentVal < this.state.pageTotal) {
          this.props.onChange(pageCurrentVal + len)          
          this.setState({ pageCurrent: pageCurrentVal + len })        
        }
      }
    }

    paginationChange(pageNum) {
      this.props.onChange(pageNum)
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
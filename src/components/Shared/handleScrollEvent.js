import React, { Component } from 'react'

function handleScrollEvent(WrappedComponent) {
  return class HandleScrollEvent extends Component {
    constructor(props) {
      super(props)

      this.handleScroll = this.handleScroll.bind(this)
      this.getWindowSize = this.getWindowSize.bind(this)

      this.prevScrollPos = 0

      this.state = {
        windowHeight: window.innerHeight,
      }
    }

    componentWillMount() {
      window.addEventListener('resize', this.getWindowSize)
      window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.getWindowSize)
      window.removeEventListener('scroll', this.handleScroll)
    }

    // 获取页面高度
    getWindowSize() {
      this.setState({ windowHeight: window.innerHeight })
    }

    // 处理滚动事件
    handleScroll() {
      const { windowHeight } = this.state

      // 节流
      let isStop = true
      if (!isStop) return
      isStop = false

      setTimeout(() => {
        // 距离页面顶部高度
        let onScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

        if (this.prevScrollPos < onScrollTop) {
          // loading图片
          this.setState({ windowHeight: onScrollTop - this.prevScrollPos + this.state.windowHeight + 100 })
        }

        this.prevScrollPos = onScrollTop

        isStop = true
      }, 100)
    }

    render() {
      return <WrappedComponent {...this.props} windowHeight={this.state.windowHeight}/>
    }
  }
}

export default handleScrollEvent
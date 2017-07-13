import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './Layout.css'

const topicTypes = [{
  type: 'all', icon: 'icon-quanbu', name: '全部', link: '/'
},{
  type: 'best', icon: 'icon-huo', name: '精华', link: '/aboute1'
},{
  type: 'share', icon: 'icon-fenxiang', name: '分享', link: '/aboute'
},{
  type: 'answer', icon: 'icon-wenda', name: '问答', link: '/aboute'  
},{
  type: 'recruit', icon: 'icon-zhaopin', name: '招聘', link: '/aboute'  
},{
  type: 'about', icon: 'icon-guanyu', name: '关于', link: '/aboute'  
}]

export default class Layout extends Component {
  constructor(props) {
    super(props)

    // 渲染func
    this.renderSider = this.renderSider.bind(this)
    // 事件监听
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleResize = this.handleResize.bind(this)

    this.state = {
      currentType: 'all',
      menuPosition: -200,
      isShowSider: window.innerWidth <= 600 ? false : true,
    }
  }

  componentWillMount() {
    window.addEventListener('mousedown', this.handleMouseDown)
    window.addEventListener('touchstart', this.handleTouchStart)
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleTouchEnd)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleMouseDown)
    window.removeEventListener('touchstart', this.handleTouchStart)
    window.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('touchend', this.handleTouchEnd)
    window.removeEventListener('resize', this.handleResize)    
  }

  // 监听页面大小
  handleResize() {
    if (window.innerWidth <= 600) {
      this.setState({ isShowSider: false })
    } else {
      this.setState({ isShowSider: true })
    }
  }

  // 监听触摸开始事件
  handleTouchStart(event) {
    // 判断有几根手机
    let touchesCnt = event.changedTouches.length

    if (touchesCnt === 1) {
      this.startX = event.changedTouches[0].pageX
    }
  }

  // 监听触摸结束事件
  handleTouchEnd(event) {
    if (this.state.menuPosition <= -100) {
      this.setState({ menuPosition: -200 })
    } else {
      this.setState({ 
        menuPosition: 0,
      })
    }
  }

  // 监听触摸移动事件
  handleTouchMove(event) {
    // 判断有几根手机
    let touchesCnt = event.changedTouches.length

    if (touchesCnt === 1 && typeof this.startX !== 'undefined') {
      // 判断移动方向
      let endX = event.changedTouches[0].pageX
      let moveLen = endX - this.startX

      if (moveLen < -50 && moveLen >= -200) {
        this.setState({ menuPosition: moveLen })
      } else if (moveLen > 0 && moveLen <= 200) {
        this.setState({ menuPosition: moveLen - 200 })
      }
    }
  }

  // 监听鼠标事件
  handleMouseDown(event) {
    let e = event || window.event;
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let x = e.pageX || e.clientX + scrollX;

    if (x > 200) {
      this.setState({ menuPosition: -200 })
    }
  }

  render() {
    return (
      <main>
        {this.renderHeader()}
        
        <div className={styles.container}>
          {this.renderSider()}
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </main>
    )
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className={styles.tmTbod}>
          <img className={styles.imgLogo} src='https://cnodejs.org/public/images/cnodejs_light.svg' />
          <span className={styles.crumb}>全部</span>
          <a className={styles.menu} onClick={() => this.setState({ menuPosition: 0 })}>
            <i className='iconfont icon-menu' />
          </a>
        </div>

        <Link className={styles.avatar} to='/user'>
          <i className='iconfont icon-login' />
        </Link>
      </div>
    )
  }

  renderSider() {
    return (
      <div 
        style={this.state.isShowSider ? undefined : {left: this.state.menuPosition}}
        className={styles.sider}>
        <ul>
          {
            topicTypes.map(data => {
              let fontStyle = undefined
              if (data.type === this.state.currentType) {
                fontStyle = styles.currentType
              }

              return <li key={data.type}>
                <Link to={data.link} onClick={() => this.setState({ currentType: data.type })}>
                  <i className={`iconfont ${data.icon} ${fontStyle}`} />
                  <span className={fontStyle}>{data.name}</span>
                </Link>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}
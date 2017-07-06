import React, { Component } from 'react'

import styles from './Layout.css'

const topicTypes = [{
  type: 'all', icon: 'icon-quanbu', name: '全部'
},{
  type: 'best', icon: 'icon-huo', name: '精华'
},{
  type: 'share', icon: 'icon-fenxiang', name: '分享'
},{
  type: 'answer', icon: 'icon-wenda', name: '问答'  
},{
  type: 'recruit', icon: 'icon-zhaopin', name: '招聘'  
},{
  type: 'about', icon: 'icon-guanyu', name: '关于'  
}]

export default class Layout extends Component {
  constructor(props) {
    super(props)

    this.renderSider = this.renderSider.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)

    this.state = {
      currentType: 'all',
      isShowMenu: false,
    }
  }

  componentWillMount() {
    window.addEventListener('mousedown', this.handleMouseDown)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleMouseDown)
  }

  // 监听鼠标事件
  handleMouseDown(event) {
    let e = event || window.event;
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let x = e.pageX || e.clientX + scrollX;

    if (x > 200) {
      this.setState({ isShowMenu: false })
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
          <a className={styles.menu} onClick={() => this.setState({ isShowMenu: true })}>
            <i className='iconfont icon-menu' />
          </a>
        </div>

        <a className={styles.avatar} onClick={() => console.log('login')}>
          <i className='iconfont icon-login' />
        </a>
      </div>
    )
  }

  renderSider() {
    return (
      <div className={this.state.isShowMenu ? styles.absoluteSider : styles.sider}>
        <ul>
          {
            topicTypes.map(data => {
              let fontStyle = undefined
              if (data.type === this.state.currentType) {
                fontStyle = styles.currentType
              }

              return <li key={data.type}>
                <a href='#' onClick={() => this.setState({ currentType: data.type })}>
                  <i className={`iconfont ${data.icon} ${fontStyle}`} />
                  <span className={fontStyle}>{data.name}</span>
                </a>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}
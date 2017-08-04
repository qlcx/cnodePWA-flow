import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import styles from './Sider.css'

const topicTypes = [{
  type: 'all', icon: 'icon-quanbu', name: '全部', link: '/#'
},{
  type: 'good', icon: 'icon-huo', name: '精华', link: '/aboute1'
},{
  type: 'share', icon: 'icon-fenxiang', name: '分享', link: '/aboute'
},{
  type: 'ask', icon: 'icon-wenda', name: '问答', link: '/aboute'  
},{
  type: 'recruit', icon: 'icon-zhaopin', name: '招聘', link: '/aboute'  
},{
  type: 'about', icon: 'icon-guanyu', name: '关于', link: '/aboute'  
}]

export default class Sider extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentType: 'all',
    }
  }

  render() {
    const { menuPosition, isShowSider } = this.props

    return (
      <div 
        style={isShowSider ? undefined : {left: menuPosition}}
        className={styles.sider}>
        <ul>
          {
            topicTypes.map(data => {
              let fontStyle = undefined
              if (data.type === this.state.currentType) {
                fontStyle = styles.currentType
              }

              return <li key={data.type}>
                <Link name={'top'} to={data.link} onClick={() => this.setState({ currentType: data.type })}>
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
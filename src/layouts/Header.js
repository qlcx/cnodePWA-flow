import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.css'

const IMG_LOGO_URL = 'https://cnodejs.org/public/images/cnodejs_light.svg'

export default class Header extends PureComponent {
  render() {
    return <div className={this.props.isShowHeader ? styles.header : styles['header-hide']}>
      <div className={styles.tmTbod}>
        <img className={styles.imgLogo} src={IMG_LOGO_URL} />
        <span className={styles.crumb}>全部</span>
        <a className={styles.menu} onClick={() => this.setState({ menuPosition: 0 })}>
          <i className='iconfont icon-menu' />
        </a>
      </div>

      <Link className={styles.avatar} to='/user'>
        <i className='iconfont icon-login' />
      </Link>
    </div>
  }
}
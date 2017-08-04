//@flow
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.css'

const IMG_LOGO_URL: string = 'https://cnodejs.org/public/images/cnodejs_light.svg'

export default class Header extends PureComponent {
  props: {
    isShowHeader: boolean,
    handleMenuEvent: () => void,
  }

  render() {
    return <div className={this.props.isShowHeader ? styles.header : styles['header-hide']}>
      <div className={styles.tmTbod}>
        <img className={styles.imgLogo} src={IMG_LOGO_URL} />
        <span className={styles.crumb}>全部</span>
        <a className={styles.menu} onClick={this.props.handleMenuEvent}>
          <i className='iconfont icon-menu' />
        </a>
      </div>

      <Link className={styles.avatar} to='/user'>
        <i className='iconfont icon-login' />
      </Link>
    </div>
  }
}
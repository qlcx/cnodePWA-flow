//@flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.css';

const IMG_LOGO_URL: string = 'https://cnodejs.org/public/images/cnodejs_light.svg';
const TitleMaps: {[type: string]: string } = {
  '/': '全部',
  '/goodtopics': '精华',
  '/sharetopics': '分享',
  '/asktopics': '问答',
  '/jobtopics': '招聘',
  '/about': '关于',
};

export default class Header extends PureComponent {
  props: {
    isShowHeader: boolean,
    handleMenuEvent: () => void,
    currentPath: string,
  };

  render() {
    return <div className={this.props.isShowHeader ? styles.header : styles['header-hide']}>
      <div className={styles.tmTbod}>
        <img className={styles.imgLogo} src={IMG_LOGO_URL} />
        <span className={styles.crumb}>{TitleMaps[this.props.currentPath]}</span>
        <a className={styles.menu} onClick={this.props.handleMenuEvent}>
          <i className='iconfont icon-menu' />
        </a>
      </div>

      <Link className={styles.avatar} to='/user'>
        <i className='iconfont icon-login' />
      </Link>
    </div>;
  }
};
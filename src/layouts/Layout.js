import React, { Component } from 'react'

import styles from './Layout.css'

const Layout = props => {
  return(
    <main>
      <div className={styles.header}>
        <div className={styles.tmTbod}>
          <img className={styles.imgLogo} src='https://cnodejs.org/public/images/cnodejs_light.svg' />
          <span className={styles.crumb}>全部</span>
          <a className={styles.menu} onClick={() => console.log('menu')}>
            <i className='iconfont icon-menu' />
          </a>
        </div>
        
        {/* <nav className={styles.headerNav}>
          <ul>
            <li><a href='#'>全部</a></li>
            <li><a href='#'>精华</a></li>
            <li><a href='#'>分享</a></li>
            <li><a href='#'>问答</a></li>
            <li><a href='#'>招聘</a></li>
            <li><a href='#'>关于</a></li>
            
            <li><a href='#'>登录</a></li>
          </ul>
        </nav> */}
        <a className={styles.avatar} onClick={() => console.log('login')}>
          <i className='iconfont icon-login' />
        </a>
      </div>
      
      <div className={styles.container}>
        {props.children}
      </div>
      
      <div>
      </div>
    </main>
  )
}

export default Layout
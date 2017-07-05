// @flow
import React, { Component } from 'react'

import styles from './Layout.css'

const Layout = (props: Object) => {
  return(
    <main>
      <div className={styles.header}>
        <img className={styles.imgLogo} src='https://cnodejs.org/public/images/cnodejs_light.svg' />
        <nav className={styles.headerNav}>
          <ul>
            <li><a href='#'>全部</a></li>
            <li><a href='#'>精华</a></li>
            <li><a href='#'>分享</a></li>
            <li><a href='#'>问答</a></li>
            <li><a href='#'>招聘</a></li>
            <li><a href='#'>关于</a></li>
            
            <li><a href='#'>登录</a></li>
          </ul>
        </nav>
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
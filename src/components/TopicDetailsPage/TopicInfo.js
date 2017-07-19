import React, { Component } from 'react'
import moment from 'moment'

import markdownStyle from './github-markdown.css'
import styles from './TopicInfo.css'

export default class TopicInfo extends Component {
  render() {
    const { header, content } = this.props

    let createTimeFromNow = moment(header.createTime).fromNow()

    return <article>
       <div className={styles.header}>
        <div className={styles.titleSection}>
          <span className={styles.tag}>{header.tag}</span>
          <span 
            style={header.tag ? {marginLeft: 8} : null}
            className={styles.title}>
            {header.title}
          </span>
        </div>
        <div className={styles.topicInfo}>
          <div>{`• 发布于${createTimeFromNow} • 作者 ${header.authorName} • 访问数 ${header.visitNum}`}</div>
        </div>
      </div>
      <section 
        className={`${markdownStyle['markdown-body']} ${styles.content}`} 
        dangerouslySetInnerHTML={{__html: content}} />
    </article>
  }
}
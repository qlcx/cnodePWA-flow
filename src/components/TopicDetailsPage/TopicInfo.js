import React, { Component } from 'react'
import moment from 'moment'

import markdownStyle from './github-markdown.css'
import styles from './TopicInfo.css'

export default class TopicInfo extends Component {
  render() {
    const { header, content } = this.props

    return <article>
       <div className={styles.header}>
        <div className={styles.titleSection}>
          <div>{header.tag}</div>
          <span>{header.title}</span>
        </div>
        <div className={styles.topicInfo}>
          <div>{`${header.createTime} 作者：${header.authorName} `}</div>
        </div>
      </div>
      <section 
        className={`${markdownStyle['markdown-body']} ${styles.content}`} 
        dangerouslySetInnerHTML={{__html: content}} />
    </article>
  }
}
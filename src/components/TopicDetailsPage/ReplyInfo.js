import React, { Component } from 'react'

import markdownStyle from './github-markdown.css'
import styles from './ReplyInfo.css'

export default class ReplyInfo extends Component {
  render() {
    const { replyList, replyNum } = this.props

    return <div>
      <div className={styles.replyNum}>
        {`回复数：${replyNum}`}
      </div> 
      {
        replyList && replyList.map(data => {
          return this.renderReplyInfo(data)
        })
      } 
    </div>
  }

  renderReplyInfo(data) {
    return <div key={data.id} className={styles.replyList}>
      <div className={styles.userInfo}>
        <img 
          className={styles.avatar} 
          src={data.author.avatar_url} 
          title={data.author.loginname} />
        <span>{data.author.loginname}</span>
      </div>
      <div 
        className={`${markdownStyle['markdown-body']} ${styles.replyInfo}`} 
        dangerouslySetInnerHTML={{__html: data.content}} />
    </div>
  }
}
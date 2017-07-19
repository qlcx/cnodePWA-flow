import React, { Component } from 'react'
import moment from 'moment'

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
        replyList && replyList.map((data, i) => {
          return this.renderReplyInfo(data, i)
        })
      } 
    </div>
  }

  renderReplyInfo(data, no) {
    return <div key={data.id} className={styles.replyList}>
      <div className={styles.userInfo}>
        <span className={styles.no}>{`#${no+1}`}</span>
        <img 
          className={styles.avatar} 
          src={data.author.avatar_url} 
          title={data.author.loginname} />
        <span className={styles.loginname}>{data.author.loginname}</span>
        <span className={styles.opt}>
          {moment(data.create_at).fromNow()}
          <i className='iconfont icon-upvote' />
          <span>{data.ups.length}</span>
        </span>
      </div>
      <div 
        className={`${markdownStyle['markdown-body']} ${styles.replyInfo}`} 
        dangerouslySetInnerHTML={{__html: data.content}} />
    </div>
  }
}
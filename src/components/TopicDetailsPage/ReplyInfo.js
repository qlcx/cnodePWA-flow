import React, { Component } from 'react'
import moment from 'moment'

import ImgLazyLoad from '../Shared/ImgLazyLoad'

import markdownStyle from './github-markdown.css'
import styles from './ReplyInfo.css'

export default class ReplyInfo extends Component {
  constructor(props) {
    super(props)

    this.renderReplyInfo = this.renderReplyInfo.bind(this)
  }

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
        <ImgLazyLoad 
          classname={styles.avatar} 
          avatar_url={data.author.avatar_url} 
          loginname={data.author.loginname}
          windowHeight={this.props.windowHeight} />
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
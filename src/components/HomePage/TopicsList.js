import React, { Component } from 'react'
import moment from 'moment'

import styles from './TopicsList.css'

// 标签转换
const TagsMap = new Map()
TagsMap.set('share', '分享')
TagsMap.set('ask', '问答')
TagsMap.set('top', '置顶')

class TopicsList extends Component {
  render() {
    const { topicsList } = this.props

    return <ul className={styles.listGroup}>
      {
        topicsList.map(data => {
          return this.renderTopicItem(data)
        })
      }
    </ul>
  }

  renderTopicItem(topicData) {
    return <li key={topicData.id} className={styles.listGroupItem}>
      <a href='#'>
        <img 
          className={styles.avatar} 
          src={topicData.author.avatar_url} 
          title={topicData.author.loginname} />
      </a>

      {this.renderTopicTag(topicData.tab, topicData.top)}

      <a href='#' className={styles.topicTitle}>
        {topicData.title}
      </a>

      <span className={styles.topicLastReply}>
        {moment(topicData.last_reply_at).fromNow()}
      </span>
    </li>
  }

  // 渲染话题标签
  renderTopicTag(tag, isTop) {
    let tagName = TagsMap.get(tag)

    let tagClasses = `${styles.topicTag} `
    // 显示置顶标签
    if (isTop) {
      tagName = TagsMap.get('top')
      tagClasses += `${styles.topicTagTop}`
    }

    // 如果没有标签数据则不显示
    if (!tag) return <span />

    return <span className={tagClasses}>{tagName}</span>
  }
}

export default TopicsList
import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import SpinnerComponent from '../BasicComponent/SpinnerComponent'
import styles from './TopicsList.css'

import * as utils from '../../utils'

class TopicsList extends Component {
  render() {
    const { topicsList, tableLoading } = this.props

    return <div className={styles.root}>
      {tableLoading ? <SpinnerComponent /> : null}
      <ul className={styles.listGroup}>
        {
          topicsList.map(data => {
            return this.renderTopicItem(data)
          })
        }
      </ul>
    </div>
  }

  renderTopicItem(topicData) {
    return <li key={topicData.id} className={styles.listGroupItem}>
      <a href='#'>
        <img 
          className={styles.avatar} 
          src={topicData.author.avatar_url} 
          title={topicData.author.loginname} />
      </a>

      {this.renderTopicTag(topicData.tab, topicData.good, topicData.top)}

      <Link className={styles.topicTitle} to={`/topics/${topicData.id}`}>
        {topicData.title}
      </Link>

      <span className={styles.topicLastReply}>
        {moment(topicData.last_reply_at).fromNow()}
      </span>
    </li>
  }

  // 渲染话题标签
  renderTopicTag(tab, isGood, isTop) {
    let tag = utils.setTopicTag({tab, isGood, isTop})

    let tagClasses = `${styles.topicTag} `
    // 显示置顶&精华标签
    if (isTop || isGood) {
      tagClasses += `${styles.topicTagToporGood}`
    }

    // 如果没有标签数据则不显示
    if (!tab) return <span />

    return <span className={tagClasses}>{tag}</span>
  }
}

export default TopicsList
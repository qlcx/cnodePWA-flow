import React, { Component } from 'react'

import styles from './TopicsList.css'

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
      <a href='#' className={styles.topicTitle}>
        {topicData.title}
      </a>
    </li>
  }
}

export default TopicsList
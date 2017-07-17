import React, { Component } from 'react'

import markdownStyle from './github-markdown.css'
import styles from './TopicInfo.css'

export default class TopicInfo extends Component {
  render() {

    return <div className={styles.root}>
      <div className={markdownStyle['markdown-body']} dangerouslySetInnerHTML={{__html: this.props.content}} />
    </div>
  }
}
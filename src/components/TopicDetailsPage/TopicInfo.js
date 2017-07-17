import React, { Component } from 'react'
import markdownStyle from './github-markdown.css'

export default class TopicInfo extends Component {
  render() {

    return <div className={markdownStyle['markdown-body']} dangerouslySetInnerHTML={{__html: this.props.content}} />  
  }
}
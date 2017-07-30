import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import SpinnerComponent from '../BasicComponent/SpinnerComponent'
import styles from './TopicsList.css'

import * as utils from '../../utils'

class TopicsList extends Component {
  constructor(props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)
    this.getWindowSize = this.getWindowSize.bind(this)
    this.handleLazyLoad = this.handleLazyLoad.bind(this)

    // img refs
    this.imgRefs = []
    this.prevScrollPos = 0

    this.state = {
      windowHeight: window.innerHeight,
      imgCurrentLoadingPos: 0,
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.getWindowSize)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowSize)
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidMount() {
    this.handleLazyLoad()
  }

  // 获取页面高度
  getWindowSize() {
    this.setState({ windowHeight: window.innerHeight })
  }

  // 处理滚动事件
  handleScroll() {
    const { windowHeight } = this.state
    // 距离页面顶部高度
    let onScrollTop = document.body.scrollTop

    if (this.prevScrollPos < onScrollTop) {
      // loading图片
      this.setState({ windowHeight: onScrollTop - this.prevScrollPos + this.state.windowHeight })

      this.handleLazyLoad()
    }

    this.prevScrollPos = onScrollTop
  }

  handleLazyLoad() {
    const { imgCurrentLoadingPos } = this.state
    let imgRefsLen = this.imgRefs.length 
    let imgPos = imgCurrentLoadingPos

    if (imgRefsLen && imgPos < imgRefsLen) {
      for (let i = imgPos; this.imgRefs[i] && this.imgRefs[i].y < this.state.windowHeight && i < imgRefsLen; i++) {
        this.imgRefs[i].src = this.imgRefs[i].attributes['data-src'].value
        imgPos = i
      }

      this.setState({ imgCurrentLoadingPos:  imgPos })
    }
  }

  render() {
    const { topicsList, tableLoading } = this.props

    return <div className={styles.root}>
      {tableLoading ? <SpinnerComponent /> : null}
      <ul className={styles.listGroup}>
        {
          topicsList.map((data, i) => {
            return this.renderTopicItem(data, i)
          })
        }
      </ul>
    </div>
  }

  renderTopicItem(topicData, i) {
    return <li key={topicData.id} className={styles.listGroupItem}>
      <a href='#'>
        <img
          ref={ ref => {this.imgRefs[i] = ref} }
          className={styles.avatar}
          src={null}
          data-src={topicData.author.avatar_url} 
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
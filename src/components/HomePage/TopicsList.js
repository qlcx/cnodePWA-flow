import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import SpinnerComponent from '../BasicComponent/SpinnerComponent';
import ImgLazyLoad from '../Shared/ImgLazyLoad';
import styles from './TopicsList.css';

import { setTopicTag } from '../../utils';

class TopicsList extends Component {
  constructor(props) {
    super(props);

    this.renderTopicItem = this.renderTopicItem.bind(this);
  }

  render() {
    const { topicsList, tableLoading, topicTitle } = this.props;

    return <div className={styles.root}>
      {tableLoading ? <SpinnerComponent /> : null}
      <ul className={styles.listGroup}>
        {topicTitle && <li className={`${styles.listGroupItem} ${styles.listTopicTitle}`}>{topicTitle}</li>}
        {
          topicsList && topicsList.map((data, i) => {
            return this.renderTopicItem(data, i)
          })
        }
      </ul>
    </div>;
  }

  renderTopicItem(topicData, i) {
    return <li key={topicData.id} className={styles.listGroupItem}>
      <Link to={`/userInfo/${topicData.author.loginname}`}>
        <ImgLazyLoad
          classname={styles.avatar} 
          avatar_url={topicData.author.avatar_url} 
          loginname={topicData.author.loginname}
          windowHeight={this.props.windowHeight} />
      </Link>

      {this.renderTopicTag(topicData.tab, topicData.good, topicData.top)}

      <Link className={styles.topicTitle} to={`/topics/${topicData.id}`}>
        {topicData.title}
      </Link>

      <span className={styles.topicLastReply}>
        {moment(topicData.last_reply_at).fromNow()}
      </span>
    </li>;
  }

  // 渲染话题标签
  renderTopicTag(tab, isGood, isTop) {
    let tag = setTopicTag({tab, isGood, isTop});

    let tagClasses = `${styles.topicTag} `;
    // 显示置顶&精华标签
    if (isTop || isGood) {
      tagClasses += `${styles.topicTagToporGood}`;
    }

    // 如果没有标签数据则不显示
    if (!tab || !tag) return <span />;

    return <span className={tagClasses}>{tag}</span>;
  }
}

export default TopicsList;
import React, { PureComponent } from 'react'

import styles from './UserInfoDetails.css'

export default class UserInfoDetails extends PureComponent {
  render() {
    const { userInfoDetailsProps } = this.props

    if (!userInfoDetailsProps) {
      return <div />
    }

    return <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img
            className={styles.avatar}
            src={userInfoDetailsProps.avatar_url} 
            title={userInfoDetailsProps.loginname} />
          <span className={styles.loginName}>{userInfoDetailsProps.loginname}</span>
        </div>

        <div className={styles.about}>
          <span>{`积分：${userInfoDetailsProps.score}`}</span>
          <span>
            <a target='_Blank' href={`https://github.com/${userInfoDetailsProps.githubUsername}`}>
              {`github: ${userInfoDetailsProps.githubUsername}`}
            </a>
          </span>
          <span>{`创建时间：${userInfoDetailsProps.create_at.split('T')[0]}`}</span>
        </div>
      </div>
    </div>
  }
}
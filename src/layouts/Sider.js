//@flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './Sider.css';

const topicTypes = [{
  icon: 'icon-quanbu', name: '全部', link: '/'
},{
  icon: 'icon-huo', name: '精华', link: '/goodtopics'
},{
  icon: 'icon-fenxiang', name: '分享', link: '/sharetopics'
},{
  icon: 'icon-wenda', name: '问答', link: '/asktopics'  
},{
  icon: 'icon-zhaopin', name: '招聘', link: '/jobtopics'  
},{
  icon: 'icon-guanyu', name: '关于', link: '/aboute'  
}];

type SiderProps = {
  menuPosition: number,
  isShowSider: boolean,
  currentPath: string,
};

export default class Sider extends PureComponent {
  props: SiderProps;

  render() {
    const { menuPosition, isShowSider, currentPath } = this.props;

    return (
      <div 
        style={isShowSider ? undefined : {left: menuPosition}}
        className={styles.sider}>
        <ul>
          {
            topicTypes.map(data => {
              let fontStyle: ?string = undefined;
              if (data.link === currentPath) fontStyle = styles.currentType;

              return <li key={data.link}>
                <Link name={'top'} to={data.link}>
                  <i className={typeof fontStyle === 'string' ? `iconfont ${data.icon} ${fontStyle}` : `iconfont ${data.icon}`} />
                  <span className={fontStyle}>{data.name}</span>
                </Link>
              </li>;
            })
          }
        </ul>
      </div>
    );
  }
};
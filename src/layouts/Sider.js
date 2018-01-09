//@flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './Sider.css';

const topicTypes = [{
  type: 'all', icon: 'icon-quanbu', name: '全部', link: '/#'
},{
  type: 'good', icon: 'icon-huo', name: '精华', link: '/goodtopics'
},{
  type: 'share', icon: 'icon-fenxiang', name: '分享', link: '/sharetopics'
},{
  type: 'ask', icon: 'icon-wenda', name: '问答', link: '/asktopics'  
},{
  type: 'recruit', icon: 'icon-zhaopin', name: '招聘', link: '/jobtopics'  
},{
  type: 'about', icon: 'icon-guanyu', name: '关于', link: '/aboute'  
}];

type SiderProps = {
    menuPosition: number,
    isShowSider: boolean,
};

export default class Sider extends PureComponent {
  state: {
    currentType: string,
  };
  props: SiderProps;

  constructor(props: SiderProps) {
    super(props);

    this.state = {
      currentType: 'all',
    };
  }

  render() {
    const { menuPosition, isShowSider } = this.props;

    return (
      <div 
        style={isShowSider ? undefined : {left: menuPosition}}
        className={styles.sider}>
        <ul>
          {
            topicTypes.map(data => {
              let fontStyle: ?string = undefined;

              if (data.type === this.state.currentType) {
                fontStyle = styles.currentType;
              }

              return <li key={data.type}>
                <Link name={'top'} to={data.link} onClick={() => this.setState({ currentType: data.type })}>
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
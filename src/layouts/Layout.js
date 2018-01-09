//@flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import type { Children } from 'react';

import Header from './Header';
import Sider from './Sider';

import styles from './Layout.css';

type LayoutProps = {
  children: Children,
};

export default class Layout extends Component {
  state: {
    menuPosition: number,
    isShowSider: boolean,
    isShowHeader: boolean,
  };
  props: LayoutProps;

  // 处理事件
  handleMouseDown: (event: MouseEvent) => void;
  handleTouchStart: (event: TouchEvent) => void;
  handleTouchEnd: () => void;
  handleTouchMove: (event: TouchEvent) => void;
  handleResize: () => void;
  handleScroll: () => void;

  // 滚动
  prevScrollPos: number;
  prevScrollDirection: string;
  scrollDirection: string;
  // 触摸移动
  startX: number;
  // 触摸结束定时器
  touchEndTimer: number;

  constructor(props: LayoutProps) {
    super(props);

    // 事件监听
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      menuPosition: -210,
      isShowSider: window.innerWidth <= 600 ? false : true,
      isShowHeader: true,
    };
  }

  componentWillMount() {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  // 处理页面滚动事件
  handleScroll() {
    // 页面宽度<=600时处理滚动事件
    if (!this.state.isShowSider) {
      // 函数去抖
      let onScrollTop: number = document.body ? document.body.scrollTop : 0;

      if (this.prevScrollPos && this.prevScrollPos > onScrollTop) {
        this.scrollDirection = 'up';
      } else if (this.prevScrollPos) {
        this.scrollDirection = 'down';
      }

      if (this.scrollDirection && this.prevScrollDirection !== this.scrollDirection) {
        this.setState({ isShowHeader: this.scrollDirection === 'up' ? true : false });
      }

      this.prevScrollDirection = this.scrollDirection;
      this.prevScrollPos = onScrollTop;
    }
  }

  // 监听页面大小
  handleResize() {
    if (window.innerWidth <= 600) {
      this.setState({ isShowSider: false });
    } else {
      this.setState({ 
        isShowSider: true,
        isShowHeader: true,
      });
    }
  }

  // 监听触摸开始事件
  handleTouchStart(event: TouchEvent) {
    // 判断有几根手机
    let touchesCnt = event.changedTouches.length;

    if (touchesCnt === 1) {
      this.startX = event.changedTouches[0].pageX;
    }
  }

  // 监听触摸结束事件
  handleTouchEnd() {
    this.touchEndTimer && clearTimeout(this.touchEndTimer);

    this.touchEndTimer = setTimeout(() => {
      if (this.state.menuPosition <= -100) {
        this.setState({ menuPosition: -210 });
      } else {
        this.setState({ 
          menuPosition: 0,
        });
      }
    }, 100);
  }

  // 监听触摸移动事件
  handleTouchMove(event: TouchEvent) {
    // 判断有几根手机
    let touchesCnt = event.changedTouches.length;

    if (touchesCnt === 1 && typeof this.startX !== 'undefined') {
      let isStop = true;
      if (!isStop) return;
      isStop = false;

      setTimeout(() => {
        // 判断移动方向
        let endX: number = event.changedTouches[0].pageX;
        let moveLen: number = endX - this.startX;

        if (moveLen < -30) {
          this.setState({ menuPosition: -210 });
        } else if (moveLen > 0 && moveLen <= 200 && this.startX < 50) {
          this.setState({ menuPosition: moveLen - 200 });
        }

        isStop = true;
      }, 100);
    }
  }

  // 监听鼠标事件
  handleMouseDown(event: MouseEvent) {
    let e: MouseEvent = event || window.event;
    let scrollX: number = (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft) || 1;
    let x: number = e.pageX || e.clientX + scrollX;

    if (x > 200) {
      this.setState({ menuPosition: -210 });
    }
  }

  render() {
    return (
      <main>
        <Header 
          isShowHeader={this.state.isShowHeader}
          handleMenuEvent={() => this.setState({ menuPosition: 0 })} />
        
        <div className={this.state.isShowHeader ? styles.container : styles['container-topBlankHide']}>
          <Sider 
            isShowSider={this.state.isShowSider}
            menuPosition={this.state.menuPosition} />
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </main>
    );
  }
};
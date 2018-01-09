import React, { Component } from 'react';

class ImgLazyLoad extends Component {
  constructor(props) {
    super(props);

    this.handleLazyLoad = this.handleLazyLoad.bind(this);
  }

  componentDidMount() {
    this.handleLazyLoad();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let isImgSrc = this.imgRefs.attributes.hasOwnProperty('src');

    if (!isImgSrc) {
      this.handleLazyLoad();
      return true;
    }

    return false;
  }

  handleLazyLoad() {
    const { windowHeight } = this.props;

    if (this.imgRefs.y < windowHeight) {
      this.imgRefs.setAttribute('src', this.imgRefs.getAttribute('data-src'));
      // 强制渲染组件
      this.forceUpdate();
    }
  }

  render() {
    const { avatar_url, loginname, classname } = this.props;

    return <img
      ref={ ref => {this.imgRefs = ref} }
      className={classname}
      style={{backgroundColor: '#F5F5F5'}}
      data-src={avatar_url} 
      title={loginname}
      alt='' />;
  }
}

export default ImgLazyLoad;
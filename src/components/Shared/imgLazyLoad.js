import React, { Component } from 'react'

const avatarStyle = {
  width: 30,
  height: 30,
  marginRight: '1rem'
}

class ImgLazyLoad extends Component {
  constructor(props) {
    super(props)

    this.handleLazyLoad = this.handleLazyLoad.bind(this)
  }

  componentDidMount() {
    console.log(this.imgRefs)
    this.handleLazyLoad()
  }

  // componentDidUpdate() {
  //   this.handleLazyLoad()
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.imgRefs && !this.imgRefs.scr) {
      console.log(this.imgRefs)
      this.handleLazyLoad()
      return true
    }

    return false
  }

  handleLazyLoad() {
    const { windowHeight } = this.props

    if (this.imgRefs.y < windowHeight) {
      this.imgRefs.src = this.imgRefs.attributes['data-src'].value
    }
  }

  render() {
    const { avatar_url, loginname } = this.props

    return <img
      ref={ ref => {this.imgRefs = ref} }
      style={avatarStyle}
      src={null}
      data-src={avatar_url} 
      title={loginname} />
  }
}

export default ImgLazyLoad
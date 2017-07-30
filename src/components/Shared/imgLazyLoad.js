import React, { PureComponent } from 'react'

const avatarStyle = {
  width: 30,
  height: 30,
  marginRight: '1rem'
}

class ImgLazyLoad extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  componentDidMount() {

  }

  render() {
    const { avatar_url, loginname } = this.props

    <img
      // ref={ ref => {this.imgRefs[i] = ref} }
      style={avatarStyle}
      src={null}
      data-src={avatar_url} 
      title={loginname} />
  }
}

export default ImgLazyLoad
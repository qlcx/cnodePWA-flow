import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

import styles from './LoginPage.css'

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.loginOpt = this.loginOpt.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputPwd = this.handleInputPwd.bind(this);

    this.state = {
      pwd: '',
      name: '',
    };
  }
  
  loginOpt(name, pass) {
    // 登陆操作
    axios.get('/cnodejs/signin').then(res => {
      const divElem = document.createElement('div');
      divElem.innerHTML = res.data;
      const metaTags = divElem.getElementsByTagName('meta');
      for (let i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute('name') === 'csrf-token')
          return metaTags[i].getAttribute('content');
      }
    }).then(_csrf => {
      const formData = {
        name: name,
        pass: pass,
        _csrf: _csrf,
      };
      return axios.post('/cnodejs/signin', qs.stringify(formData), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    }).then(() => {
      return axios.get('/cnodejs/setting');
    }).then(res => {
      const reg = /<div>\s*<span>\s*字符串：\s*<\/span>\s*([0-9a-z-]+)\s*<\/div>/g;
      res.data.match(reg);
      if (typeof RegExp.$1 === 'string') this.props.getUserLoginSta(RegExp.$1);
    }).catch(err => {
      console.log(err);
    });
  }

  onSubmit(e) {
    if (this.state.name && this.state.pwd) {
      this.loginOpt(this.state.name, this.state.pwd);
    }
    event.preventDefault();
  }

  handleInputName(e) {
    this.setState({name: e.target.value});
  }

  handleInputPwd(e) {
    this.setState({pwd: e.target.value});
  }

  render() {
    const windowWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
    const windowHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;

    return (
      <div className={styles.pannel}>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>用户名：</label>
            <input type='text' value={this.state.name} placeholder="用户名或邮箱" onChange={this.handleInputName}/>
          </div>
          <div>
            <label>密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
            <input type='password' value={this.state.pwd} placeholder="密码" onChange={this.handleInputPwd}/>
          </div>
          <div>
            <button type='submit'>登陆</button>
            <a href='#'>扫码登陆</a>
          </div>
        </form>
      </div>
    );
  }
}

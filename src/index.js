// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Router from './router'
import registerServiceWorker from './registerServiceWorker'

// 添加中文时间显示
import moment from 'moment'
moment.lang('zh-cn')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Router)

if(module.hot) {
  module.hot.accept('./router', () => {
    const NewRouter = require('./router').default
    render(NewRouter)
  })  
}

registerServiceWorker()
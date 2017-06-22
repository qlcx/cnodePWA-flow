// @flow
import axios from 'axios'
import Promise from 'bluebird'

// http请求前缀
const httpPrefix: string = 'https://cnodejs.org/api/v1'

const fetchData = (): void => {}

// get
fetchData.get = (url: string) => {
  const reqURL: string = `${httpPrefix}${url}`

  axios.get(reqURL).then((res: {data: {success: string, data: any[]}}) => {
    let resData: {success: string, data: any[]} = res.data

    if (resData.success) {
      return Promise.resolve(resData.data)
    } else {
      const ErrMsg: string = 'http请求失败'
      return Promise.reject(ErrMsg)
    }
  }).catch((e: string) => {
    return Promise.reject(e)
  })
}

// post
fetchData.post = (url: string) => {

}
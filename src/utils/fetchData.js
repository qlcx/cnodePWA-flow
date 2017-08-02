// @flow
import axios from 'axios'
import Promise from 'bluebird'

type GetResObj = {success: string, data: any[] | any}
type ResHttp = {data: GetResObj}

// http请求前缀
const httpPrefix: string = 'https://cnodejs.org/api/v1'

export default function fetchData(method: string, url: string) {
  const reqURL: string = `${httpPrefix}${url}`

  return axios({method: method, url: reqURL}).then((res: ResHttp) => {
    let resData: GetResObj = res.data
    // post方法
    if (method === 'post') {
      return Promise.resolve(resData)
    }
    // get方法
    if (method === 'get') {
      if (resData.success) {
        return Promise.resolve(resData.data)
      } else {
        const ErrMsg: string = 'http请求失败'
        return Promise.reject(ErrMsg)
      }
    }
  }).catch((e: string) => {
    return Promise.reject(e)
  })
}
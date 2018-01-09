// @flow
import axios from 'axios';
import Promise from 'bluebird';

/**************** 设置话题标签 *****************/
// 话题标签
const tagsMap: { [type: string]: string } = {};
tagsMap['all'] = '全部';
tagsMap['good'] = '精华';
tagsMap['share'] = '分享';
tagsMap['ask'] = '问答';
tagsMap['top'] = '置顶';

// 设置话题标签
export const setTopicTag = (obj: {tab: string, isGood: boolean, isTop: boolean}) :?string => {
  if (obj.isTop) {
    return '置顶';
  } else if (obj.isGood) {
    return '精华';
  } else if (tagsMap[obj.tab]) {
    return tagsMap[obj.tab];
  }
  
  return null;
}

/**************** http请求 *****************/

type GetResObj = {success: string, data: any[] | any};
type ResHttp = {data: GetResObj};

const httpPrefix: string = 'https://cnodejs.org/api/v1';

export function fetchData(method: string, url: string) {
  const reqURL: string = `${httpPrefix}${url}`;

  return axios({method: method, url: reqURL}).then((res: ResHttp) => {
    let resData: GetResObj = res.data;
    // post方法
    if (method === 'post') {
      return Promise.resolve(resData);
    }
    // get方法
    if (method === 'get') {
      if (resData.success) {
        return Promise.resolve(resData.data);
      } else {
        const ErrMsg: string = 'http请求失败';
        return Promise.reject(ErrMsg);
      }
    }
  }).catch((e: string) => {
    return Promise.reject(e);
  })
}
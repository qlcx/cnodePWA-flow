import { fetchData } from '../../utils'
import qs from 'qs'

const initialState = {
  topicsList: [],           // 话题列表
  tableLoading: false,
}

// actions
const GET_TOPICS_LIST = 'GET_TOPICS_LIST'                     // 获取话题列表
const SET_TABLE_LOADING_STA = 'SET_TABLE_LOADING_STA'         // 设置表格加载状态

// 获得话题列表数据
export const getTopicsList = (params = {}) => {
  let reqParams = ''
  if (Object.keys(params).length) {
    reqParams += `?${qs.stringify(params)}`
  }

  return dispatch => {
    // 加载状态
    dispatch({type: SET_TABLE_LOADING_STA, sta: true})

    // get 列表数据
    return fetchData('get', `/topics${reqParams}`).then(res => {
      return dispatch({
        type: GET_TOPICS_LIST,
        data: res,
      })
    }).catch(e => {
      console.log(e)
    })
  }
}

export default function topicsListReducer(state = initialState, action) {
  switch(action.type) {
    case GET_TOPICS_LIST:
      return Object.assign({}, state, {
        topicsList: action.data,
        tableLoading: false,
      })
    case SET_TABLE_LOADING_STA:
      return Object.assign({}, state, {
        tableLoading: action.sta,
      })
    
    default:
      return state
  }
}
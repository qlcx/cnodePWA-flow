import fetchData from '../../utils/fetchData'

const initialState = {
  topicsList: []
}

// actions
const GET_TOPICS_LIST = 'GET_TOPICS_LIST'     // 获取话题列表

// 获得话题列表数据
export const getTopicsList = (params = {}) => {
  let formParams = ''
  if (params) {
    let cnt = 0
    for (let key in params) {
      if (cnt) formParams += `?${key}=${params[key]}`
      formParams += `&${key}=${params[key]}`

      cnt++
    }
  }

  return dispatch => {
    return fetchData.get(`/topics${formParams}`).then(res => {
      return dispatch({
        type: GET_TOPICS_LIST,
        data: res
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
        topicsList: action.data
      })
    
    default:
      return state
  }
}
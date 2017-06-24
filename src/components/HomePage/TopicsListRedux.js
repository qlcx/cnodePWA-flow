import fetchData from '../../utils/fetchData'

const initialState = {
  topicsList: []
}

// actions
const GET_TOPICS_LIST = 'GET_TOPICS_LIST'     // 获取话题列表

// 获得话题列表数据
export const getTopicsList = (...params) => {
  return dispatch => {
    return fetchData.get('/topics').then(res => {
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
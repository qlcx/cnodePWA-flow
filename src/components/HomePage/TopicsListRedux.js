const initialState = {
  topicsList: []
}

// actions
const GET_TOPICS_LIST = 'GET_TOPICS_LIST'     // 获取话题列表

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
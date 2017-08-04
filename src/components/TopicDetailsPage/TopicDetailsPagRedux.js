import { fetchData } from '../../utils'

const initialState = {
  // 话题详情
  topicDetails: {},

  // loading状态
  fetchLoading: false,
}

// actions
const GET_TOPIC_DETAILS = 'GET_TOPIC_DETAILS'                               // 获取话题详情信息
const SET_TOPICDETAILS_LOADING_STA = 'SET_TOPICDETAILS_LOADING_STA'         // 设置话题加载状态

// 获取话题详情信息
export const getTopicDetails = topicID => {
  return dispatch => {
    dispatch({type: SET_TOPICDETAILS_LOADING_STA, sta: true})
    fetchData('get', `/topic/${topicID}`).then(res => {
      dispatch({
        type: GET_TOPIC_DETAILS,
        topicDetails: res,
      })
    }).catch(e => {
      console.log(e)
    })
  }
}

export default function topicDetailsPageReducer(state = initialState, action) {
  switch(action.type) {
    case GET_TOPIC_DETAILS:
      return Object.assign({}, state, {
        topicDetails: action.topicDetails,
        fetchLoading: false,
      })
    case SET_TOPICDETAILS_LOADING_STA:
      return Object.assign({}, state, {
        fetchLoading: action.sta,
      })

    default:
      return state
  }
}
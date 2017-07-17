import fetchData from '../../utils/fetchData'

const initialState = {
  // 话题详情
  topicDetails: {},

  // loading状态
  fetchLoading: false,
}

// actions
const GET_TOPIC_DETAILS = 'GET_TOPIC_DETAILS'         // 获取话题详情信息

// 获取话题详情信息
export const getTopicDetails = topicID => {
  return dispatch => {
    fetchData.get(`/topic/${topicID}`).then(res => {
      dispatch({
        type: GET_TOPIC_DETAILS,
        topicDetails: res.data
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
        topicDetails: action.topicDetails
      })

    default:
      return state
  }
}
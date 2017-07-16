import fetchData from '../../utils/fetchData'

const initialState = {
  // 用户登录信息
  userInfoList: {},
  // 用户是否登录
  isUserLogin: false,

  // modal状态
  modalVisible: false,
}

// actions
const SET_USER_MODAL_STA = 'SET_USER_MODAL_STA'         // 设置用户modal状态
const GET_USER_LOGIN_STA = 'GET_USER_LOGIN_STA'         // 获取用户登录状态
const GET_USER_INFO_LIST = 'GET_USER_INFO_LIST'         // 获取用户信息列表

// 获得用户登录状态
export const getUserLoginSta = accessToken => {
  return dispatch => {
    fetchData.post(`/accesstoken?accesstoken=${accessToken}`).then(res => {
      if (res.success) {
        // 登录成功
        return dispatch({
          type: GET_USER_LOGIN_STA,
          modalVisible: false,
          isUserLogin: true,
        })
      }
    }).catch(e => {
      console.log(e)
    })
  }
}

// 设置modal状态
export const setUserModalSta = sta => {
  return {
    type: SET_USER_MODAL_STA,
    modalVisible: sta,
  }
}

export default function userPageReducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER_LOGIN_STA:
      return Object.assign({}, state, {
        modalVisible: action.modalVisible,
        isUserLogin: action.isUserLogin,
      })
    case SET_USER_MODAL_STA:
      return Object.assign({}, state, {
        modalVisible: action.modalVisible
      })

    default:
      return state
  }
}
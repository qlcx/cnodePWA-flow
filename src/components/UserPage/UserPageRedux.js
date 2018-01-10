import { fetchData } from '../../utils';

const initialState = {
  // 用户登录信息
  userInfoList: {},
  // 用户是否登录
  // 是否切换到扫码页
  isSwitchQRReader: false,

  // modal状态
  modalVisible: false,
};

// actions
const SET_USER_MODAL_STA = 'SET_USER_MODAL_STA';         // 设置用户modal状态
const GET_USER_LOGIN_STA = 'GET_USER_LOGIN_STA';        // 获取用户登录状态
const SWITCH_TO_QR_READER = 'SWITCH_TO_QR_READER';       // 切换到扫码页

// 获得用户登录状态
export const getUserLoginSta = accessToken => {
  return dispatch => {
    fetchData('post', `/accesstoken?accesstoken=${accessToken}`).then(res => {
      if (res.success) {
        // 登录成功
        location.replace('/');
        localStorage.setItem('accessToken', accessToken);
        return dispatch({
          type: GET_USER_LOGIN_STA,
          modalVisible: false,
          isSwitchQRReader: false,
        });
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
  };
}

export const switchToQRReader = sta => {
  return {
    type: SWITCH_TO_QR_READER,
    isSwitchQRReader: sta
  };
}

export default function userPageReducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER_LOGIN_STA:
      return Object.assign({}, state, {
        modalVisible: action.modalVisible,
        isSwitchQRReader: action.isSwitchQRReader,
      });
    case SET_USER_MODAL_STA:
      return Object.assign({}, state, {
        modalVisible: action.modalVisible
      });
    case SWITCH_TO_QR_READER:
      return Object.assign({}, state, {
        isSwitchQRReader: action.isSwitchQRReader
      });

    default:
      return state;
  }
}
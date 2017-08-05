// @flow
import { fetchData } from '../../utils'

type State = {
  +userInfo: any,
  +fetchLoading: boolean
}

const initialState: State = {
  // 用户信息
  userInfo: {},
  // loading状态
  fetchLoading: false,
}

// actions
const GET_USER_INFO = 'GET_USER_INFO'                          // 获取用户信息
const SET_USERINFO_LOADING_STA = 'SET_USERINFO_LOADING_STA'    // 设置加载状态

type GetUserInfoAction = {| type: string, userInfo: any |}
type SetLoadingAction = {| type: string, sta: boolean |}
type Action = GetUserInfoAction | SetLoadingAction

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;

// 获取用户信息
export const getUserInfo = (userName: string) => {
  return (dispatch: Dispatch) => {
    dispatch({type: SET_USERINFO_LOADING_STA, sta: true})
    fetchData('get', `/user/${userName}`).then(res => {
      dispatch({
        type: GET_USER_INFO,
        userInfo: res,
      })
    }).catch(e => {
      console.log(e)
    })
  }
}

export default function userInfoPageReducer(state: State = initialState, action: Action): State {
  switch(action.type) {
    case GET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.userInfo && action.userInfo,
        fetchLoading: false,
      })
    case SET_USERINFO_LOADING_STA:
      return Object.assign({}, state, {
        fetchLoading: action.sta && action.sta
      })
    default:
      return state
  }
}
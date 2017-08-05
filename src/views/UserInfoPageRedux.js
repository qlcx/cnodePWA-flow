import { combineReducers } from 'redux'

import userInfoPageReducer, {
  getUserInfo
} from '../components/UserInfoPage/UserInfoPageRedux'

export default combineReducers({
  userInfoPageReducer
})

export const actions = {
  getUserInfo,
}
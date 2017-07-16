import { combineReducers } from 'redux'

import userPageReducer, {
  setUserModalSta,
  getUserLoginSta,
} from '../components/UserPage/UserPageRedux'

export default combineReducers({
  userPageReducer
})

export const actions = {
  getUserLoginSta,
  setUserModalSta,
}
import { combineReducers } from 'redux'

import topicsListReducer, { getTopicsList } from '../components/HomePage/TopicsListRedux'

export default combineReducers({
  topicsListReducer
})

export const actions = {
  getTopicsList
}

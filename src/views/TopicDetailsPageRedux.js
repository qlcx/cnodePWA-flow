import { combineReducers } from 'redux'

import topicDetailsPageReducer, {
  getTopicDetails
} from '../components/TopicDetailsPage/TopicDetailsPageRedux'

export default combineReducers({
  topicDetailsPageReducer
})

export const actions = {
  getTopicDetails,
}
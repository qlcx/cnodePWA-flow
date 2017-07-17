import { combineReducers } from 'redux'

import topicDetailsPageReducer, {
  getTopicDetails
} from '../components/TopicDetailsPage/TopicDetailsPagRedux'

export default combineReducers({
  topicDetailsPageReducer
})

export const actions = {
  getTopicDetails,
}
import { combineReducers } from 'redux'
import {
  CREATE_POST,
  UPDATE_POST,
  REMOVE_POST
} from '../actions/post'

function posts (state = [], action) {
  switch (action.type) {
    case CREATE_POST:
      return [
        ...state,
        {
          title: action.title,
          tags: action.tags
        }
      ]
    case UPDATE_POST:
      return state.map((post, index) => {
        if (index === action.index) {
          return Object.assign({}, post, {
            title: action.title,
            tags: action.tags
          })
        }
        return post
      })
    case REMOVE_POST:
      return []
    default:
      return state
  }
}

const postModel = combineReducers({
  posts
})

export default postModel

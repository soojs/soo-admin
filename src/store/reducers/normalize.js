import merge from 'lodash/merge'
import * as ActionTypes from '../actions'

const READ_ACTION = 'read'
const SAVE_ACTION = 'save'
const UPDATE_ACTION = 'update'
const REMOVE_ACTION = 'remove'

export const normalizePosts = () => {
  const updateEntity = (state = {}, action) => {
    switch (action.type) {
      case READ_ACTION:
        return {
          ...state,
          isLoading: action.status
        }
      case SAVE_ACTION:
        return {
          ...state,
          isSaveing: action.status
        }
      case UPDATE_ACTION:
        return {
          ...state,
          isUpdateing: action.status
        }
      case REMOVE_ACTION:
        return {
          ...state,
          isRemoveing: action.status
        }
      default:
        return state
    }
  }
  const wrapAndUpdateEntity = (state, action) => {
    const newState = updateEntity(state, action)
    return newState.id === undefined ? { 0: newState } : { [newState.id]: newState }
  }
  return (state = {}, action) => {
    let newState = action.entities && action.entities.posts
      ? merge({}, state, action.entities.posts)
      : state
    // 如果`ekey`属性存在，则说明是针对单实体对象的操作
    let entity = action.ekey ? newState[action.ekey] : null
    switch (action.type) {
      // read entity
      case ActionTypes.POST_INFO_REQUEST:
        return Object.assign({}, newState, wrapAndUpdateEntity(entity, { type: READ_ACTION, status: true }))
      case ActionTypes.POST_INFO_SUCCESS:
      case ActionTypes.POST_INFO_FAILURE:
        return Object.assign({}, newState, wrapAndUpdateEntity(entity, { type: READ_ACTION, status: false }))
      // create or update entity
      case ActionTypes.POST_SAVE_REQUEST:
        return Object.assign({}, newState, wrapAndUpdateEntity(entity, { type: SAVE_ACTION, status: true }))
      case ActionTypes.POST_SAVE_SUCCESS:
      case ActionTypes.POST_SAVE_FAILURE:
        return Object.assign({}, newState, wrapAndUpdateEntity(entity, { type: SAVE_ACTION, status: false }))
      // update entity
      case ActionTypes.POST_PUBLISH_REQUEST:
        return Object.assign({}, newState, wrapAndUpdateEntity(entity, { type: UPDATE_ACTION, status: true }))
      case ActionTypes.POST_PUBLISH_SUCCESS:
      case ActionTypes.POST_PUBLISH_FAILURE:
        return Object.assign({}, newState, wrapAndUpdateEntity(entity, { type: UPDATE_ACTION, status: false }))
      // remove entity
      case ActionTypes.POST_REMOVE_REQUEST:
        return Object.assign({}, newState, wrapAndUpdateEntity(entity, { type: REMOVE_ACTION, status: true }))
      case ActionTypes.POST_REMOVE_SUCCESS:
      case ActionTypes.POST_REMOVE_FAILURE:
        return Object.assign({}, newState, wrapAndUpdateEntity(entity, { type: REMOVE_ACTION, status: false }))
      default:
        return newState
    }
  }
}
export const normalizeUsers = () => {
  return (state = {}, action) => {
    if (action.entities && action.entities.users) {
      return merge({}, state, action.entities.users)
    }
    return state
  }
}
const normalize = () => {
  return (state = {}, action) => {
    // switch (action.type) {
    //   case requestType:
    //   case successType:
    //   case failureType:
    //     return Object.assign({}, state, updatePagination(state, action))
    //   default:
    //     return state
    // }
  }
}

export default normalize

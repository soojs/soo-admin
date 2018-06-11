import { combineReducers } from 'redux'

import * as ActionTypes from '../actions'
import paginate from './paginate'
import { normalizePosts, normalizeUsers } from './normalize'

// 登录用户
const initLoginUser = {
  uid: 0,
  username: '',
  nickname: '',
  isLogining: false
}
const loginUser = (state = initLoginUser, action) => {
  if (action.type === ActionTypes.USER_LOGIN_REQUEST) {
    return {
      ...state,
      isLogining: true
    }
  } else if (action.type === ActionTypes.USER_LOGIN_SUCCESS) {
    if (action.loginUser) {
      return {
        ...state,
        ...action.loginUser,
        isLogining: false
      }
    }
    return state
  } else if (action.type === ActionTypes.USER_LOGIN_FAILURE) {
    return {
      ...state,
      isLogining: false
    }
  } else {
    return state
  }
}

// 实体对象列表
// const entities = combineReducers({
//   users: normalize({
//     types: {
//       read: [
//         ActionTypes.USER_INFO_REQUEST,
//         ActionTypes.USER_INFO_SUCCESS,
//         ActionTypes.USER_INFO_FAILURE
//       ],
//       save: [
//         ActionTypes.USER_SAVE_REQUEST,
//         ActionTypes.USER_SAVE_SUCCESS,
//         ActionTypes.USER_SAVE_FAILURE
//       ],
//       remove: [
//         ActionTypes.USER_REMOVE_REQUEST,
//         ActionTypes.USER_REMOVE_SUCCESS,
//         ActionTypes.USER_REMOVE_FAILURE
//       ]
//     }
//   }),
//   posts: normalize({
//     types: {
//       read: [
//         ActionTypes.POST_INFO_REQUEST,
//         ActionTypes.POST_INFO_SUCCESS,
//         ActionTypes.POST_INFO_FAILURE
//       ],
//       save: [
//         ActionTypes.POST_SAVE_REQUEST,
//         ActionTypes.POST_SAVE_SUCCESS,
//         ActionTypes.POST_SAVE_FAILURE
//       ],
//       remove: [
//         ActionTypes.POST_REMOVE_REQUEST,
//         ActionTypes.POST_REMOVE_SUCCESS,
//         ActionTypes.POST_REMOVE_FAILURE
//       ]
//     }
//   })
// })
// const initEntities = {
//   users: {},
//   posts: {}
// }
// const entities = (state = initEntities, action) => {
//   if (action.entities) {
//     return merge({}, state, action.entities)
//   }
//   return state
// }
const entities = combineReducers({
  posts: normalizePosts(),
  users: normalizeUsers()
})

// 分页对象
const pagination = combineReducers({
  posts: paginate({
    types: [
      ActionTypes.POST_PAGE_REQUEST,
      ActionTypes.POST_PAGE_SUCCESS,
      ActionTypes.POST_PAGE_FAILURE
    ]
  }),
  users: paginate({
    types: [
      ActionTypes.USER_PAGE_REQUEST,
      ActionTypes.USER_PAGE_SUCCESS,
      ActionTypes.USER_PAGE_FAILURE
    ]
  })
})

// 全局错误信息
const errorMessage = (state = null, action) => {
  if (action.type === ActionTypes.RESET_GLOBAL_ERROR) {
    return action.error
  }
  return state
}

const rootReducer = combineReducers({
  loginUser,
  entities,
  pagination,
  errorMessage
})

export default rootReducer

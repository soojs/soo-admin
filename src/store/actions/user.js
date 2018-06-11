import { CALL_API } from '../../middleware/api'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'

const doLogin = args => ({
  [CALL_API]: {
    types: [ USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE ],
    method: 'POST',
    url: '/api/v1/user/login',
    data: args,
    transformResponse: (data = {}) => {
      data.uid = data.id
      return { loginUser: data }
    }
  }
})

export const login = args => (dispatch, getState) => {
  console.log(getState())
  return dispatch(doLogin(args))
}

export const USER_PAGE_REQUEST = 'USER_PAGE_REQUEST'
export const USER_PAGE_SUCCESS = 'USER_PAGE_SUCCESS'
export const USER_PAGE_FAILURE = 'USER_PAGE_FAILURE'

const fetchUserPage = pageArgs => ({
  [CALL_API]: {
    types: [ USER_PAGE_REQUEST, USER_PAGE_SUCCESS, USER_PAGE_FAILURE ],
    endpoint: `/api/v1/user`,
    schema: null
  }
})

export const loadUserPage = pageArgs => (dispatch, getState) => {
  console.log(getState())
  return dispatch(fetchUserPage(pageArgs))
}

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST'
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS'
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE'

const fetchUserInfo = postId => ({
  'CALL_API': {
    types: [ USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAILURE ],
    endpoint: `/api/v1/post/${postId}`,
    schema: null
  }
})

export const loadUserInfo = postId => (dispatch, getState) => {
  console.log(getState())
  return dispatch(fetchUserInfo(postId))
}

export const USER_SAVE_REQUEST = 'USER_SAVE_REQUEST'
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS'
export const USER_SAVE_FAILURE = 'USER_SAVE_FAILURE'

export const USER_REMOVE_REQUEST = 'USER_REMOVE_REQUEST'
export const USER_REMOVE_SUCCESS = 'USER_REMOVE_SUCCESS'
export const USER_REMOVE_FAILURE = 'USER_REMOVE_FAILURE'

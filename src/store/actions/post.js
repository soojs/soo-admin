import { normalize } from 'normalizr'

import { Schemas } from '../schemas'
import { CALL_API } from '../../middleware/api'

export const POST_PAGE_REQUEST = 'POST_PAGE_REQUEST'
export const POST_PAGE_SUCCESS = 'POST_PAGE_SUCCESS'
export const POST_PAGE_FAILURE = 'POST_PAGE_FAILURE'

const fetchPostPage = args => ({
  [CALL_API]: {
    types: [ POST_PAGE_REQUEST, POST_PAGE_SUCCESS, POST_PAGE_FAILURE ],
    url: '/api/v1/post',
    data: args,
    transformResponse: (data = {}) => {
      const { count, rows } = data
      return Object.assign({ count }, normalize(rows, Schemas.POST_LIST))
    }
  }
})

export const loadPostPage = pageArgs => (dispatch, getState) => {
  console.log(getState())
  return dispatch(fetchPostPage(pageArgs))
}

export const POST_INFO_REQUEST = 'POST_INFO_REQUEST'
export const POST_INFO_SUCCESS = 'POST_INFO_SUCCESS'
export const POST_INFO_FAILURE = 'POST_INFO_FAILURE'

const fetchPostInfo = (args = {}) => ({
  [CALL_API]: {
    types: [ POST_INFO_REQUEST, POST_INFO_SUCCESS, POST_INFO_FAILURE ],
    url: `/api/v1/post/${args.id}?type=0`,
    transformResponse: (data = {}) => {
      // 如果没有返回content，从contents列表中解析出content
      if (!data.content && data.contents) {
        data.contents.forEach((item) => {
          // markdown-0, html-1
          if (item.type === 0) {
            data.content = item.content
          }
        })
      }
      return Object.assign({}, normalize(data, Schemas.POST))
    }
  }
})

export const loadPostInfo = args => (dispatch, getState) => {
  return dispatch(fetchPostInfo(args))
}

export const POST_SAVE_REQUEST = 'POST_SAVE_REQUEST'
export const POST_SAVE_SUCCESS = 'POST_SAVE_SUCCESS'
export const POST_SAVE_FAILURE = 'POST_SAVE_FAILURE'

const savePost = (args = {}) => ({
  key: args.id,
  [CALL_API]: {
    types: [ POST_SAVE_REQUEST, POST_SAVE_SUCCESS, POST_SAVE_FAILURE ],
    method: args.id > 0 ? 'PUT' : 'POST',
    url: args.id > 0 ? `/api/v1/post/${args.id}` : '/api/v1/post',
    data: args,
    transformResponse: (data = {}) => {
      // 如果没有返回content，从contents列表中解析出content
      if (!data.content && data.contents) {
        data.contents.forEach((item) => {
          // markdown-0, html-1
          if (item.type === 0) {
            data.content = item.content
          }
        })
      }
      return Object.assign({}, normalize(data, Schemas.POST))
    }
  }
})

export const createOrUpdatePost = args => (dispatch, state) => {
  return dispatch(savePost(args))
}

export const POST_REMOVE_REQUEST = 'POST_REMOVE_REQUEST'
export const POST_REMOVE_SUCCESS = 'POST_REMOVE_SUCCESS'
export const POST_REMOVE_FAILURE = 'POST_REMOVE_FAILURE'

import axios from 'axios'
import { RESET_GLOBAL_ERROR } from '../store/actions'

// global config for ajax
axios.defaults.timeout = 30000
axios.defaults.headers['Accept'] = 'application/json'
axios.defaults.headers['content-type'] = 'application/json; charset=utf-8'

/**
 * 调用后台接口
 * @param {object} params 接口参数，见：https://github.com/axios/axios
 */
const fetch = ({ url, method = 'GET', data }) => {
  const options = {
    url,
    method,
    data
  }
  return axios(options)
    .then((res) => {
      return res.data || {}
    })
    .catch((err) => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.warn(err.response.data)
        console.warn(err.response.status)
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(err.request)
      } else {
        console.error(err.message)
      }
      // 需要返回新的Promise给上层处理
      return Promise.reject(err)
    })
}
/**
 * 统一的`Ajax action`配置参数key
 */
export const CALL_API = 'Call Api'
/**
 * A standard middleware for async action,
 * see [Middleware](https://redux.js.org/advanced/middleware)
 */
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  const { types } = callAPI
  const [ requestType, successType, failureType ] = types

  const actionWith = preAction => {
    let finalAction
    if (preAction.type === successType) {
      const transformer = action[CALL_API].transformResponse || (() => data)
      finalAction = Object.assign({
        type: successType
      }, action, transformer(preAction.data))
    } else {
      finalAction = Object.assign({}, action, preAction)
    }
    delete finalAction[CALL_API]
    console.log(finalAction)
    return finalAction
  }

  next(actionWith({ type: requestType }))

  const { url, method, data } = callAPI
  return fetch({ url, method, data })
    .then((response) => {
      const { code } = response
      if (code !== 0) {
        // 正常的业务异常
        next(actionWith({
          code,
          type: failureType
        }))
      } else {
        // 业务处理成功
        next(actionWith({
          ...response,
          type: successType
        }))
      }
    })
    .catch((err) => {
      if (err.response) {
        // 后台响应失败（httpcode不为2xx）
        next(actionWith({
          error: { status: err.response.status },
          type: RESET_GLOBAL_ERROR
        }))
      } else if (err.request) {
        // 后台无响应，可能是网络连接失败
        next(actionWith({
          error: { status: 0 },
          type: RESET_GLOBAL_ERROR
        }))
      } else {
        // 未知失败，可能是上层js处理错误
        next(actionWith({
          error: err.message || 'Somthing bad happened',
          type: RESET_GLOBAL_ERROR
        }))
      }
    })
}

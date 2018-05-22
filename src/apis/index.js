import axios from 'axios'

import PostApis from './module/post'
import UserApis from './module/user'

// global config for ajax
axios.defaults.timeout = 30000
axios.defaults.headers['Accept'] = 'application/json'
axios.defaults.headers['content-type'] = 'application/json; charset=utf-8'

/**
 * 当前要显示loading的请求数
 */
let loadingCount = 0
/**
 * 显示全局Loading
 * @param {object} args 要显示的LoadingBar的参数
 */
const showLoading = (args) => {
  loadingCount += 1
  if (loadingCount > 0 && global.$LoadingBar) {
    global.$LoadingBar({
      loading: true,
      message: args.loadingText
    })
  }
}
/**
 * 隐藏全局Loading
 * @param {object} args 要隐藏的LoadingBar的参数
 */
const hideLoading = (args) => {
  loadingCount -= 1
  if (loadingCount <= 0 && global.$LoadingBar) {
    global.$LoadingBar({
      loading: false
    })
  }
}
/**
 * 发起后台请求
 * @param {object} args 给服务端的请求参数
 * @param {object} config 本次请求的前端配置
 */
const fetch = (args = {}, config = {}) => {
  if (config.showLoading) {
    showLoading(config)
  }
  /**
   * see https://github.com/axios/axios
   * ```
   * axios({
   *   method: 'post',
   *   url: '/user/12345',
   *   data: {
   *     firstName: 'Fred',
   *     lastName: 'Flintstone'
   *   }
   * })
   * ```
   */
  return axios(args)
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
    })
    .finally(() => {
      hideLoading()
    })
}
/**
 * 替换URL中的占位符
 * @param {string} url 定义的URL
 * @param {object} params 参数表
 */
const _replaceArgs = (url, params = {}) => {
  return url.replace(/(:[a-z]+)/g, ($0) => {
    const key = $0.substr(1)
    return params[key] === undefined ? $0 : params[key]
  })
}
/**
 * 注册API列表
 * @param {object} apiMap API列表
 */
const resigstApi = (apiMap) => {
  const objects = {}
  Object.keys(apiMap).forEach((key) => {
    objects[key] = (params, config) => {
      const value = apiMap[key]
      const args = {
        method: 'GET'
      }
      if (typeof value === 'string') {
        args.url = `/api/v1/${_replaceArgs(value, params)}`
      } else if (typeof value === 'object') {
        args.url = `/api/v1/${_replaceArgs(value.url, params)}`
        args.data = params
        args.method = value.method
      } else {
        throw new Error(`Incorrect api config: ${key}`)
      }

      return fetch(args, config)
    }
  })

  return objects
}

export const PostService = resigstApi(PostApis)
export const UserService = resigstApi(UserApis)

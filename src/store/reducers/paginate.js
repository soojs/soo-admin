import union from 'lodash/union'

/**
 * 默认分页状态
 * ```
 * isFetching  - [boolean] 是否加载中
 * total       - [number] 数据总数
 * index       - [number] 当前页索引
 * ids         - [array] 对象ID列表
 * ```
 */
const defaultState = {
  isFetching: false,
  total: 0,
  index: 1,
  ids: []
}

const paginate = ({ types }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings')
  }

  const [ requestType, successType, failureType ] = types
  const updatePagination = (state, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType:
        return {
          ...state,
          isFetching: false,
          ids: union(state.ids, action.result),
          total: action.count
        }
      case failureType:
        return {
          ...state,
          isFetching: false
        }
      default:
        return state
    }
  }

  return (state = defaultState, action) => {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        return Object.assign({}, state, updatePagination(state, action))
      default:
        return state
    }
  }
}

export default paginate

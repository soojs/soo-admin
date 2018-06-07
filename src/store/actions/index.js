export * from './post'
export * from './user'

export const ENTITY_INFO_REQUEST = 'ENTITY_INFO_REQUEST'
export const ENTITY_INFO_SUCCESS = 'ENTITY_INFO_SUCCESS'
export const ENTITY_INFO_FAILURE = 'ENTITY_INFO_FAILURE'

export const ENTITY_SAVE_REQUEST = 'ENTITY_SAVE_REQUEST'
export const ENTITY_SAVE_SUCCESS = 'ENTITY_SAVE_SUCCESS'
export const ENTITY_SAVE_FAILURE = 'ENTITY_SAVE_FAILURE'

export const ENTITY_REMOVE_REQUEST = 'ENTITY_REMOVE_REQUEST'
export const ENTITY_REMOVE_SUCCESS = 'ENTITY_REMOVE_SUCCESS'
export const ENTITY_REMOVE_FAILURE = 'ENTITY_REMOVE_FAILURE'

export const RESET_GLOBAL_ERROR = 'RESET_GLOBAL_ERROR'
export const resetGlobalError = () => ({
  type: RESET_GLOBAL_ERROR
})
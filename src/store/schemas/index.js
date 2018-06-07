import { schema } from 'normalizr'

const postSchema = new schema.Entity('posts', {}, {
  idAttribute: post => post.id
})

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.id
})

export const Schemas = {
  POST: postSchema,
  POST_LIST: [postSchema],
  USER: userSchema,
  USER_LIST: [userSchema]
}

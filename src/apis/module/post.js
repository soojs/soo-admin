export default {
  page: '/post/',
  getById: '/post/:id',
  create: {
    method: 'post',
    url: '/post'
  },
  update: {
    method: 'put',
    url: '/post/:id'
  }
}

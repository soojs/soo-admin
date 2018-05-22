export default {
  page: '/user/',
  getById: '/user/:id',
  create: {
    method: 'user',
    url: '/user'
  },
  update: {
    method: 'put',
    url: '/user/:id'
  }
}

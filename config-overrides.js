const { injectBabelPlugin } = require('react-app-rewired')
// const rewireEslint = require('react-app-rewire-eslint')

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    config = injectBabelPlugin(['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }], config)

    // TODO 这里如果加上`rewireEslint`插件的话，会出现`Configuration for rule "indent" is invalid`
    //      的异常，暂时还不太清楚是什么原因，所以这里就关闭eslint的编译校验，把这个过程直接交给VSCode
    //      的eslint插件来实时做校验
    // config = rewireEslint(config, env)
    return config
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const modifiedProxy = Object.assign({}, proxy, {
        '/api/**': {
          target: 'http://127.0.0.1:8889',
          onProxyRes: (proxyRes, req, res) => {
            proxyRes.headers['X-Powered-By'] = 'Bee Blog'
            proxyRes.headers['Cache-Control'] = 'no-cache'
          }
        }
      })
      const config = configFunction(modifiedProxy, allowedHost)
      return config
    }
  }
}

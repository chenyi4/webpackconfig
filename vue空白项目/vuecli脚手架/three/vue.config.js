const webpack = require('webpack')
module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      '/': {
        // target: 'http://10.111111:8080', //
        // target: 'http://10.12.42.127:8090/', //
        target: 'http://localhost:8082',
        changeOrigin: true,
        pathRewrite: {
            "/login": "/"
        }
      }
    }
   },
  publicPath: './'
}
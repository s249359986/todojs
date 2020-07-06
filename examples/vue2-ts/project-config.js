module.exports = {
  projectName: 'todo',
  dev: {
    // https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '': ''
        }
      }
    },
    mock: true,
    allowedHosts: []
  }
}

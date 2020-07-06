const projectConfig = require('./project-config')
const path = require('path')
const webpackApiMocker = require('mocker-api')
module.exports = {
  lintOnSave: true,
  devServer: {
    overlay: {
      warnings: true,
      errors: true

    },
    allowedHosts: [
      ...projectConfig.dev.allowedHosts
    ],
    before (app) {
      if (projectConfig.dev.mock) {
        webpackApiMocker(app, path.resolve('./mock/index.js'))
      }
    },
    proxy: projectConfig.dev.proxy
  }
}

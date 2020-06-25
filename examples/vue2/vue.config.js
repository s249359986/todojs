const projectConfig = require('./project-config');
const path = require('path');
const webpackApiMocker = require('mocker-api');
module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    allowedHosts: [
      ...projectConfig.dev.allowedHosts,
    ],
    before(app) {
      if (projectConfig.dev.mock) {
        webpackApiMocker(app, path.resolve('./mock/index.js'));
      }
    },
    proxy: projectConfig.dev.proxy,
  }
};

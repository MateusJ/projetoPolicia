// const { injectBabelPlugin } = require('react-app-rewired')

module.exports = function override(config, env) {
    config.target = 'electron-renderer';
    return config;
}
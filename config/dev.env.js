'use strict'
const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   ENV_CONFIG:'"dev"',
//   // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
// })
module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG:'"dev"',
  BASE_API:'"http://127.0.0.1:3000"'
}

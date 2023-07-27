const path = require('path');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.output.filename = 'uibundle.js';

//   if (env === 'production') {
//     config.output.chunkFilename = 'static/js/my-app.[chunkhash].chunk.js';
//   }

  return config;
}
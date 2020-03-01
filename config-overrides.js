/* config-overrides.js */
const webpack = require('webpack');
const env = process.env;
const path = require('path');

// const {
//   override,
//   addWebpackPlugin,
//   addWebpackAlias
// } = require('customize-cra');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // console.log(config);
  // config.plugins.push(
  //   new webpack.DefinePlugin({
  //     PRODUCTION: env.NODE_ENV === 'production',
  //     //   WEB_ROOT: JSON.stringify(webRoot(env.NODE_ENV)),
  //     APP_NAME: JSON.stringify('BlockStack Wallet'),
  //     APP_SESSION_ID: JSON.stringify(appSessionId(env.NODE_ENV)),
  //     APP_PRIVATE_KEY: JSON.stringify(appPrivateKey(env.NODE_ENV)),
  //     APP_CLIENT_ID: JSON.stringify(appId(env.NODE_ENV))
  //   })
  // );

  // config.plugins[3].definitions = {
  //   PRODUCTION: env.NODE_ENV === 'production',
  //   //   WEB_ROOT: JSON.stringify(webRoot(env.NODE_ENV)),
  //   APP_NAME: JSON.stringify('BlockStack Wallet'),
  //   APP_SESSION_ID: JSON.stringify(appSessionId(env.NODE_ENV)),
  //   APP_PRIVATE_KEY: JSON.stringify(appPrivateKey(env.NODE_ENV)),
  //   APP_CLIENT_ID: JSON.stringify(appId(env.NODE_ENV))
  // };
  config.resolve.alias = {
    ['@']: path.resolve(__dirname, 'src/'),
    ['@utils']: path.resolve(__dirname, 'src/utils/'),
    ['@components']: path.resolve(__dirname, 'src/components/'),
    ['@config']: path.resolve(__dirname, 'src/config/'),
    ['@services']: path.resolve(__dirname, 'src/services/'),
    ['@hooks']: path.resolve(__dirname, 'src/hooks/')
  };
  console.log(config);
  // throw 'error';
  return config;
};

// const DefinePlugin = new webpack.DefinePlugin({
//   APP_SESSION_ID: JSON.stringify(appSessionId(env.NODE_ENV)),
//   APP_PRIVATE_KEY: JSON.stringify(appPrivateKey(env.NODE_ENV)),
//   APP_CLIENT_ID: JSON.stringify(appId(env.NODE_ENV))
// });

// module.exports = override(
//   // add an alias for "ag-grid-react" imports
//   addWebpackAlias({
//     ['@']: path.resolve(__dirname, 'src/'),
//     ['@utils']: path.resolve(__dirname, 'src/utils/')
//   }),
//   addWebpackPlugin(DefinePlugin)
// );

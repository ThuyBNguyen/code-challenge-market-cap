/* eslint-disable */
/* prettier-ignore */
const _ = require('lodash');
const withAntdLess = require('next-plugin-antd-less');
const withPlugins = require('next-compose-plugins');

const dotEnvResult = require('dotenv').config();
if (dotEnvResult.error) {
  throw dotEnvResult.error;
}
module.exports = withPlugins([
  [withAntdLess, {
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        math: 'always',
      }
    },
    lessVarsFilePath: './src/styles/ant-design-theme.config.less',
    lessVarsFilePathAppendToEndOfContent: true,
  }]
], {
  env: _.omit(dotEnvResult.parsed, ['NODE_ENV']),
  images: {
    domains: ['example-domain.com'],
  },
  webpack: (config) => {
    return config;
  },
})

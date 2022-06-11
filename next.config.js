/* eslint-disable */
/* prettier-ignore */
const _ = require('lodash');
const withAntdLess = require('next-plugin-antd-less');
const withPlugins = require('next-compose-plugins');

const dotEnvResult = require('dotenv').config();
if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const COIN_RANKING_URL = dotEnvResult.parsed.COIN_RANKING_URL;
dotEnvResult.parsed.COIN_RANKING_URL = '/v2';
const rewrites = async () => {
  return [
    {
      source: dotEnvResult.parsed.COIN_RANKING_URL + '/:path*',
      destination: COIN_RANKING_URL + '/:path*',
    },
  ];
};
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
    // domains: ['minnano-dev.s3.ap-northeast-1.amazonaws.com'],
  },
  webpack: (config) => {
    return config;
  },
  rewrites,
})

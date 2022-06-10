import React from 'react';
import type { AppProps } from 'next/app';
import { wrapper } from 'store';
require('styles/global-style.less');

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);

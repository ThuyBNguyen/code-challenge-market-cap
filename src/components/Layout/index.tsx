import React from 'react';
require('./styles.less');

type LayoutProps = {
  children: JSX.Element;
};
const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="website-name">Your market cap</div>
      </div>
      {children}
    </div>
  );
};

export default Layout;

import React from 'react';

type LayoutProps = {
  children: JSX.Element;
};
const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div>Your market cap</div>
      {children}
    </div>
  );
};

export default Layout;

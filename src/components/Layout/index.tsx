import React from 'react';

type LayoutProps = {
  children: JSX.Element;
  isAuthenticated?: boolean;
};
const Layout: React.FunctionComponent<LayoutProps> = ({ children, isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated && <div>HEADER FOR LOGGED IN USER</div>}
      {!isAuthenticated && <div>HEADER FOR NON LOGGED IN USER</div>}
      {children}
      <div>FOOTER</div>
    </div>
  );
};

export default Layout;

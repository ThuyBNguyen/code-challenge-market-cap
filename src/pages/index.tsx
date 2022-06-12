import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: React.FunctionComponent = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/coins');
  });
  return <div></div>;
};

export default Home;

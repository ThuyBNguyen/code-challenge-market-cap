const Helper = {
  isServerSideRender: (): boolean => typeof window === 'undefined',
};

export default Helper;

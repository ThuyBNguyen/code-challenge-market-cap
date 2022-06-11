const Helper = {
  isServerSideRender: (): boolean => typeof window === 'undefined',
  currencyFormatter: (number: number): string =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number),
};

export default Helper;

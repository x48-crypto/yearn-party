import BigNumber from 'bignumber.js';

export const decimalToHex = nbr => {
  if (nbr) {
    return `0x${nbr.toString(16)}`;
  }
  return null;
};

export const chainNameFromHexId = chainIdAsHex => {
  if (chainIdAsHex === '0x1') {
    return 'mainnet';
  }
  if (chainIdAsHex === '0x3') {
    return 'ropsten';
  }
  if (chainIdAsHex === '0x2a') {
    return 'kovan';
  }
  return '';
};

export const roundFloat = (val, digits) => {
  if (Number.isNaN(val)) {
    return '0.00';
  }
  return parseFloat(val)
    .toFixed(digits)
    .toString();
};

export const balanceTransform = val => {
  if (Number.isNaN(val)) {
    return null;
  }
  const newVal = new BigNumber(val).dividedBy(10 ** 18).toFixed();
  return newVal;
};

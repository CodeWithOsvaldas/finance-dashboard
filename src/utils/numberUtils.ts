import Big from 'big.js';

export const toCents = (amount: number): number => new Big(amount).times(100).toNumber();

import Big from 'big.js';

export const MAX_VALUE = 9999999.99;
export const toCents = (amount: number): number => new Big(amount).times(100).toNumber();

export const convertCurrencyToNumber = (amount: string): number => parseFloat(amount.replace(',', '.'));
export const isAmountWithinRange = (amount: number): boolean => MAX_VALUE * -1 <= amount && amount <= MAX_VALUE;

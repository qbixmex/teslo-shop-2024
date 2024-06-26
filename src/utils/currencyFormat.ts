/**
 * Formats a number as a currency.
 * 
 * @param amount The amount to format.
 * @returns The formatted currency.
 * 
 * @example
 * ```ts
 * currencyFormat(100.25);
 * // output -> $100.25
 * ```
 */
export const currencyFormat = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
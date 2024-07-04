/**
 * Transform a string to a slug format
 * 
 * @param text The text to transform
 * @returns Text in slug format
 * @example
 * ```ts
 * slugFormat('lap top');
 * // output -> lap-top
 * ```
 */
export const slugFormat = (text: string) => {
  return text.trim().toLowerCase().replace(/ /g, '-');
};

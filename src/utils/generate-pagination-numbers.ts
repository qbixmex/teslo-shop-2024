/**
 * Generate pagination numbers
 * 
 * ```javascript
 * // If we are in the first pages
 * // but the total pages are 10.
 * [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 * // If we are in the first 3 pages
 * [ 1, 2, 3, '...', 49, 50 ]
 * // If we are in the last pages
 * [ 1, 2, 3, '...', 48, 49, 50 ]
 * // If we are in the middle pages
 * [ 1, '...', 24, 25, 26, '...', 50 ]
 * // If we are in the first 3 pages
 * [ 1, 2, '...', 48, 49, 50 ]
 * ```
 * @example generatePaginationNumbers(1, 50)
 * @returns pagination numbers array
 */
export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // If total pages is less than 10
  // we show all pages without ... dots.
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If we are in the first 3 pages
  // we show the first 3 pages, the ... dots and the last two pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If we are in the last 3 pages
  // we show the first two pages, the ... dots and the last 3 pages.
  if (currentPage > totalPages - 3) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If we are in the middle pages
  // we show the first page, the ... dots,
  // the previous of actual page,
  // the current page,
  // the next of actual page,
  // the ... dots and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];
};
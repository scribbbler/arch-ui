export interface PaginationLabels {
  /** Accessible label for the nav element. */
  pagination: string;
  /** Accessible label for the "go to first page" button. */
  firstPage: string;
  /** Accessible label for the "go to previous page" button. */
  previousPage: string;
  /** Accessible label for the "go to next page" button. */
  nextPage: string;
  /** Accessible label for the "go to last page" button. */
  lastPage: string;
  /** Returns the accessible label for a numbered page button. */
  goToPage: (page: number) => string;
}

export const DEFAULT_LABELS: PaginationLabels = {
  pagination: 'Pagination',
  firstPage: 'Go to first page',
  previousPage: 'Go to previous page',
  nextPage: 'Go to next page',
  lastPage: 'Go to last page',
  goToPage: (page: number) => `Go to page ${page}`,
};

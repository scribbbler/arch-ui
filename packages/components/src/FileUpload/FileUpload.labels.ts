export interface FileUploadLabels {
  /**
   * Returns the error message shown when files exceed the size limit.
   * @param count — number of oversized files
   * @param limit — human-readable size limit (e.g. "5 MB")
   */
  fileSizeError: (count: number, limit: string) => string;
}

export const DEFAULT_LABELS: FileUploadLabels = {
  fileSizeError: (count: number, limit: string) =>
    `${count} file${count > 1 ? 's' : ''} exceed${count === 1 ? 's' : ''} the ${limit} limit.`,
};

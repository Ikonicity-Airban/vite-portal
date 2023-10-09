export const truncateString = (str: string, length: number) =>
  length > str.length ? str : str.slice(0, length) + " ...";

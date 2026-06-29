export const getLastArrayItem = <T>(array: T[]): T => {
  const lastItem = array[array.length - 1];

  return lastItem;
};

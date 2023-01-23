export const areObjectEqual = (
  firstObject: object,
  secondObjectToCompare: object
) => {
  return JSON.stringify(firstObject) === JSON.stringify(secondObjectToCompare);
};

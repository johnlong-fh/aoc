export const isValid = (
  target: number,
  numbers: number[],
  allowConcat: boolean,
): boolean => {
  if (numbers.length === 1) {
    return numbers[0] === target;
  }

  if (
    isValid(target, [numbers[0] + numbers[1], ...numbers.slice(2)], allowConcat)
  ) {
    return true;
  }

  if (
    isValid(target, [numbers[0] * numbers[1], ...numbers.slice(2)], allowConcat)
  ) {
    return true;
  }

  if (
    allowConcat &&
    isValid(
      target,
      [parseInt(`${numbers[0]}${numbers[1]}`), ...numbers.slice(2)],
      allowConcat,
    )
  ) {
    return true;
  }

  return false;
};

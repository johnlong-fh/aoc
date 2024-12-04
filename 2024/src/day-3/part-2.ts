import { getFileContents } from '../utils';

export const partTwo = async () => {
  const filePath = 'day-three-input.txt';
  const contents = await getFileContents(filePath);

  const regex = /mul\((-?\d+),(-?\d+)\)|don?'?t?/g;
  const matches = Array.from(contents.matchAll(regex));

  let isMultiplicationEnabled = true;
  let sum = 0;

  for (const match of matches) {
    const [fullMatch, num1, num2] = match;

    if (fullMatch === 'do') {
      isMultiplicationEnabled = true;
    } else if (fullMatch === "don't") {
      isMultiplicationEnabled = false;
    } else if (isMultiplicationEnabled && num1 && num2) {
      sum += Number(num1) * Number(num2);
    }
  }

  return sum;
};

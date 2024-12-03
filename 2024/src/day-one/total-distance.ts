import { readFile } from '../utils';

export const totalDistance = async () => {
  const filePath = 'day-one-input.txt';

  const firstColumn: number[] = [];
  const secondColumn: number[] = [];
  const differences: number[] = [];

  const lines = await readFile(filePath);

  lines.forEach((line) => {
    const [col1, col2] = line.trim().split('   ');

    if (col1 && col2) {
      firstColumn.push(Number(col1));
      secondColumn.push(Number(col2));
    }
  });
  firstColumn.sort((a, b) => a - b);
  secondColumn.sort((a, b) => a - b);

  for (let i = 0; i < firstColumn.length; i++) {
    const firstValue = firstColumn[i];
    const secondValue = secondColumn[i];

    if (firstValue && secondValue) {
      const difference =
        firstValue < secondValue
          ? secondValue - firstValue
          : firstValue - secondValue;
      differences.push(difference);
    }
  }
  const sum = differences.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return sum;
};

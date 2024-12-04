import { readFile } from '../utils';

export const partTwo = async () => {
  let xCount = 0;
  const filePath = 'day-four-input.txt';

  const lines = Array.from(await readFile(filePath));

  const numRows = lines.length;
  const numCols = lines[0].length;

  const grid: string[][] = lines.map((line) => line.split(''));

  for (let i = 1; i < numRows - 1; i++) {
    for (let j = 1; j < numCols - 1; j++) {
      if (grid[i][j] === 'A') {
        const topLeft = grid[i - 1][j - 1];
        const topRight = grid[i - 1][j + 1];
        const bottomLeft = grid[i + 1][j - 1];
        const bottomRight = grid[i + 1][j + 1];

        if (
          topLeft === 'M' &&
          topRight === 'S' &&
          bottomLeft === 'M' &&
          bottomRight === 'S'
        ) {
          xCount++;
        } else if (
          topLeft === 'S' &&
          topRight === 'M' &&
          bottomLeft === 'S' &&
          bottomRight === 'M'
        ) {
          xCount++;
        } else if (
          topLeft === 'S' &&
          topRight === 'S' &&
          bottomLeft === 'M' &&
          bottomRight === 'M'
        ) {
          xCount++;
        } else if (
          topLeft === 'M' &&
          topRight === 'M' &&
          bottomLeft === 'S' &&
          bottomRight === 'S'
        ) {
          xCount++;
        }
      }
    }
  }

  return xCount;
};

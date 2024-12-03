import { isSafe, readFile } from '../utils';

export const partOne = async () => {
  const filePath = 'day-two-input.txt';

  const lines = (await readFile(filePath)).map((line) =>
    line.split(' ').map(Number),
  );

  let safeCount = 0;

  lines.forEach((line) => {
    if (isSafe(line)) {
      safeCount++;
    }
  });
  return safeCount;
};

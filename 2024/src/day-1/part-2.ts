import { readFile } from '../utils';

export const partTwo = async () => {
  const filePath = 'day-one-input.txt';

  const firstColumn: number[] = [];
  const secondColumn: number[] = [];
  const occurrenceMap = new Map<number, number>();

  const lines = await readFile(filePath);

  lines.forEach((line) => {
    const [col1, col2] = line.trim().split(/\s+/);

    firstColumn.push(Number(col1));
    secondColumn.push(Number(col2));
  });

  for (const element of firstColumn) {
    occurrenceMap.set(element, 0);
  }
  for (const element of secondColumn) {
    const count = occurrenceMap.get(element);
    if (count !== undefined) {
      occurrenceMap.set(element, count + 1);
    }
  }

  const similarity = Array.from(occurrenceMap.entries()).reduce(
    (acc, [key, value]) => acc + key * value,
    0,
  );
  return similarity;
};

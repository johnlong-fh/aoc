import { readFile } from '../utils';

export const similarity = async () => {
  const filePath = 'day-one-input.txt';

  const firstColumn: number[] = [];
  const secondColumn: number[] = [];
  const occurrenceMap = new Map<number, number>();
  const keys: number[] = [];
  const values: number[] = [];
  const occurrences: number[] = [];

  const lines = await readFile(filePath);

  lines.forEach((line) => {
    const [col1, col2] = line.trim().split('   ');

    if (col1 && col2) {
      firstColumn.push(Number(col1));
      secondColumn.push(Number(col2));
    }
  });

  for (const element of firstColumn) {
    occurrenceMap.set(element, 0);
  }
  for (const element of secondColumn) {
    const count = occurrenceMap.get(element);
    if (typeof count === 'number') {
      occurrenceMap.set(element, count + 1);
    }
  }
  for (let key of occurrenceMap.keys()) {
    keys.push(key);
  }
  for (let value of occurrenceMap.values()) {
    values.push(value);
  }
  for (let i = 0; i < keys.length; i++) {
    occurrences.push(keys[i] * values[i]);
  }
  const similarity = occurrences.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return similarity;
};

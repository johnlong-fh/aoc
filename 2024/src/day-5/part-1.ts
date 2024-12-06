import { getFileContents } from '../utils';

export const partOne = async () => {
  let count = 0;
  const filePath = 'day-five-input.txt';
  const lines = await getFileContents(filePath);

  let pageOrderingRules: Record<number, Set<number>> = {};

  const [edges, queries] = lines.split('\n\n');

  for (const line of edges.split('\n')) {
    const [x, y] = line.split('|').map((num) => Number(num));
    if (!pageOrderingRules[y]) {
      pageOrderingRules[y] = new Set<number>();
    }
    pageOrderingRules[y].add(x);
  }

  for (const line of queries.split('\n')) {
    const vs = line.split(',').map((num) => Number(num));
    let isOrderingValid = true;

    for (let i = 0; i < vs.length; i++) {
      const v = vs[i];
      for (let j = 0; j < vs.length; j++) {
        if (
          i < j &&
          pageOrderingRules[vs[i]] &&
          pageOrderingRules[vs[i]].has(vs[j])
        ) {
          isOrderingValid = false;
        }
      }
    }

    if (isOrderingValid) {
      count += vs[Math.floor(vs.length / 2)];
    }
  }
  return count;
};

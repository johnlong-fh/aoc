import { getFileContents } from '../utils';

export const partTwo = async () => {
  const filePath = 'day-five-input.txt';
  const fileContents = await getFileContents(filePath);

  const [edgesSection, queriesSection] = fileContents.trim().split('\n\n');

  const dependencies: Record<number, Set<number>> = {};
  const reverseDependencies: Record<number, Set<number>> = {};

  for (const line of edgesSection.split('\n')) {
    const [dependent, dependency] = line.split('|').map(Number);
    if (!dependencies[dependency]) {
      dependencies[dependency] = new Set();
    }
    if (!reverseDependencies[dependent]) {
      reverseDependencies[dependent] = new Set();
    }
    dependencies[dependency].add(dependent);
    reverseDependencies[dependent].add(dependency);
  }

  let count = 0;

  for (const query of queriesSection.split('\n')) {
    const queryValues = query.split(',').map(Number);
    let isOrderingValid = true;

    for (let i = 0; i < queryValues.length; i++) {
      for (let j = 0; j < queryValues.length; j++) {
        if (
          i < j &&
          dependencies[queryValues[i]] &&
          dependencies[queryValues[i]].has(queryValues[j])
        ) {
          isOrderingValid = false;
        }
      }
    }

    if (!isOrderingValid) {
      const validOrder: number[] = [];
      const processingQueue: number[] = [];
      const dependencyCount: Record<number, number> = {};

      queryValues.forEach((value) => {
        dependencyCount[value] = dependencies[value]
          ? Array.from(dependencies[value]).filter((dep) =>
              queryValues.includes(dep),
            ).length
          : 0;
        if (dependencyCount[value] === 0) {
          processingQueue.push(value);
        }
      });

      while (processingQueue.length > 0) {
        const current = processingQueue.shift()!;
        validOrder.push(current);

        if (reverseDependencies[current]) {
          reverseDependencies[current].forEach((dependency) => {
            if (queryValues.includes(dependency)) {
              dependencyCount[dependency] -= 1;
              if (dependencyCount[dependency] === 0) {
                processingQueue.push(dependency);
              }
            }
          });
        }
      }

      count += validOrder[Math.floor(validOrder.length / 2)];
    }
  }

  return count;
};

import { isSafe, readFile } from '../utils';

export const sequenceSafeDampened = async () => {
  const filePath = 'day-two-input.txt';

  const lines = (await readFile(filePath)).map((line) =>
    line.split(' ').map(Number),
  );

  let dampened = 0;

  for (const line of lines) {
    let madeSafe = false;

    for (let i = 0; i < line.length; i++) {
      if (isSafe([...line.slice(0, i), ...line.slice(i + 1)])) {
        madeSafe = true;
        break;
      }
    }

    if (isSafe(line) || madeSafe) {
      dampened++;
    }
  }

  return dampened;
};

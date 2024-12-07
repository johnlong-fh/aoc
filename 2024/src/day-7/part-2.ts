import { getFileContents, isValid } from '../utils';

export const partTwo = async () => {
  const filePath = 'day-seven-input.txt';
  const fileContent = await getFileContents(filePath);
  const lines = fileContent.trim().split('\n');

  let result = 0;

  for (const line of lines) {
    const [targetStr, numbersStr] = line.split(':');
    const target = parseInt(targetStr);
    const numbers = numbersStr.trim().split(' ').map(Number);

    if (isValid(target, numbers, true)) {
      result += target;
    }
  }

  return result;
};

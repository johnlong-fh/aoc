import { readFile } from '../utils';

const mulRegex = /mul\(\d+,\d+\)/g;
const numRegex = /\d+/g;

export const partOne = async () => {
  const filePath = 'day-three-input.txt';
  const lines = await readFile(filePath);
  let accumulated = 0;
  lines.forEach((line) => {
    const matches = line.matchAll(mulRegex);
    for (const match of matches) {
      const numMatches = match[0].matchAll(numRegex);
      const nums = Array.from(numMatches).map((value) => Number(value[0]));
      console.log(nums);
      accumulated += nums[0] * nums[1];
    }
  });
  return accumulated;
};

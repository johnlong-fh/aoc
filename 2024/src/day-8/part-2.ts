import { getFileContents } from '../utils';

export const partTwo = async () => {
  const filePath = 'day-eight-input.txt';
  const fileContent = await getFileContents(filePath);
  const gridLines = fileContent.trim().split('\n');

  const numRows = gridLines.length;
  const numCols = gridLines[0].length;
  const characterPositions: Record<string, [number, number][]> = {};

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const char = gridLines[row][col];
      if (char !== '.') {
        if (!characterPositions[char]) {
          characterPositions[char] = [];
        }
        characterPositions[char].push([row, col]);
      }
    }
  }

  const pointsOnLine = new Set<string>();

  for (const positions of Object.values(characterPositions)) {
    const length = positions.length;
    for (let i = 0; i < length - 1; i++) {
      const [row1, col1] = positions[i];
      for (let j = i + 1; j < length; j++) {
        const [row2, col2] = positions[j];

        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            const deltaRow1 = row - row1;
            const deltaRow2 = row - row2;
            const deltaCol1 = col - col1;
            const deltaCol2 = col - col2;

            if (
              deltaRow1 * deltaCol2 === deltaCol1 * deltaRow2 &&
              row >= 0 &&
              row < numRows &&
              col >= 0 &&
              col < numCols
            ) {
              pointsOnLine.add(`${row},${col}`);
            }
          }
        }
      }
    }
  }

  return pointsOnLine.size;
};

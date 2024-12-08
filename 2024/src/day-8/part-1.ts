import { getFileContents } from '../utils';

export const partOne = async () => {
  const filePath = 'day-eight-input.txt';
  const fileContent = await getFileContents(filePath);
  const gridLines = fileContent.trim().split('\n');

  const numRows = gridLines.length;
  const numCols = gridLines[0].length;
  const characterPositions: Record<string, [number, number][]> = {};

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const character = gridLines[row][col];
      if (character !== '.') {
        if (!characterPositions[character]) {
          characterPositions[character] = [];
        }
        characterPositions[character].push([row, col]);
      }
    }
  }

  const validPoints = new Set<string>();

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      for (const positions of Object.values(characterPositions)) {
        for (let i = 0; i < positions.length - 1; i++) {
          const [row1, col1] = positions[i];

          for (let j = i + 1; j < positions.length; j++) {
            const [row2, col2] = positions[j];

            const distance1 = Math.abs(row - row1) + Math.abs(col - col1);
            const distance2 = Math.abs(row - row2) + Math.abs(col - col2);

            const deltaRow1 = row - row1;
            const deltaRow2 = row - row2;
            const deltaCol1 = col - col1;
            const deltaCol2 = col - col2;

            if (
              (distance1 === 2 * distance2 || 2 * distance1 === distance2) &&
              deltaRow1 * deltaCol2 === deltaCol1 * deltaRow2
            ) {
              validPoints.add(`${row},${col}`);
            }
          }
        }
      }
    }
  }

  return validPoints.size;
};

import { getFileContents } from '../utils';

export const partTwo = async () => {
  const filePath = 'day-six-input.txt';
  const fileContent = await getFileContents(filePath);
  const gridLines = fileContent.trim().split('\n');

  const numRows = gridLines.length;
  const numCols = gridLines[0].length;

  let startRow = 0;
  let startCol = 0;
  let loopCount = 0;

  for (let row = 0; row < numRows; row++) {
    const col = gridLines[row].indexOf('^');
    if (col !== -1) {
      startRow = row;
      startCol = col;
      break;
    }
  }

  for (let obstacleRow = 0; obstacleRow < numRows; obstacleRow++) {
    for (let obstacleCol = 0; obstacleCol < numCols; obstacleCol++) {
      let currentRow = startRow;
      let currentCol = startCol;
      let directionIndex = 0;
      const seenStates = new Set<string>();

      while (true) {
        const stateKey = `${currentRow},${currentCol},${directionIndex}`;
        if (seenStates.has(stateKey)) {
          loopCount += 1;
          break;
        }
        seenStates.add(stateKey);

        const directionDeltas = [
          [-1, 0],
          [0, 1],
          [1, 0],
          [0, -1],
        ];
        const [deltaRow, deltaCol] = directionDeltas[directionIndex];
        const nextRow = currentRow + deltaRow;
        const nextCol = currentCol + deltaCol;

        if (
          nextRow < 0 ||
          nextRow >= numRows ||
          nextCol < 0 ||
          nextCol >= numCols
        ) {
          break;
        }

        if (
          gridLines[nextRow][nextCol] === '#' ||
          (nextRow === obstacleRow && nextCol === obstacleCol)
        ) {
          directionIndex = (directionIndex + 1) % 4;
        } else {
          currentRow = nextRow;
          currentCol = nextCol;
        }
      }
    }
  }

  return loopCount;
};

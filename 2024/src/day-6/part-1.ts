import { getFileContents } from '../utils';

export const partOne = async () => {
  const filePath = 'day-six-input.txt';
  const gridLines = (await getFileContents(filePath)).trim().split('\n');

  const numRows = gridLines.length;
  const numCols = gridLines[0].length;
  let startRow = 0;
  let startCol = 0;
  let maxDistinctVisitedPositions = 0;
  const cachedResults = new Map<string, number>();

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (gridLines[r][c] === '^') {
        startRow = r;
        startCol = c;
        break;
      }
    }
  }

  for (let obstacleRow = 0; obstacleRow < numRows; obstacleRow++) {
    for (let obstacleCol = 0; obstacleCol < numCols; obstacleCol++) {
      if (gridLines[obstacleRow][obstacleCol] !== '#') {
        continue;
      }

      const obstacleKey = `${obstacleRow},${obstacleCol}`;
      if (cachedResults.has(obstacleKey)) {
        maxDistinctVisitedPositions = Math.max(
          maxDistinctVisitedPositions,
          cachedResults.get(obstacleKey)!,
        );
        continue;
      }

      let currentRow = startRow;
      let currentCol = startCol;
      let directionIndex = 0;
      const visitedStates = new Set<string>();
      const visitedRowCols = new Set<string>();

      while (true) {
        const stateKey = `${currentRow},${currentCol},${directionIndex}`;
        if (visitedStates.has(stateKey)) {
          break;
        }
        visitedStates.add(stateKey);
        visitedRowCols.add(`${currentRow},${currentCol}`);

        const directionDeltas = [
          [-1, 0],
          [0, 1],
          [1, 0],
          [0, -1],
        ];
        const [dr, dc] = directionDeltas[directionIndex];
        const nextRow = currentRow + dr;
        const nextCol = currentCol + dc;

        if (
          nextRow < 0 ||
          nextRow >= numRows ||
          nextCol < 0 ||
          nextCol >= numCols
        ) {
          cachedResults.set(obstacleKey, visitedRowCols.size);
          maxDistinctVisitedPositions = Math.max(
            maxDistinctVisitedPositions,
            visitedRowCols.size,
          );
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

  return maxDistinctVisitedPositions;
};

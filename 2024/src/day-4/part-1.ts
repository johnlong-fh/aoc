import { readFile } from '../utils';

const xmasRegex = /XMAS/g;

function getRows(lines: string[]): string[][] {
  return lines.map((line) => line.split(''));
}

function getColumns(lines: string[]): string[][] {
  const numRows = lines.length;
  const numCols = lines[0].length;
  const columns: string[][] = [];

  for (let col = 0; col < numCols; col++) {
    const column: string[] = [];
    for (let row = 0; row < numRows; row++) {
      column.push(lines[row][col]);
    }
    columns.push(column);
  }

  return columns;
}

function getTopLeftBottomRightDiagonals(lines: string[]): string[][] {
  const numRows = lines.length;
  const numCols = lines[0].length;
  const diagonals: string[][] = [];

  for (let k = 0; k <= numRows + numCols - 2; k++) {
    const diagonal: string[] = [];
    for (let row = 0; row < numRows; row++) {
      const col = k - row;
      if (col >= 0 && col < numCols) {
        diagonal.push(lines[row][col]);
      }
    }
    diagonals.push(diagonal);
  }

  return diagonals;
}

function getTopRightBottomLeftDiagonals(lines: string[]): string[][] {
  const numRows = lines.length;
  const numCols = lines[0].length;
  const diagonals: string[][] = [];

  for (let k = 0; k <= numRows + numCols - 2; k++) {
    const diagonal: string[] = [];
    for (let row = 0; row < numRows; row++) {
      const col = k - (numRows - 1 - row);
      if (col >= 0 && col < numCols) {
        diagonal.push(lines[row][col]);
      }
    }
    diagonals.push(diagonal);
  }

  return diagonals;
}

export const partOne = async () => {
  let xmasCount = 0;
  const filePath = 'day-four-input.txt';

  const lines = Array.from(await readFile(filePath));

  const rows = getRows(lines);
  const columns = getColumns(lines);
  const diagonalsTLBR = getTopLeftBottomRightDiagonals(lines);
  const diagonalsTRBL = getTopRightBottomLeftDiagonals(lines);

  for (const row of rows) {
    const xmasForwardMatch = Array.from(row.join('').matchAll(xmasRegex));
    const xmasReversMatch = Array.from(
      row.reverse().join('').matchAll(xmasRegex),
    );
    xmasCount += xmasForwardMatch.length + xmasReversMatch.length;
  }
  for (const column of columns) {
    const xmasForwardMatch = Array.from(column.join('').matchAll(xmasRegex));
    const xmasReversMatch = Array.from(
      column.reverse().join('').matchAll(xmasRegex),
    );
    xmasCount += xmasForwardMatch.length + xmasReversMatch.length;
  }
  for (const diagonalTLBR of diagonalsTLBR) {
    const xmasForwardMatch = Array.from(
      diagonalTLBR.join('').matchAll(xmasRegex),
    );
    const xmasReversMatch = Array.from(
      diagonalTLBR.reverse().join('').matchAll(xmasRegex),
    );
    xmasCount += xmasForwardMatch.length + xmasReversMatch.length;
  }
  for (const diagonalTRBL of diagonalsTRBL) {
    const xmasForwardMatch = Array.from(
      diagonalTRBL.join('').matchAll(xmasRegex),
    );
    const xmasReversMatch = Array.from(
      diagonalTRBL.reverse().join('').matchAll(xmasRegex),
    );
    xmasCount += xmasForwardMatch.length + xmasReversMatch.length;
  }

  return xmasCount;
};

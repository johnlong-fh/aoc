import { getFileContents } from '../utils';

export interface FileSegment {
  position: number;
  size: number;
  fileId: number;
}

export interface Space {
  position: number;
  size: number;
}

export const partOne = async () => {
  const filePath = 'inputs/day-nine-input.txt';
  const fileContent = await getFileContents(filePath);
  const data = fileContent.trim();

  const fileSegments: FileSegment[] = [];
  const spaces: Space[] = [];
  let position: number = 0;
  let currentFileId: number = 0;
  const finalArrangement: (number | null)[] = [];

  for (let i = 0; i < data.length; i++) {
    const value: number = parseInt(data[i]);

    if (i % 2 === 0) {
      for (let count = 0; count < value; count++) {
        finalArrangement.push(currentFileId);
        fileSegments.push({ position, size: 1, fileId: currentFileId });
        position++;
      }
      currentFileId++;
    } else {
      spaces.push({ position, size: value });
      for (let count = 0; count < value; count++) {
        finalArrangement.push(null);
        position++;
      }
    }
  }

  for (let i = fileSegments.length - 1; i >= 0; i--) {
    const { position: filePosition, size: fileSize, fileId } = fileSegments[i];

    for (let j = 0; j < spaces.length; j++) {
      const { position: spacePosition, size: spaceSize } = spaces[j];
      if (spacePosition < filePosition && fileSize <= spaceSize) {
        for (let offset = 0; offset < fileSize; offset++) {
          finalArrangement[filePosition + offset] = null;
          finalArrangement[spacePosition + offset] = fileId;
        }
        spaces[j] = {
          position: spacePosition + fileSize,
          size: spaceSize - fileSize,
        };
        break;
      }
    }
  }

  let result: number = 0;
  for (let i = 0; i < finalArrangement.length; i++) {
    const fileId = finalArrangement[i];
    if (fileId) {
      result += i * fileId;
    }
  }

  return result;
};

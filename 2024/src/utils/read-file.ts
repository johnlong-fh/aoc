import fs from 'node:fs';
import { promises } from 'node:fs';

export const readFile = async (filePath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      const lines = data.split('\n');
      resolve(lines);
    });
  });
};

export const getFileContents = async (filePath: string) => {
  try {
    return await promises.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file: ${filePath}`);
    throw error;
  }
};

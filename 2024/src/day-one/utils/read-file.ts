import fs from 'node:fs';

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

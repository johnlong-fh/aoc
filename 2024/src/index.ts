import { promises as fs } from 'fs';

type PartFunction = () => Promise<any>;

interface FunctionMap {
  [key: string]: PartFunction;
}

const formatMemoryUsage = (mem: number) =>
  `${Math.round((mem / 1024 / 1024) * 100) / 100} MB`;

async function loadFunctions(): Promise<FunctionMap> {
  const functionMap: FunctionMap = {};
  const dayRegex = /^day-(\d+)$/;
  const files = await fs.readdir(__dirname);

  for (const file of files) {
    const match = file.match(dayRegex);
    if (match) {
      const dayNumber = match[1];

      try {
        const partOneModule = await import(`./${file}/part-1`);
        functionMap[`day-${dayNumber}-pt-1`] = partOneModule.partOne;
      } catch {
        console.warn(`part-1 not found for day ${dayNumber}`);
      }

      try {
        const partTwoModule = await import(`./${file}/part-2`);
        functionMap[`day-${dayNumber}-pt-2`] = partTwoModule.partTwo;
      } catch {
        console.warn(`part-2 not found for day ${dayNumber}`);
      }
    }
  }
  return functionMap;
}

(async () => {
  const functionMap = await loadFunctions();

  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Please provide a function name as an argument.');
    process.exit(1);
  }

  const functionName = args[0];
  const func = functionMap[functionName];

  if (func) {
    try {
      const startTime = process.hrtime.bigint();

      const result = await func();

      const endTime = process.hrtime.bigint();

      const duration = Number(endTime - startTime) / 1e6;

      const memoryData = process.memoryUsage();

      const memoryUsage = {
        rss: formatMemoryUsage(memoryData.rss),
        heapTotal: formatMemoryUsage(memoryData.heapTotal),
        heapUsed: formatMemoryUsage(memoryData.heapUsed),
        external: formatMemoryUsage(memoryData.external),
      };

      console.log(
        JSON.stringify(
          {
            Result: result,
            ExecutionTime: `${duration.toFixed(2)} ms`,
            ...memoryUsage,
          },
          undefined,
          2,
        ),
      );
    } catch (error) {
      console.error(`Error executing function ${functionName}:`, error);
    }
  } else {
    console.error(`Unknown function: ${functionName}`);
    process.exit(1);
  }
})();

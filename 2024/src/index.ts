import { similarity, totalDistance } from './day-one';
import { sequenceSafe, sequenceSafeDampened } from './day-two';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a function name as an argument.');
  process.exit(1);
}

const functionName = args[0];

switch (functionName) {
  case 'day-one-pt-1':
    totalDistance().then((result) => console.log(result));
    break;
  case 'day-one-pt-2':
    similarity().then((result) => console.log(result));
    break;
  case 'day-two-pt-1':
    sequenceSafe().then((result) => console.log(result));
    break;
  case 'day-two-pt-2':
    sequenceSafeDampened().then((result) => console.log(result));
    break;
  default:
    console.error(`Unknown function: ${functionName}`);
    process.exit(1);
}

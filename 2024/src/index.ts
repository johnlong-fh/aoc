import { partOne as dayOnePartOne, partTwo as dayOnePartTwo } from './day-1';
import { partOne as dayTwoPartOne, partTwo as dayTwoPartTwo } from './day-2';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a function name as an argument.');
  process.exit(1);
}

const functionName = args[0];

switch (functionName) {
  case 'day-one-pt-1':
    dayOnePartOne().then((result) => console.log(result));
    break;
  case 'day-one-pt-2':
    dayOnePartTwo().then((result) => console.log(result));
    break;
  case 'day-two-pt-1':
    dayTwoPartOne().then((result) => console.log(result));
    break;
  case 'day-two-pt-2':
    dayTwoPartTwo().then((result) => console.log(result));
    break;
  default:
    console.error(`Unknown function: ${functionName}`);
    process.exit(1);
}

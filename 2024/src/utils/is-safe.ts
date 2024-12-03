export function isSafe(numbers: number[]) {
  let isSafe = false;
  for (let i = 0; i < numbers.length - 1; i++) {
    if (
      numbers[i] === numbers[i + 1] ||
      numbers[i] > numbers[i + 1] ||
      numbers[i + 1] - numbers[i] > 3
    ) {
      isSafe = false;
      break;
    } else {
      isSafe = true;
    }
  }

  if (!isSafe) {
    for (let i = 0; i < numbers.length - 1; i++) {
      if (
        numbers[i] === numbers[i + 1] ||
        numbers[i] < numbers[i + 1] ||
        numbers[i] - numbers[i + 1] > 3
      ) {
        isSafe = false;
        break;
      } else {
        isSafe = true;
      }
    }
  }
  return isSafe;
}

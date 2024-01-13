const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const sum = (a, b) => (a ?? 0) + b;
const sortNum = (a, b) => a - b;

const solve = (arr, target, checkExistOnly) => {
  const sumToEnd = [];
  sumToEnd[arr.length - 1] = arr[arr.length - 1];
  for (let i = arr.length - 2; i >= 0 ; i--) {
    sumToEnd[i] = sumToEnd[i + 1] + arr[i];
  }

  let result = Number.MAX_SAFE_INTEGER;
  let minUsed = Number.MAX_SAFE_INTEGER;

  const queue = [];
  queue.push([0, 0, 0, 1, arr]);
  while (queue.length) {
    const [i, sum, used, multiply, unused] = queue.pop();

    if (sum === target) {
      if (checkExistOnly) {
        return true;
      }
      if (solve(unused, target, true)) {
        if (used < minUsed) {
          minUsed = used;
          result = multiply;
        }
        else if (used === minUsed) {
          result = Math.min(result, multiply);
        }
      }
      continue;
    }

    if (used > minUsed || i >= arr.length || sum > target || sum + sumToEnd[i] < target) {
      continue;
    }

    const newUnused = [...unused];
    newUnused.splice(newUnused.indexOf(arr[i]), 1);
    queue.push([i + 1, sum + arr[i], used + 1, multiply * arr[i], newUnused]);
    queue.push([i + 1, sum, used, multiply, unused]);
  }

  if (checkExistOnly) {
    return false;
  }

  return result;
}

function main(lines) {
  console.time(DAY);

  const input = lines.flatMap(Number).sort(sortNum).reverse();
  const total = input.reduce(sum);

  const result1 = solve(input, total / 3);
  const result2 = solve(input, total / 4);

  console.log(`${DAY} Part 1`, result1, result1 === 10723906903);
  console.log(`${DAY} Part 2`, result2, result2 === 74850409);

  console.timeEnd(DAY);
}

const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const sum = (a, b) => (a ?? 0) + b;
const sortNum = (a, b) => a - b;

const solve = (input, capacity) => {
  const queue = [{remaining: capacity, used: 0, arr: [...input]}];
  const count = new Array(input.length).fill(0);
  while (queue.length) {
    const q = queue.shift();
    if (q.remaining === 0) {
      count[q.used] = (count[q.used] ?? 0) + 1;
      continue;
    }
    if (q.remaining < 0 || q.arr.length === 0) {
      continue;
    }
    queue.push({ remaining: q.remaining, used: q.used, arr: q.arr.slice(1) });
    queue.push({ remaining: q.remaining - q.arr[0], used: q.used + 1, arr: q.arr.slice(1) });
  }

  return count;
}

function main(lines) {
  console.time(DAY);

  const input = lines.flatMap(Number).sort(sortNum).reverse();

  const result = solve(input, 150);
  const result1 = result.reduce(sum);
  const result2 = result.find(i => i > 0);

  console.log(`${DAY} Part 1`, result1, result1 === 1304);
  console.log(`${DAY} Part 2`, result2, result2 === 18);

  console.timeEnd(DAY);
}

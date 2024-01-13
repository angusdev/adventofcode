const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const sum = (a, b) => (a ?? 0) + b;
const multiply = (a, b) => (a ?? 1) * b;
const sortNum = (a, b) => a - b;

const solve = (lines, part) => {
  let result = 0;

  lines.forEach(line => {
    const m = line.match(/\d+/g).map(Number);
    if (part === 1) {
      const arr = [m[0] * m[1], m[1] * m[2], m[0] * m[2]];
      result += 2 * arr.reduce(sum) + Math.min(...arr);
    }
    else if (part === 2) {
      [a, b] = m.sort(sortNum);
      result += 2 * (a + b) + m.reduce(multiply);
    }
  })

  return result;
}

function main(lines) {
  console.time(DAY);

  const result1 = solve(lines, 1);
  const result2 = solve(lines, 2);

  console.log(`${DAY} Part 1`, result1, result1 === 1606483);
  console.log(`${DAY} Part 2`, result2, result2 === 3842356);

  console.timeEnd(DAY);
}

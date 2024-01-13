const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const solve = (row, col) => {
  let n = 20151125;
  let r = 1, c = 1;
  let height = 1;
  while (r !== row || c !== col) {
    if (r <= 1) {
      r = ++height;
      c = 1;
    }
    else {
      r--;
      c++;
    }
    n = (n * 252533) % 33554393;
  }

  return n;
}

function main(lines) {
  console.time(DAY);

  const [row, col] = lines[0].match(/\d+/g).map(Number);

  const result1 = solve(row, col);

  console.log(`${DAY} Part 1`, result1, result1 === 2650453);

  console.timeEnd(DAY);
}

const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const solve = (line, count) => {
  for (let i = 0 ; i < count ; i++) {
    line = line.match(/(.)\1*/g).map(s => s.length + s[0]).join('');
  }
  return line.length;
}

function main(lines) {
  console.time(DAY);

  const result1 = solve(lines[0], 40);
  const result2 = solve(lines[0], 50);

  console.log(`${DAY} Part 1`, result1, result1 === 252594);
  console.log(`${DAY} Part 2`, result2, result2 === 3579328);

  console.timeEnd(DAY)
}

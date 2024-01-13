const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const sum = (a, b) => (a ?? 0) + b;

function main(lines) {
  console.time(DAY);

  const result1 = lines.map(line => {
    const line2 = line.replace(/\\x[0-9a-f]{2}/g, '.').replace(/\\\\/, '.').replace(/\\./g, '.');
    return line.length - line2.length + 2;
  }).reduce(sum);

  const result2 = lines.map(line => line.match(/["\\]/g).length + 2).reduce(sum);

  console.log(`${DAY} Part 1`, result1, result1 === 1350);
  console.log(`${DAY} Part 2`, result2, result2 === 2085);

  console.timeEnd(DAY);
}

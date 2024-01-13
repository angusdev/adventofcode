const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const solve1 = (line) => {
  return line.match(/\(/g).length - line.match(/\)/g).length;
}

const solve2 = (line) => {
  let floor = 0;
  for (let i = 0 ; i < line.length ; i++) {
    floor += line[i] === '(' ? 1 : -1;
    if (floor === -1) {
      return i + 1;
    }
  }
}

function main(lines) {
  console.time(DAY);

  const result1 = solve1(lines[0]);
  const result2 = solve2(lines[0]);

  console.log(`${DAY} Part 1`, result1, result1 === 138);
  console.log(`${DAY} Part 2`, result2, result2 === 1771);

  console.timeEnd(DAY);
}

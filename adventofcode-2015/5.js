const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const solve1 = (lines) => {
  return lines.reduce((a, line) => {
    const c1 = line.match(/[aeiou]/g)?.length ?? 0;
    const c2 = /(.)\1/.test(line);
    const c3 = /(ab|cd|pq|xy)/.test(line);
    return a + (c1 >= 3 && c2 && !c3 ? 1 : 0);
  }, 0);
}

const solve2 = (lines) => {
  return lines.reduce((a, line) => a + (/(..).*\1/.test(line) && /(.).\1/.test(line) ? 1 : 0), 0);
}

function main(lines) {
  console.time(DAY);

  const result1 = solve1(lines);
  const result2 = solve2(lines);

  console.log(`${DAY} Part 1`, result1, result1 === 258);
  console.log(`${DAY} Part 2`, result2, result2 === 53);

  console.timeEnd(DAY);
}

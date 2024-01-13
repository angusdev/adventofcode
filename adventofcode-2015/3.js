const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const walk = (set, line) => {
  const DIR = { '^': [-1, 0], 'v': [1, 0], '<': [0, -1], '>': [0, 1] };
  let r = 0, c = 0;
  line.forEach(d => set.add((r += DIR[d][0]) + ',' + (c += DIR[d][1])));
}

const solve1 = (line) => {
  const set = new Set();
  set.add('0,0');
  walk(set, line);
  return set.size;
}

const solve2 = (line) => {
  const set = new Set();
  set.add('0,0');
  walk(set, line.filter((v, i) => i % 2 === 0));
  walk(set, line.filter((v, i) => i % 2 === 1));
  return set.size;
}

function main(lines) {
  console.time(DAY);

  const result1 = solve1(lines[0].split(''));
  const result2 = solve2(lines[0].split(''));

  console.log(`${DAY} Part 1`, result1, result1 === 2592);
  console.log(`${DAY} Part 2`, result2, result2 === 2360);

  console.timeEnd(DAY);
}

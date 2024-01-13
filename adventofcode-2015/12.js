const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const sum = (a, b) => (a ?? 0) + b;

const solve = (json, part) => {
  const queue = [JSON.parse(json)];
  let result = 0;
  while (queue.length) {
    const q = queue.shift();
    if (typeof q === 'number') {
      result += Number(q);
    }
    else if (Array.isArray(q)) {
      q.forEach(i => queue.push(i));
    }
    else if (typeof q === 'object') {
      const hasRed = Object.entries(q).some(entry => entry[1] === 'red');
      if (part === 1 || (part === 2 && !hasRed)) {
        Object.entries(q).forEach(entry => queue.push(entry[1]));
      }
    }
  }

  return result;
}

function main(lines) {
  console.time(DAY);

  const result1 = solve(lines[0], 1)
  const result2 = solve(lines[0], 2);
  const result1b = lines[0].match(/\-?\d+/g).map(Number).reduce(sum);

  console.log(`${DAY} Part 1`, result1, result1 === 191164);
  console.log(`${DAY} Part 1 (Alternate)`, result1b, result1b === result1);
  console.log(`${DAY} Part 2`, result2, result2 === 87842);

  console.timeEnd(DAY);
}

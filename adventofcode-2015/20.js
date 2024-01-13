const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const sum = (a, b) => (a ?? 0) + b;
const factors = (n) => { const f = []; for (let i = 1 ; i <= Math.sqrt(n) ; i++) if (n % i === 0) { f.push(i); if (i !== n / i) f.push(n / i); } f.sort((a, b) => a - b); return f; };

function main(lines) {
  console.time(DAY);

  const target = Number(lines[0]);

  let result1 = 0;
  while (factors(++result1).reduce(sum) * 10 < target);

  let result2 = 0;
  while (factors(++result2).filter(n => result2 / n <= 50).reduce(sum) * 11 < target);

  console.log(`${DAY} Part 1`, result1, result1 === 776160);
  console.log(`${DAY} Part 2`, result2, result2 === 786240);

  console.timeEnd(DAY);
}

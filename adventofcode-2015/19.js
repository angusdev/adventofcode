const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const solve1 = (molecule, transform) => {
  const result = new Set();
  transform.forEach(t => {
    const regexp = new RegExp(t.from, 'g');
    while (m = regexp.exec(molecule)) {
      result.add(molecule.slice(0, m.index) + t.to + molecule.slice(m.index + t.from.length));
    }
  });

  return result.size;
}

const solve2 = (target, transform) => {
  let step = 0;
  while (target !== 'e') {
    transform.forEach(t => {
      if (target.indexOf(t.to) >= 0) {
        target = target.replace(t.to, t.from);
        step++;
      }
    })
  }

  return step;
}

function main(lines) {
  console.time(DAY);

  const transform = [];
  lines.forEach(line => {
    if (/=>/.test(line)) {
      const [from, to] = line.match(/\w+/g);
      transform.push({ from, to });
    }
  });

  const result1 = solve1(lines[lines.length - 1], transform);
  const result2 = solve2(lines[lines.length - 1], transform);

  console.log(`${DAY} Part 1`, result1, result1 === 518);
  console.log(`${DAY} Part 2`, result2, result2 === 200);

  console.timeEnd(DAY);
}

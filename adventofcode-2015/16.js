const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const solve1 = (input, auntSue) => {
  return input.find(aunt => aunt.compounds
    .every(c => auntSue[c.match(/\w+/)[0]] === Number(c.match(/\d+/)[0]))).id;
}

const solve2 = (input, auntSue) => {
  return input.find(aunt => aunt.compounds.every(c => {
    const key = c.match(/\w+/)[0];
    const value = Number(c.match(/\d+/)[0]);
    if (key === 'cats' || key === 'trees') {
      return value > auntSue[key];
    }
    else if (key === 'pomeranians' || key === 'goldfish') {
      return value < auntSue[key];
    }
    else {
      return value === auntSue[key];
    }
  })).id;
}

function main(lines) {
  console.time(DAY);

  const auntSue = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1
  };

  const input = lines
    .map(line => ({ id: Number(line.match(/\d+/)[0]), compounds: line.match(/\w+: \d+/g) }));

  const result1 = solve1(input, auntSue);
  const result2 = solve2(input, auntSue);

  console.log(`${DAY} Part 1`, result1, result1 === 213);
  console.log(`${DAY} Part 2`, result2, result2 === 323);

  console.timeEnd(DAY);
}

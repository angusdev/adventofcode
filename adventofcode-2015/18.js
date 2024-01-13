const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const sum = (a, b) => (a ?? 0) + b;
const get = (table, r, c, defaultValue) => (table[r] ?? [])[c] ?? defaultValue;
const set = (table, r, c, value) => { if (!table[r]) { table[r] = []; } table[r][c] = value; };
const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
const walktable = (table, func) => { for (let r = 0 ; r < table.length ; r++) for (let c = 0 ; c < table[r]?.length ?? 0 ; c++) func(r, c, (table[r] ?? [])[c]); }

const getNeighbourCount = (table, r, c) => {
  return neighbors.map(n => get(table, r + n[0], c + n[1]) === '#' ? 1 : 0).reduce(sum);
}

const solve = (table, loop, part) => {
  const row = table.length;
  const col = table[0].length;
  for (let i = 0 ; i < loop ; i++) {
    const newTable = [];
    walktable(table, (r, c, v) => {
      const count = getNeighbourCount(table, r, c);
      if ((v === '#' && count === 2) || count === 3) {
        set(newTable, r, c, '#');
      }
      else  {
        set(newTable, r, c, '.')
      }
    });

    if (part === 2) {
      newTable[0][0] = '#';
      newTable[row - 1][0] = '#';
      newTable[0][col - 1] = '#';
      newTable[row - 1][col - 1] = '#';
    }

    table = newTable;
  }

  return table.map(r => r.map(v => v === '#' ? 1 : 0).reduce(sum)).reduce(sum);
}

function main(lines) {
  console.time(DAY);

  const table = lines.map(line => line.split(''));

  const result1 = solve(table, 100, 1);
  const result2 = solve(table, 100, 2);

  console.log(`${DAY} Part 1`, result1, result1 === 1061);
  console.log(`${DAY} Part 2`, result2, result2 === 1006);

  console.timeEnd(DAY);
}

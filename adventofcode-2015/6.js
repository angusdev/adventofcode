const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const sum = (a, b) => (a ?? 0) + b;
const get = (table, r, c, defaultValue) => (table[r] ?? [])[c] ?? defaultValue;
const set = (table, r, c, value) => { if (!table[r]) { table[r] = []; } table[r][c] = value; };
const upd = (table, r, c, func) => set(table, r, c, func(get(table, r, c)));

const parse = (lines) => {
  return lines.map(line => {
    const n = line.match(/\-?\d+/g).map(Number);
    const sp = line.split(' ');
    return { action: sp.length == 4 ? sp[0] : sp[1], r1: n[0], c1: n[1], r2: n[2], c2: n[3] }
  });
}

const solve = (input, actionFunc) => {
  const table = [];
  input.forEach(i => {
    for (let r = i.r1 ; r <= i.r2 ; r++) {
      for (let c = i.c1 ; c <= i.c2 ; c++) {
        upd(table, r, c, n => actionFunc(i.action, n ?? 0));
      }
    }
  });

  return table.map(r => r.reduce(sum)).reduce(sum);
}

const action1 = (action, n) => ({ 'toggle': 1 - n, 'on': 1, 'off': 0 }[action]);

const action2 = (action, n) => Math.max(0, n + { 'toggle': 2, 'on': 1, 'off': -1 }[action]);

function main(lines) {
  console.time(DAY);

  const input = parse(lines);
  const result1 = solve(input, action1);
  const result2 = solve(input, action2);

  console.log(`${DAY} Part 1`, result1, result1 === 377891);
  console.log(`${DAY} Part 2`, result2, result2 === 14110788);

  console.timeEnd(DAY);
}

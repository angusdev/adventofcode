const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const isnum = (s) => /^\-?\d+$/.test(s);

const normalize = (n) => n >= 0 ? n : 65536 + n;

const processLine = (line, register) => {
  const sp = line.split(' ');
  if (sp.length === 3) {
    if (isnum(sp[0])) {
      register[sp[2]] = Number(sp[0]);
    }
    else if (typeof register[sp[0]] !== 'undefined') {
      register[sp[2]] = register[sp[0]];
    }
    else {
      return false;
    }
  }
  else if (sp.length === 4) {
    if (typeof register[sp[1]] === 'undefined') {
      return false;
    }
    const n = ~register[sp[1]];
    register[sp[3]] = normalize(n);
  }
  else if (sp.length === 5) {
    if (!isnum(sp[0]) && typeof register[sp[0]] === 'undefined') {
      return false;
    }
    if (!isnum(sp[2]) && typeof register[sp[2]] === 'undefined') {
      return false;
    }

    const a = isnum(sp[0]) ? Number(sp[0]) : register[sp[0]];
    const b = isnum(sp[2]) ? Number(sp[2]) : register[sp[2]];
    const oper = {
      'AND': (a, b) => a & b,
      'OR': (a, b) => a | b,
      'LSHIFT': (a, b) => a << b,
      'RSHIFT': (a, b) => a >> b
    };
    register[sp[4]] = oper[sp[1]](a, b);
  }

  return true;
}

const solve = (lines) => {
  const register = {};
  while (typeof register['a'] === 'undefined') {
    let newlines = [];
    for (let i = 0 ; i < lines.length ; i++) {
      if (!processLine(lines[i], register)) {
        newlines.push(lines[i]);
      }
    }
    lines = newlines;
  }

  return register['a'];
}

function main(lines) {
  console.time(DAY);

  const result1 = solve(lines);
  const result2 = solve(lines.map(line => /\d+ -> b$/.test(line) ? result1 + ' -> b': line));

  console.log(`${DAY} Part 1`, result1, result1 === 46065);
  console.log(`${DAY} Part 2`, result2, result2 === 14134);

  console.timeEnd(DAY);
}

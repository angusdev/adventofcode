const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const parse = (lines) => {
  return lines.map(line => {
    const m = line.match(/(\w+) (\w+)(,.*?(\-?\d+))?/);
    if (m) {
      return { line: line, op: m[1], register: m[2], offset: m[4] ? Number(m[4]) : m[4] };
    }
    else {
      const m2 = line.match(/(\w+).*?(\-?\d+)/);
      return { line: line, op: m2[1], offset: Number(m2[2]) };
    }
  });
}

const solve = (input, register) => {
  let i = 0;
  while (i >= 0 && i < input.length) {
    const instru = input[i];
    i++;
    if (instru.op === 'hlf') {
      register[instru.register] = (register[instru.register] ?? 0) / 2;
    }
    else if (instru.op === 'tpl') {
      register[instru.register] = (register[instru.register] ?? 0) * 3;
    }
    else if (instru.op === 'inc') {
      register[instru.register] = (register[instru.register] ?? 0) + 1;
    }
    else if (instru.op === 'jmp') {
      i += instru.offset - 1;
    }
    else if (instru.op === 'jie') {
      if ((register[instru.register] ?? 0) % 2 === 0) {
        i += instru.offset - 1;
      }
    }
    else if (instru.op === 'jio') {
      if ((register[instru.register] ?? 0) === 1) {
        i += instru.offset - 1;
      }
    }
  }

  return register['b'];
}

function main(lines) {
  console.time(DAY);

  const input = parse(lines);

  const result1 = solve(input, {});
  const result2 = solve(input, {a: 1});

  console.log(`${DAY} Part 1`, result1, result1 === 255);
  console.log(`${DAY} Part 2`, result2, result2 === 334);

  console.timeEnd(DAY);
}

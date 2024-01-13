const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const multiply = (a, b) => (a ?? 1) * b;

const solve = (input, part) => {
  const propCount = 4;
  let result = Number.MIN_SAFE_INTEGER;

  for (let a = 1 ; a < 98 ; a++) {
    for (let b = 1 ; a + b < 99 ; b++) {
      for (let c = 1 ; a + b + c < 100 ; c++) {
        const d = 100 - a - b - c;
        const calorie = input[0][propCount] * a + input[1][propCount] * b + input[2][propCount] * c + input[3][propCount] * d;
        if (part === 1 || (part === 2 && calorie === 500)) {
          let prop = new Array(propCount).fill(0);
          for (let i = 0 ; i < propCount ; i++) {
            prop[i] += input[0][i] * a + input[1][i] * b + input[2][i] * c + input[3][i] * d;
          }
          prop = prop.map(i => Math.max(0, i));
          result = Math.max(result, prop.reduce(multiply));
        }
      }
    }
  }

  return result;
}

function main(lines) {
  console.time(DAY);

  const input = lines.map(line => line.match(/\-?\d+/g));

  const result1 = solve(input, 1);
  const result2 = solve(input, 2);

  console.log(`${DAY} Part 1`, result1, result1 === 13882464);
  console.log(`${DAY} Part 2`, result2, result2 === 11171160);

  console.timeEnd(DAY);
}

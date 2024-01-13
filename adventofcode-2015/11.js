const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const toBase26 = (n) => {
  if (n === 0) {
    return 'a';
  }
  const digits = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  while (n > 0) {
    result = digits[n % digits.length] + result;
    n = parseInt(n / digits.length, 10);
  }

  return result;
}

const fromBase26 = (s) => {
  const digits = 'abcdefghijklmnopqrstuvwxyz';
  let result = 0;
  for (let i = 0 ; i < s.length ; i++) {
    const p = digits.indexOf(s[i]);
    if (p < 0) {
      return NaN;
    }
    result += p * Math.pow(digits.length, s.length - i - 1);
  }

  return result;
}

const isPassword = (s) => {
  let c1 = false;
  for (let i = 2 ; i < s.length ; i++) {
    if (s.charCodeAt(i) === s.charCodeAt(i - 1) + 1 && s.charCodeAt(i - 1) === s.charCodeAt(i - 2) + 1) {
      c1 = true;
      break;
    }
  }
  const c2 = !/[iol]/.test(s);
  const c3 = s.match(/(.)\1+/g)?.length >= 2;

  return c1 && c2 && c3;
}

const solve = (s) => {
  const prefix = s.match(/^a+/g);
  let n = fromBase26(s);
  while (!isPassword(toBase26(++n)));
  return (prefix ? prefix[0] : '') + toBase26(n);
}

function main(lines) {
  console.time(DAY);

  const result1 = solve(lines[0]);
  const result2 = solve(result1);

  console.log(`${DAY} Part 1`, result1, result1 === 'vzbxxyzz');
  console.log(`${DAY} Part 2`, result2, result2 === 'vzcaabcc');

  console.timeEnd(DAY);
}

const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const permutations = (n) => {function t(n,r){for(var e,r=r||[],o=0;o<n.length;o++)e=n.splice(o,1),0===n.length&&c.push(r.concat(e)),t(n.slice(),r.concat(e)),n.splice(o,0,e[0]);return c}var c=[];return t(n)}

const parse = (lines) => {
  const names = new Set();
  const next = new Map();
  lines.forEach(line => {
    const n = line.match(/\w+/g);
    const a = n[0];
    const b = n[n.length - 1];
    names.add(a);
    names.add(b);
    next.set(a + ',' + b, Number(line.match(/\d+/)[0]) * (n[2] === 'gain' ? 1 : -1));
  });

  return [names, next];
}

const solve = (permute, next) => {
  let best = Number.MIN_SAFE_INTEGER;

  for (const pp of permute) {
    const p = [...pp, pp[0]];
    let happiness = 0;
    for (let i = 1 ; i < p.length ; i++) {
      happiness += next.get(p[i - 1] + ',' + p[i]) ?? 0;
      happiness += next.get(p[i] + ',' + p[i - 1]) ?? 0;
    }
    best = Math.max(best, happiness);
  }

  return best;
}

function main(lines) {
  console.time(DAY);

  let [names, next] = parse(lines);
  const result1 = solve(permutations([...names]), next);
  names.add('_ME_');
  const result2 = solve(permutations([...names]), next);

  console.log(`${DAY} Part 1`, result1, result1 === 664);
  console.log(`${DAY} Part 2`, result2, result2 === 640);

  console.timeEnd(DAY)
}

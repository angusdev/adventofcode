const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const permutations = (n) => {function t(n,r){for(var e,r=r||[],o=0;o<n.length;o++)e=n.splice(o,1),0===n.length&&c.push(r.concat(e)),t(n.slice(),r.concat(e)),n.splice(o,0,e[0]);return c}var c=[];return t(n)}

const parse = (lines) => {
  const destSet = new Set();
  const routes = new Map();
  lines.forEach((line) => {
    const sp = line.split(/ +/);
    destSet.add(sp[0]);
    destSet.add(sp[2]);
    routes.set(sp[0] + '-' + sp[2], Number(sp[4]));
    routes.set(sp[2] + '-' + sp[0], Number(sp[4]));
  });

  return [destSet, routes];
}

function main(lines) {
  console.time(DAY);

  const [dests, routes] = parse(lines);

  let result1 = Number.MAX_SAFE_INTEGER;
  let result2 = Number.MIN_SAFE_INTEGER;
  for (const p of permutations([...dests])) {
    let cost = 0;
    let success = true;
    for (let i = 0 ; i < p.length - 1 ; i++) {
      const path = p[i] + '-' + p[i + 1];
      if (!routes.has(path)) {
        success = false;
        break;
      }
      cost += routes.get(path);
    }
    if (success) {
      result1 = Math.min(result1, cost);
      result2 = Math.max(result2, cost);
    }
  }

  console.log(`${DAY} Part 1`, result1, result1 === 117);
  console.log(`${DAY} Part 2`, result2, result2 === 909);

  console.timeEnd(DAY);
}

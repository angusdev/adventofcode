const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const win = (ph, pd, pa, bh, bd, ba) => {
  const roundForPlayer = Math.ceil(ph / Math.max(0, bd - pa));
  const roundForBoss = Math.ceil(bh / Math.max(0, pd - ba));
  return roundForPlayer >= roundForBoss;
}

const parse = (lines) => {
  const input = [[]];
  let i = 0;
  lines.forEach(line => {
    if (line.length === 0) {
      input[++i] = [];
      return true;
    }
    if (line.match(/\d/)) {
      const arr = line.match(/ \d+/g).map(Number);
      if (i <= 2) {
        input[i].push({ cost: arr[0], dmg: arr[1], armor: arr[2]});
      }
      else {
        input[i].push(arr[0]);
      }
    }
  });

  return input;
}

const solve = (input) => {
  let result1 = Number.MAX_SAFE_INTEGER;
  let result2 = Number.MIN_SAFE_INTEGER;
  for (let w = 0 ; w < input[0].length ; w++) {
    for (let a = 0 ; a < input[1].length ; a++) {
      for (let r1 = 0 ; r1 < input[2].length ; r1++) {
        for (let r2 = 0 ; r2 < input[2].length ; r2++) {
          if (r1 === r2) {
            continue;
          }

          const dmg = input[0][w].dmg + input[2][r1].dmg + input[2][r2].dmg;
          const armor = input[1][a].armor + input[2][r1].armor + input[2][r2].armor;
          const cost = input[0][w].cost + input[1][a].cost + input[2][r1].cost + input[2][r2].cost;
          if (win(100, dmg, armor, input[3][0], input[3][1], input[3][2])) {
            result1 = Math.min(result1, cost);
          }
          else {
            result2 = Math.max(result2, cost);
          }
        }
      }
    }
  }

  return [result1, result2];
}

function main(lines) {
  console.time(DAY);

  const input = parse(lines);
  // add optional armor and 2 rings
  input[1].push({ cost: 0, dmg: 0, armor: 0 })
  input[2].push({ cost: 0, dmg: 0, armor: 0 })
  input[2].push({ cost: 0, dmg: 0, armor: 0 })

  const [result1, result2] = solve(input);

  console.log(`${DAY} Part 1`, result1, result1 === 91);
  console.log(`${DAY} Part 2`, result2, result2 === 158);

  console.timeEnd(DAY);
}

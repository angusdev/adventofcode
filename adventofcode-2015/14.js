const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const max = (a, b) => Math.max(a ?? Number.MIN_SAFE_INTEGER, b);

const solve1 = (input, time) => {
  return input.map(i => {
    const round = Math.floor(time / (i.fly + i.rest));
    return round * i.speed * i.fly + Math.min(i.fly, time % (i.fly + i.rest)) * i.speed;
  }).reduce(max)
}

const solve2 = (input, time) => {
  const dist = new Array(input.length).fill(0);
  const score = new Array(input.length).fill(0);
  for (let i = 1 ; i <= time ; i++) {
    for (let j = 0 ; j < input.length ; j++) {
      const inp = input[j];
      const flysec = i % (inp.fly + inp.rest);
      if (flysec > 0 && flysec <= inp.fly) {
        dist[j] += inp.speed;
      }
    }
    const maxDist = dist.reduce(max);
    for (let j = 0 ; j < input.length ; j++) {
      if (dist[j] === maxDist) {
        score[j]++;
      }
    }
  }

  return score.reduce(max);
}

function main(lines) {
  console.time(DAY);

  const input = lines
    .map(line => line.match(/\d+/g).map(Number))
    .map(arr => ({ speed: arr[0], fly: arr[1], rest: arr[2] }));

  const result1 = solve1(input, 2503);
  const result2 = solve2(input, 2503);

  console.log(`${DAY} Part 1`, result1, result1 === 2696);
  console.log(`${DAY} Part 2`, result2, result2 === 1084);

  console.timeEnd(DAY);
}

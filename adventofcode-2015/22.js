const DAYNUM = Number(__filename.match(/(\d+)\.js$/)[1]);
const DAY = `Day ${DAYNUM}`;
const fs = require('fs');
const filename = process.argv[2] ? process.argv[2] : `${DAYNUM}.txt`;
fs.readFile(filename, 'utf8', (err, data) => main(data.split('\n')));

const clone = (a) => JSON.parse(JSON.stringify(a));

const solve = (p, b, spell, lossHp) => {
  const queue = [{ p: p, b: b, turn: 0, manaUsed: 0, history: [] }];
  let leastMana = Number.MAX_SAFE_INTEGER;

  while (queue.length) {
    const q = queue.pop();

    if (q.manaUsed >= leastMana) {
      continue;
    }

    if (lossHp > 0 && q.turn % 2 === 0) {
      // Player turn
      q.p.hp -= lossHp;
      if (q.p.hp <= 0) {
        // loss
        continue;
      }
    }

    q.p.armor = 0;
    for (let i = 0 ; i < spell.length ; i++) {
      const sp = spell[i];
      if (q.p.turn[i] > 0) {
        q.p.turn[i]--;
        q.p.mana += sp.manaAdd ?? 0;
        q.p.armor += sp.armor ?? 0;
        q.b.hp -= sp.dmg ?? 0;
      }
    }

    if (q.b.hp <= 0) {
      // win
      leastMana = Math.min(q.manaUsed, leastMana);
      continue;
    }

    if (q.turn % 2 === 1) {
      // Boss turn
      q.p.hp -= Math.max(1, q.b.dmg - q.p.armor);
      if (q.p.hp <= 0) {
        // Loss
        continue;
      }
      q.turn++;
      queue.push(q);
      continue;
    }

    if (q.turn % 2 === 0 && q.p.mana > 0) {
      // Player turn
      for (let i = 0 ; i < spell.length ; i++) {
        const sp = spell[i];
        if (q.p.mana <= sp.mana) {
          continue;
        }
        if (sp.mana > 0 && sp.turn > 0 && q.p.turn[i] > 0) {
          continue;
        }
        const c = clone(q);
        c.p.mana -= sp.mana;
        c.manaUsed += sp.mana;

        c.b.hp -= sp.dmg0 ?? 0;
        if (c.b.hp <= 0) {
          // win by missile / drain
          leastMana = Math.min(c.manaUsed, leastMana);
          // break instead of continue since following spells use more mana
          break;
        }

        c.p.hp += sp.heal0 ?? 0;
        c.p.turn[i] = sp.turn ?? 0;
        c.turn++;
        c.history.push(sp.name);

        queue.push(c);
      }
    }
  }

  return leastMana;
}

function main(lines) {
  console.time(DAY);

  const playerHp = 50;
  const playerMana = 500;
  const bossHp = Number(lines[0].match(/\d+/));
  const bossDmg = Number(lines[1].match(/\d+/));

  const spell = [
    { name: 'missile', mana: 53, dmg0: 4  },
    { name: 'drain', mana: 73, dmg0: 2, heal0: 2  },
    { name: 'shield', mana: 113, turn: 6, armor: 7 },
    { name: 'poison', mana: 173, turn: 6, dmg: 3 },
    { name: 'recharge', mana: 229, turn: 5, manaAdd: 101 }
  ];

  const result1 = solve(
    { hp: playerHp, mana: playerMana, turn: new Array(spell.length).fill(0) },
    { hp: bossHp, dmg: bossDmg }, spell, 0);

  const result2 = solve(
    { hp: playerHp, mana: playerMana, turn: new Array(spell.length).fill(0) },
    { hp: bossHp, dmg: bossDmg }, spell, 1);

  console.log(`${DAY} Part 1`, result1, result1 === 900);
  console.log(`${DAY} Part 2`, result2, result2 === 1216);

  console.timeEnd(DAY);
}

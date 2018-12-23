const fs = require('fs');
const path = require('path');

// Read and parse the file.
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const nonEmptyLines = input.split('\n').map(line => line.trim()).filter(Boolean);

// Part 1.
function getLetterCountsMap(str) {
  const letterCounts = new Map();
  [...str].forEach(letter => {
    if (!letterCounts.has(letter)) {
      letterCounts.set(letter, 0);
    }

    const prevCount = letterCounts.get(letter);
    letterCounts.set(letter, prevCount + 1)
  });

  return letterCounts;
}

function hasLetterPair(str) {
  return Array.from(getLetterCountsMap(str).values()).some(count => count === 2);
}
function hasLetterTrio(str) {
  return Array.from(getLetterCountsMap(str).values()).some(count => count === 3);
}

const { idsWithPair, idsWithTrio } = nonEmptyLines.reduce((acc, id) => {
  return {
    idsWithPair: hasLetterPair(id) ? acc.idsWithPair + 1 : acc.idsWithPair,
    idsWithTrio: hasLetterTrio(id) ? acc.idsWithTrio + 1 : acc.idsWithTrio,
  }
}, { idsWithPair: 0, idsWithTrio: 0 });

const checksum = idsWithPair * idsWithTrio;
console.log(`Checksum: ${checksum}`);

// Part 2.
function getCommonLetters(str1, str2) {
  const letters1 = [...str1];
  const letters2 = [...str2];
  return letters1.reduce((acc, letter1, index) => {
    return letter1 === letters2[index] ? `${acc}${letter1}` : acc;
  }, '')
}

function findSimilarIds(ids) {
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const commonLetters = getCommonLetters(ids[i], ids[j]);
      if (commonLetters.length === ids[i].length - 1) {
        return commonLetters;
      }
    }
  }
}

const commonLetters = findSimilarIds(nonEmptyLines);
console.log(`Common letters: ${commonLetters}`)

const fs = require('fs');
const path = require('path');

// Read and parse the file.
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const nonEmptyLines = input.split('\n').map(line => line.trim()).filter(Boolean);

const LINE_RE = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
function parseLine(line) {
  const match = line.match(LINE_RE);
  if (!match) {
    throw new Error(`Got malformed line: ${line}`);
  }

  let [_, id, left, top, width, height] = match;
  left = Number.parseInt(left, 10);
  top = Number.parseInt(top, 10);
  width = Number.parseInt(width, 10);
  height = Number.parseInt(height, 10);

  const right = left + width - 1;
  const bottom = top + height - 1;

  return {
    id,
    left,
    top,
    width,
    height,
    right,
    bottom,
  }
}

const claims = nonEmptyLines.map(line => parseLine(line));

function claimContainsSquare(claim, x, y) {
  return (
    x >= claim.left &&
    x <= claim.right &&
    y >= claim.top &&
    y <= claim.bottom
  );
}
const cloth = [];
for (let x = 0; x < 1000; x++) {
  cloth.push([]);
  for (let y = 0; y < 1000; y++) {
    const numClaimsContainingSquare = claims.reduce(
      (acc, claim) => claimContainsSquare(claim, x, y) ? acc + 1 : acc,
      0,
    );
    cloth[x][y] = numClaimsContainingSquare;
  }
}

// Part 1.
const numSquaresWithOverlap = cloth.reduce((acc, clothCol) => {
  return acc + clothCol.reduce((acc, square) => square > 1 ? acc + 1 : acc, 0);
}, 0);
console.log(`Squares containing an overlap: ${numSquaresWithOverlap}`);

// Part 2.
const claimWithoutOverlap = claims.find(claim => {
  for (let x = claim.left; x <= claim.right; x++) {
    for (let y = claim.top; y <= claim.bottom; y++) {
      if (cloth[x][y] !== 1) {
        return false;
      }
    }
  }
  return true;
});

console.log(`Claim without overlap: ${claimWithoutOverlap.id}`);

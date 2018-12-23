const fs = require('fs');
const path = require('path');

// Read and parse the file.
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const nonEmptyLines = input.split('\n').map(line => line.trim()).filter(Boolean);
const frequencyChanges = nonEmptyLines.map(line => Number.parseInt(line, 10));

// Part 1.
const total = frequencyChanges.reduce((acc, value) => acc + value, 0);
console.log(`Total: ${total}`)

// Part 2.
let currentFrequency = 0;
const frequenciesSeen = new Set([currentFrequency]);
let frequencyChangeIndex = 0;
while (true) {
  currentFrequency += frequencyChanges[frequencyChangeIndex];
  if (frequenciesSeen.has(currentFrequency)) {
    console.log(`First repeated frequency: ${currentFrequency}`)
    break;
  }

  frequenciesSeen.add(currentFrequency);
  frequencyChangeIndex = (frequencyChangeIndex + 1) % frequencyChanges.length;
}

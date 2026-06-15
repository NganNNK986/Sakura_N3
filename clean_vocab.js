import fs from 'fs';
import VOCAB from './src/data/vocab.js';

const uniqueVocab = [];
const seenIds = new Set();
let jlptCounter = 1;

for (const w of VOCAB) {
  if (!seenIds.has(w.id)) {
    // If it's a JLPT word (v1000 - v1049), rename its ID
    if (w.id.length === 5 && w.id.startsWith('v10')) {
      w.id = `jlpt_${jlptCounter.toString().padStart(2, '0')}`;
      jlptCounter++;
    }
    
    seenIds.add(w.id);
    uniqueVocab.push(w);
  }
}

console.log('Total unique words after cleanup:', uniqueVocab.length);

const content = `const VOCAB = ${JSON.stringify(uniqueVocab, null, 2)};\n\nexport default VOCAB;\n`;
fs.writeFileSync('./src/data/vocab.js', content);
console.log('Cleaned and saved to src/data/vocab.js');

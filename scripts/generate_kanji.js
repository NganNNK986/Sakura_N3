import fs from 'fs';
import path from 'path';

const csvContent = fs.readFileSync('soumatome_n3.csv', 'utf8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');

const kanjis = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  const parts = line.split(',');
  const id = parts[0];
  const kanjiChar = parts[1];
  const on = parts[2] || '';
  const kun = parts[3] || '';
  const tags = parts[4] || '';
  
  kanjis.push({
    id: `k${String(id).padStart(3, '0')}`,
    char: kanjiChar,
    on: on.replace(/-/g, ''), // remove dashes from readings
    kun: kun.replace(/-/g, ''),
    meaning: '', // To be filled
    examples: [],
    category: tags.replace('第', 'Tuần ').replace('週', ' Ngày ').replace('日目', ''),
    strokes: 0
  });
}

// Read VOCAB to find examples and meanings
let vocabData = [];
try {
  const vocabFile = fs.readFileSync('src/data/vocab.js', 'utf8');
  const jsonStr = vocabFile.replace('export const VOCAB = ', '').replace(/;\nexport default VOCAB;\n$/, '');
  vocabData = JSON.parse(jsonStr);
} catch (e) {
  console.log("Could not load vocab.js", e.message);
}

// Also read existing kanji to preserve any existing meanings
let existingKanji = [];
try {
  const existingKanjiFile = fs.readFileSync('src/data/kanji.js', 'utf8');
  const existingJsonStr = existingKanjiFile.substring(existingKanjiFile.indexOf('['), existingKanjiFile.lastIndexOf(']') + 1);
  existingKanji = JSON.parse(existingJsonStr);
} catch (e) {
  console.log("Could not load existing kanji.js", e.message);
}

const existingMap = {};
for (const k of existingKanji) {
  existingMap[k.char] = k;
}

for (let k of kanjis) {
  // If we already have this kanji manually curated, keep its meaning/examples/strokes
  if (existingMap[k.char]) {
    k.meaning = existingMap[k.char].meaning || k.meaning;
    k.strokes = existingMap[k.char].strokes || 0;
    if (existingMap[k.char].examples && existingMap[k.char].examples.length > 0) {
      k.examples = existingMap[k.char].examples;
    }
  }

  // Cross-reference with VOCAB to find words containing this kanji
  const matchingVocabs = vocabData.filter(v => v.word.includes(k.char));
  if (matchingVocabs.length > 0) {
    if (!k.meaning) {
       // Best effort: take meaning of a 1-character vocab if exists, else just use the first vocab's meaning + "..."
       const exactMatch = matchingVocabs.find(v => v.word === k.char);
       if (exactMatch) {
         k.meaning = exactMatch.meaning;
       } else {
         k.meaning = "Liên quan đến: " + matchingVocabs[0].meaning;
       }
    }
    
    // Add examples if we don't have any
    if (k.examples.length === 0) {
       k.examples = matchingVocabs.slice(0, 3).map(v => `${v.word} (${v.reading}) = ${v.meaning}`);
    }
  }
  
  if (!k.meaning) {
     k.meaning = '(Chưa có nghĩa)';
  }
}

const fileContent = `export const KANJI = ${JSON.stringify(kanjis, null, 2)};\nexport default KANJI;\n`;
fs.writeFileSync('src/data/kanji.js', fileContent);
console.log(`Successfully generated src/data/kanji.js with ${kanjis.length} Kanji!`);

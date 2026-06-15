import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vocabFile = path.join(__dirname, 'src', 'data', 'vocab.js');

let content = fs.readFileSync(vocabFile, 'utf8');

// Replace kanji: with word: for the new v101-v150 entries
content = content.replace(/kanji:\s*"/g, 'word: "');

fs.writeFileSync(vocabFile, content, 'utf8');
console.log('Fixed vocab keys.');

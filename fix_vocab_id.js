import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vocabFile = path.join(__dirname, 'src', 'data', 'vocab.js');

let content = fs.readFileSync(vocabFile, 'utf8');

const lines = content.split('\n');
let inNewSection = false;
let newIdCounter = 1000;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('word: "応募"')) {
    inNewSection = true;
  }
  if (inNewSection && lines[i].includes('id: "v1')) {
    lines[i] = lines[i].replace(/id:\s*"v\d+"/, 'id: "v' + (newIdCounter++) + '"');
  }
}

fs.writeFileSync(vocabFile, lines.join('\n'), 'utf8');
console.log('Fixed vocab IDs.');

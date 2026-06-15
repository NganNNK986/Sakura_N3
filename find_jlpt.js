const fs = require('fs');
const content = fs.readFileSync('old_vocab.js', 'utf16le');
const jlpt = [...content.matchAll(/id:\s*"v10(\d{2})"/g)];
console.log('Found:', jlpt.length);

import fs from 'fs';
import xlsx from 'xlsx';

const workbook = xlsx.readFile('C:\\Downloads\\Mimikara-Oboeru-N3-Kem-vi-du.xlsx');
let foundSTTs = [];

for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length === 0) continue;
    
    let stt = parseInt(row[0], 10);
    if (!isNaN(stt)) {
      foundSTTs.push(stt);
    }
  }
}

foundSTTs.sort((a, b) => a - b);
let missing = [];
for(let i = 1; i <= 880; i++) {
  if (!foundSTTs.includes(i)) {
    missing.push(i);
  }
}

console.log("Total found STTs:", foundSTTs.length);
console.log("Missing STTs:", missing);


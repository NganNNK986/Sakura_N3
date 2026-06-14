import xlsx from 'xlsx';

const workbook = xlsx.readFile('C:\\\\Downloads\\\\Nihongo_Soumatome_N3-Kanji.xlsx');
for (const sheetName of workbook.SheetNames) {
  console.log(`--- Sheet: ${sheetName} ---`);
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  for (let i = 0; i < Math.min(10, data.length); i++) {
    console.log(`Row ${i}:`, data[i]);
  }
}

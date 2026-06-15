const data = [ 
  ['H11', 'ọc友人 tiế', 'nゆうgじん', 'nhHỮUậNHÂtN', 'nghĩa', 'câu', 'dịch'], 
  ['ọH70c', '想像tiế', 'nそうgぞう', 'nTƯhỞNGậTƯtỢNG', 'nghĩa', 'câu', 'dịch'] 
];
data.forEach(row => { 
  const kanji = row[1].replace(/[^\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]/g, ''); 
  const hira = row[2].replace(/[^\u3040-\u309f\u30a0-\u30ffー]/g, ''); 
  const amhan = row[3].replace(/[^A-ZĂÂÊÔƠƯĐÀÁẢÃẠẦẤẨẪẬẰẮẲẴẶÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴ\s]/g, ''); 
  console.log({kanji, hira, amhan}); 
});

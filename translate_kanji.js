import fs from 'fs';

// Helper function to sleep
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function translateText(text) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0][0][0]; // Extract the translated text
  } catch (error) {
    console.error(`Failed to translate: ${text}`, error);
    return null;
  }
}

async function runTranslation() {
  // Read KANJI data
  const kanjiRaw = fs.readFileSync('src/data/kanji.js', 'utf8');
  const arrayStart = kanjiRaw.indexOf('[');
  const arrayEnd = kanjiRaw.lastIndexOf(']');
  const kanjiListStr = kanjiRaw.substring(arrayStart, arrayEnd + 1);
  const kanjiList = eval(kanjiListStr); // Parse it

  console.log(`Loaded ${kanjiList.length} Kanji items.`);

  // Collect unique words to translate
  const wordsToTranslate = new Set();
  
  for (const k of kanjiList) {
    for (const ex of k.examples) {
      if (ex.includes('(Từ ghép)')) {
        const jpWord = ex.split(' (')[0].trim();
        if (jpWord) {
          wordsToTranslate.add(jpWord);
        }
      }
    }
  }

  const wordsArray = Array.from(wordsToTranslate);
  console.log(`Found ${wordsArray.length} unique words needing translation.`);

  // Create translation map
  const translationMap = {};
  
  // Process in batches or sequentially with small delay to avoid rate limiting
  for (let i = 0; i < wordsArray.length; i++) {
    const word = wordsArray[i];
    const translated = await translateText(word);
    if (translated) {
      // Clean up translated text: capitalize first letter
      const cleanTransl = translated.charAt(0).toUpperCase() + translated.slice(1);
      translationMap[word] = cleanTransl;
    }
    
    // Log progress every 50 words
    if ((i + 1) % 50 === 0) {
      console.log(`Translated ${i + 1}/${wordsArray.length} words...`);
    }
    
    // 100ms delay to prevent 429 Too Many Requests
    await sleep(100);
  }

  console.log('Translation complete. Updating kanji.js...');

  // Update kanji examples
  for (const k of kanjiList) {
    for (let i = 0; i < k.examples.length; i++) {
      const ex = k.examples[i];
      if (ex.includes('(Từ ghép)')) {
        const parts = ex.split(' = ');
        const readingPart = parts[0]; // e.g. "駐車 (ちゅうしゃ)"
        const jpWord = readingPart.split(' (')[0].trim();
        
        if (translationMap[jpWord]) {
          // Replace dummy translation with real one
          k.examples[i] = `${readingPart} = ${translationMap[jpWord]}`;
        }
      }
    }
  }

  // Save back to file
  const fileContent = `export const KANJI = ${JSON.stringify(kanjiList, null, 2)};\nexport default KANJI;\n`;
  fs.writeFileSync('src/data/kanji.js', fileContent);
  console.log('Successfully updated src/data/kanji.js with Vietnamese translations!');
}

runTranslation();

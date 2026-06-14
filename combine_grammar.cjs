const fs = require('fs');

const appendContent = fs.readFileSync('append_grammar.js', 'utf8');
const match = appendContent.match(/const grammarPart2 = (\[[\s\S]*?\]);/);
if (match) {
  const grammarPart2Str = match[1];
  const grammarPart2 = eval(grammarPart2Str);

  let grammarJs = fs.readFileSync('src/data/grammar.js', 'utf8');
  const arrayStart = grammarJs.indexOf('[');
  const arrayEnd = grammarJs.lastIndexOf(']');
  const grammarPart1Str = grammarJs.substring(arrayStart, arrayEnd + 1);
  const grammarPart1 = eval(grammarPart1Str);

  const combined = grammarPart1.concat(grammarPart2);

  const fileContent = `export const GRAMMAR = ${JSON.stringify(combined, null, 2)};\nexport default GRAMMAR;\n`;
  fs.writeFileSync('src/data/grammar.js', fileContent);
  console.log(`Combined successfully! Total items: ${combined.length}`);
} else {
  console.log('Failed to match grammarPart2');
}

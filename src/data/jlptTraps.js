import rawTraps from "./jlptTraps.json";

export const JLPT_TRAPS = {
  sections: rawTraps,
  tips: {
    title: "💡 Mẹo ghi nhớ nhanh",
    intro: "✅ Khi học từ vựng, hãy dùng highlight để đánh dấu:",
    highlights: ["Trường âm 「う」", "Trường âm 「い」", "Dấu ゛ (Tenten)", "Âm ngắt 「っ」"],
    conclusion:
      "Khi vào phòng thi, nếu bốn đáp án chỉ khác nhau ở 「う」, 「い」, dấu ゛ hoặc 「っ」, hãy nhớ lại vị trí bạn đã highlight trong lúc học. Đây là cách rất hiệu quả để tránh những lỗi mất điểm đáng tiếc ở phần Nghe và Từ vựng.",
  },
};

const isJapanese = (str) => /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(str);

export function getAllTrapItems() {
  const items = [];
  
  JLPT_TRAPS.sections.forEach((section) => {
    section.blocks.forEach((block) => {
      if (block.type === "table") {
        const headers = block.headers.map((h) => h.toLowerCase());
        
        let wordIdx = -1;
        let meaningIdx = -1;
        let trapIdx = -1;
        
        headers.forEach((h, idx) => {
          if (h.includes("từ") || h.includes("kanji") || h.includes("chữ") || h.includes("nhóm")) {
            if (wordIdx === -1) wordIdx = idx;
          }
          if (h.includes("nghĩa")) {
            if (meaningIdx === -1) meaningIdx = idx;
          }
          if (
            h.includes("bẫy") ||
            h.includes("đọc nhầm") ||
            h.includes("sai") ||
            h.includes("tránh nhầm") ||
            h.includes("gợi nhớ") ||
            h.includes("mẹo nhớ") ||
            h.includes("cách ghi nhớ")
          ) {
            if (trapIdx === -1) trapIdx = idx;
          }
        });
        
        if (wordIdx !== -1 && meaningIdx !== -1) {
          block.rows.forEach((row) => {
            const rawWord = row[wordIdx] || "";
            const meaning = row[meaningIdx] || "";
            const rawTrap = trapIdx !== -1 ? (row[trapIdx] || "") : "";
            
            if (!rawWord || rawWord.includes("❌") || rawWord === "Đối tượng" || rawWord === "Ý nghĩa") return;
            if (!isJapanese(rawWord)) return;
            
            let word = rawWord;
            let reading;
            const match = rawWord.match(/^([^\u3040-\u309F\u30A0-\u30FF\uff00-\uffef()（）\s]+)[（(]([\u3040-\u309F\u30A0-\u30FF\s]+)[）)]$/);
            if (match) {
              word = match[1].trim();
              reading = match[2].trim();
            } else {
              if (/^[\u3040-\u309F\u30A0-\u30FF\s]+$/.test(rawWord)) {
                reading = rawWord.trim();
                word = rawWord.trim();
              } else {
                const parenMatch = meaning.match(/[（(]([\u3040-\u309F\u30A0-\u30FF\s]+)[）)]/);
                if (parenMatch) {
                  reading = parenMatch[1].trim();
                } else {
                  reading = word;
                }
              }
            }
            
            let trap = rawTrap.replace(/^❌/, "").replace(/^⚠️/, "").trim();
            
            if (word && meaning) {
              items.push({
                word,
                reading,
                meaning,
                trap,
                sectionId: section.id,
              });
            }
          });
        }
      }
    });
  });

  // Unique-fy by word to ensure high quality and prevent duplicate words in quiz
  const uniqueItems = [];
  const seenWords = new Set();
  
  for (const item of items) {
    if (!seenWords.has(item.word)) {
      seenWords.add(item.word);
      uniqueItems.push({
        ...item,
        id: `trap_${item.word}`,
      });
    }
  }

  return uniqueItems;
}

export default JLPT_TRAPS;

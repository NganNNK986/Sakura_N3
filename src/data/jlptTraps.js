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

const COMMON_READINGS = {
  "暗記する": "あんきする",
  "覚える": "おぼえる",
  "報告する": "ほうこくする",
  "知らせる": "しらせる",
  "怒鳴る": "どなる",
  "大声で怒る": "おおごえでおこる",
  "サボる": "さぼる",
  "休む": "やすむ",
  "確かめる": "たしかめる",
  "確認する": "かくにんする",
  "チェックする": "ちぇっくする",
  "試す": "ためす",
  "やってみる": "やってみる",
  "くたびれる": "くたびれる",
  "とても疲れる": "とてもつかれる",
  "おごる": "おごる",
  "ごちそうする": "ごちそうする",
  "やり直す": "やりなおす",
  "もう一度する": "もういちどする",
  "得意な": "とくいな",
  "とても上手な": "とてもじょうずな",
  "欠点": "けってん",
  "よくないところ": "よくないところ",
  "親しい": "したしい",
  "仲がいい": "なかがいい",
  "怪しい": "あやしい",
  "不審な": "ふしんな",
  "退屈な": "たいくつな",
  "つまらない": "つまらない",
  "くだらない": "くだらない",
  "意味がない": "いみがない",
  "異常": "いじょう",
  "おかしい": "おかしい",
  "サイズ": "さいず",
  "大きさ": "おおきさ",
  "おしまい": "おしまい",
  "終わり": "おわり",
  "夏休み明け": "なつやすみあけ",
  "夏休みが終わった直後": "なつやすみが終わったちょくご",
  "アドバイス": "あどばいす",
  "助言": "じょげん",
  "スケジュール": "すけじゅーる",
  "予定": "よてい",
  "計画": "けいかく",
  "メッセージ": "めっせーじ",
  "伝言": "でんごん",
  "アイデア": "あいであ",
  "考え": "かんがえ",
  "恋しい": "こいしい",
  "懐かしい": "なつかしい"
};

const isJapanese = (str) => /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(str);

export function getAllTrapItems() {
  const items = [];
  
  JLPT_TRAPS.sections.forEach((section) => {
    section.blocks.forEach((block) => {
      // 1. Scan Tables
      if (block.type === "table") {
        const headers = block.headers.map((h) => h.toLowerCase());
        
        const isSynonymTable = headers.includes("từ đồng nghĩa") || headers.includes("cách diễn đạt tương đương") || headers.includes("từ tương đương");
        
        if (isSynonymTable) {
          const synIdx = headers.findIndex((h) => h.includes("đồng nghĩa") || h.includes("tương đương") || h.includes("diễn đạt"));
          const meaningIdx = headers.findIndex((h) => h.includes("nghĩa") || h.includes("nhóm"));
          
          block.rows.forEach((row) => {
            const synCell = row[synIdx] || "";
            const meaning = row[meaningIdx] || "";
            
            // Split by ⇔, /, or space
            const words = synCell.split(/⇔|\/|\s+/).map((w) => w.trim()).filter((w) => w.length > 0 && isJapanese(w));
            words.forEach((w) => {
              let cleanWord = w.replace(/[（(].*?[）)]/, "").trim();
              let reading = COMMON_READINGS[cleanWord] || cleanWord;
              
              items.push({
                word: cleanWord,
                reading,
                meaning: `Đồng nghĩa với nhóm: ${meaning}`,
                trap: "",
                sectionId: section.id,
              });
            });
          });
        } else {
          // Standard vocabulary table
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
      }
      
      // 2. Scan Lists
      if (block.type === "list") {
        block.items.forEach((itemText) => {
          const jpWordMatch = itemText.match(/^([^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]*)([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3005]+)(?:\((.*?)\)|（(.*?)）)?\s*[:：]\s*(.*)$/);
          
          if (jpWordMatch) {
            let word = jpWordMatch[2].trim();
            let rawReading = (jpWordMatch[3] || jpWordMatch[4] || "").trim();
            let meaning = jpWordMatch[5].trim();
            
            let reading = word;
            if (isJapanese(rawReading)) {
              reading = rawReading;
            } else if (rawReading && !meaning.includes(rawReading)) {
              meaning = `${rawReading} - ${meaning}`;
            }
            
            if (word && meaning && isJapanese(word)) {
              items.push({
                word,
                reading: COMMON_READINGS[word] || reading,
                meaning: meaning.replace(/^→\s*/, ""),
                trap: "",
                sectionId: section.id,
              });
            }
          }
        });
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

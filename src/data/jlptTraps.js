// Bẫy đọc từ vựng JLPT N3 — nguồn: JLPTN3.html

export const JLPT_TRAPS = {
  sections: [
    {
      id: "chouon",
      title: "Bẫy 1.1: Trường âm & Âm On/Kun",
      subsections: [
        {
          id: "chouon-intro",
          title: "🚫 1. Bẫy trường âm (長音)",
          description:
            "Trong đề thi JLPT N3, các đáp án thường chỉ khác nhau ở một trường âm (ー). Vì vậy, hãy đặc biệt chú ý xem từ có kéo dài âm hay không và kéo dài ở vị trí nào.",
          groups: [
            {
              id: "no-chouon",
              title: "A. Nhóm không có trường âm",
              note: "Đề thi thường thêm 「う」 hoặc 「い」 để đánh lừa.",
              items: [
                { word: "努力", reading: "どりょく", meaning: "Nỗ lực", trap: "どうりょく" },
                { word: "手術", reading: "しゅじゅつ", meaning: "Phẫu thuật", trap: "しゅうじゅつ / しゅじゅうつ" },
                { word: "知識", reading: "ちしき", meaning: "Kiến thức", trap: "ちいしき" },
                { word: "資格", reading: "しかく", meaning: "Bằng cấp, tư cách", trap: "しいかく" },
                { word: "記録", reading: "きろく", meaning: "Ghi chép, kỷ lục", trap: "きいろく" },
                { word: "価格", reading: "かかく", meaning: "Giá cả", trap: "かあかく" },
                { word: "食塩", reading: "しょくえん", meaning: "Muối ăn", trap: "しょうくえん" },
                { word: "徹夜", reading: "てつや", meaning: "Thức trắng đêm", trap: "てえつや" },
              ],
            },
            {
              id: "one-chouon",
              title: "B. Nhóm chỉ có một trường âm",
              note: "Dễ bị kéo dài nhầm ở âm còn lại.",
              items: [
                { word: "故郷", reading: "こきょう", meaning: "Quê hương", trap: "こうきょう" },
                { word: "呼吸", reading: "こきゅう", meaning: "Hô hấp", trap: "こうきゅう" },
                { word: "時計", reading: "とけい", meaning: "Đồng hồ", trap: "とうけい" },
              ],
            },
            {
              id: "both-chouon",
              title: "C. Nhóm có trường âm ở cả hai chữ",
              note: "Đề thi thường bỏ mất một trường âm để đánh lừa.",
              items: [
                { word: "流行", reading: "りゅうこう", meaning: "Thịnh hành", trap: "りゅこう" },
                { word: "渋滞", reading: "じゅうたい", meaning: "Tắc nghẽn", trap: "じゅたい" },
                { word: "影響", reading: "えいきょう", meaning: "Ảnh hưởng", trap: "えいきょ" },
                { word: "連休", reading: "れんきゅう", meaning: "Kỳ nghỉ dài", trap: "れんきゅ" },
              ],
            },
          ],
        },
        {
          id: "on-kun",
          title: "🎯 2. Bẫy âm On/Kun & cách đọc đặc biệt",
          description:
            "Đây là nhóm từ không đọc hoàn toàn theo quy luật On-yomi hoặc Kun-yomi, rất dễ nhầm nếu chỉ học theo từng chữ Hán.",
          groups: [
            {
              id: "on-kun-main",
              title: "Từ vựng thường gặp",
              items: [
                { word: "小型", reading: "こがた", meaning: "Cỡ nhỏ", trap: "しょうがた" },
                { word: "大型", reading: "おおがた", meaning: "Cỡ lớn", trap: "(so sánh với 小型)" },
                { word: "新型", reading: "しんがた", meaning: "Kiểu mới", trap: "(so sánh với 小型)" },
                { word: "留守", reading: "るす", meaning: "Vắng nhà", trap: "りゅうしゅ" },
                { word: "二十歳", reading: "はたち", meaning: "20 tuổi", trap: "にじゅうさい / にじゅっさい" },
                { word: "口紅", reading: "くちべに", meaning: "Son môi", trap: "くちこう" },
                {
                  word: "半額",
                  reading: "はんがく",
                  meaning: "Nửa giá",
                  trap: "⚠ Dễ nhầm với 5割引（ごわりびき） về ý nghĩa",
                },
                { word: "自然", reading: "しぜん", meaning: "Tự nhiên, thiên nhiên", trap: "じぜん" },
                { word: "増減", reading: "ぞうげん", meaning: "Tăng giảm", trap: "じょうげん" },
                { word: "通知", reading: "つうち", meaning: "Thông báo", trap: "つうし" },
                { word: "郵送", reading: "ゆうそう", meaning: "Gửi bưu điện", trap: "ほうそう" },
                { word: "秒", reading: "びょう", meaning: "Giây (thời gian)", trap: "しょう" },
              ],
            },
          ],
          quickNotes: [
            {
              word: "自然（しぜん）",
              meaning: "Tự nhiên, thiên nhiên",
              mistake: "じぜん",
              note: 'có biến âm đục "ji", thường dùng trong 事前 - trước đó',
            },
            {
              word: "増減（ぞうげん）",
              meaning: "Tăng giảm",
              mistake: "じょうげん",
              note: "jougen, thường là chữ 上限 - giới hạn trên",
            },
            {
              word: "通知（つうち）",
              meaning: "Thông báo",
              mistake: "つうし",
              note: 'đọc nhầm âm "chi" thành "shi"',
            },
            {
              word: "郵送（ゆうそう）",
              meaning: "Gửi bưu điện",
              mistake: "ほうそう",
              note: "housou, thường là chữ 放送 - phát sóng hoặc 包装 - đóng gói",
            },
            {
              word: "秒（びょう）",
              meaning: "Giây (thời gian)",
              mistake: "しょう",
              note: "shou, thường là chữ 小 hoặc 少",
            },
          ],
        },
      ],
    },
    {
      id: "dakuten",
      title: "💥 3. Bẫy biến âm đục (゛) & âm ngắt (っ)",
      description:
        "Đây là dạng xuất hiện rất nhiều trong Mondai 1 của JLPT N3. Đề thi thường kiểm tra xem bạn có nhớ có thêm dấu ゛ (Tenten) hay không, và có xuất hiện っ (âm ngắt) khi ghép Kanji hay không.",
      groups: [
        {
          id: "dakuten-main",
          title: "Từ vựng thường gặp",
          items: [
            { word: "代引き", reading: "だいびき", meaning: "Thanh toán khi nhận hàng (COD)", trap: "だいひき" },
            { word: "割引", reading: "わりびき", meaning: "Giảm giá", trap: "わりひき" },
            { word: "薬局", reading: "やっきょく", meaning: "Hiệu thuốc", trap: "やくきょく" },
            { word: "発見", reading: "はっけん", meaning: "Phát hiện", trap: "はつけん" },
            { word: "発明", reading: "はつめい", meaning: "Phát minh", trap: "⚠ Dễ nhầm với 発見" },
            { word: "直接", reading: "ちょくせつ", meaning: "Trực tiếp", trap: "ちょっくせつ" },
            { word: "絶対", reading: "ぜったい", meaning: "Tuyệt đối", trap: "ぜつたい" },
          ],
        },
      ],
    },
  ],
  tips: {
    title: "💡 Mẹo ghi nhớ nhanh",
    intro: "✅ Khi học từ vựng, hãy dùng highlight để đánh dấu:",
    highlights: ["Trường âm 「う」", "Trường âm 「い」", "Dấu ゛ (Tenten)", "Âm ngắt 「っ」"],
    conclusion:
      "Khi vào phòng thi, nếu bốn đáp án chỉ khác nhau ở 「う」, 「い」, dấu ゛ hoặc 「っ」, hãy nhớ lại vị trí bạn đã highlight trong lúc học. Đây là cách rất hiệu quả để tránh những lỗi mất điểm đáng tiếc ở phần Nghe và Từ vựng.",
  },
};

/** Flat list of all trap items for quiz mode */
export function getAllTrapItems() {
  const items = [];
  for (const section of JLPT_TRAPS.sections) {
    const groups = section.groups || section.subsections?.flatMap((s) => s.groups || []) || [];
    for (const group of groups) {
      for (const item of group.items) {
        if (item.trap.startsWith("(") || item.trap.startsWith("⚠")) continue;
        items.push({
          ...item,
          sectionId: section.id,
          groupId: group.id,
        });
      }
    }
  }
  return items;
}

export default JLPT_TRAPS;

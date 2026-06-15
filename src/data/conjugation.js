const CONJUGATION_RULES = [
  {
    form: "Thể Te (て形) / Thể Ta (た形)",
    description: "Dùng để nối câu, sai khiến (te), hoặc diễn tả quá khứ (ta).",
    group1: [
      { ending: "う・つ・る", change: "って / った" },
      { ending: "ぬ・ぶ・む", change: "んで / んだ" },
      { ending: "く", change: "いて / いた (Ngoại lệ: 行く → 行って / 行った)" },
      { ending: "ぐ", change: "いで / いだ" },
      { ending: "す", change: "して / した" }
    ],
    group2: "Bỏ る thêm て / た (Ví dụ: 食べる → 食べて / 食べた)",
    group3: "する → して / した \nくる → きて / きた"
  },
  {
    form: "Thể Phủ định (ない形)",
    description: "Dùng để diễn tả phủ định ở hiện tại/tương lai.",
    group1: [
      { ending: "Cột U (う, く, す...)", change: "Chuyển sang Cột A (あ, か, さ...) + ない" },
      { ending: "Lưu ý đuôi う", change: "う → わ + ない (Ví dụ: 買う → 買わない)" }
    ],
    group2: "Bỏ る thêm ない (Ví dụ: 見る → 見ない)",
    group3: "する → しない \nくる → こない"
  },
  {
    form: "Thể Khả năng (可能形)",
    description: "Diễn tả khả năng làm được việc gì đó (Có thể...). Trợ từ を thường đổi thành が.",
    group1: [
      { ending: "Cột U (う, く, す...)", change: "Chuyển sang Cột E (え, け, せ...) + る" },
      { ending: "Ví dụ", change: "書く → 書ける、話す → 話せる" }
    ],
    group2: "Bỏ る thêm られる (Ví dụ: 食べる → 食べられる)",
    group3: "する → できる \nくる → こられる"
  },
  {
    form: "Thể Bị động (受身形)",
    description: "Bị / Được ai đó làm gì. Chủ thể bị tác động đi với が/は, người tác động đi với に.",
    group1: [
      { ending: "Cột U (う, く, す...)", change: "Chuyển sang Cột A (あ, か, さ...) + れる" },
      { ending: "Ví dụ", change: "書く → 書かれる、呼ぶ → 呼ばれる" }
    ],
    group2: "Bỏ る thêm られる (Ví dụ: 褒める → 褒められる)",
    group3: "する → される \nくる → こられる"
  },
  {
    form: "Thể Sai khiến (使役形)",
    description: "Bắt / Cho phép ai đó làm gì.",
    group1: [
      { ending: "Cột U (う, く, す...)", change: "Chuyển sang Cột A (あ, か, さ...) + せる" },
      { ending: "Ví dụ", change: "書く → 書かせる、待つ → 待たせる" }
    ],
    group2: "Bỏ る thêm させる (Ví dụ: 食べる → 食べさせる)",
    group3: "する → させる \nくる → こさせる"
  },
  {
    form: "Thể Điều kiện (ば形)",
    description: "Nếu... thì (Giả định).",
    group1: [
      { ending: "Cột U", change: "Chuyển sang Cột E + ば (Ví dụ: 行く → 行けば)" }
    ],
    group2: "Bỏ る thêm れば (Ví dụ: 見る → 見れば)",
    group3: "する → すれば \nくる → くれば"
  },
  {
    form: "Thể Ý chí (意向形)",
    description: "Hãy cùng làm... / Định làm... (Văn nói của ましょう).",
    group1: [
      { ending: "Cột U", change: "Chuyển sang Cột O + う (Ví dụ: 行く → 行こう)" }
    ],
    group2: "Bỏ る thêm よう (Ví dụ: 食べる → 食べよう)",
    group3: "する → しよう \nくる → こよう"
  },
  {
    form: "Thể Mệnh lệnh (命令形)",
    description: "Ra lệnh, sai bảo (Làm đi!). Thường dùng trong quân đội, cổ vũ, hoặc người lớn tuổi nói với người nhỏ.",
    group1: [
      { ending: "Cột U", change: "Chuyển sang Cột E (Ví dụ: 行く → 行け)" }
    ],
    group2: "Bỏ る thêm ろ (Ví dụ: 食べる → 食べろ)",
    group3: "する → しろ / せよ \nくる → こい"
  }
];

const IRREGULAR_VERBS = [
  {
    dict: "行く",
    reading: "いく",
    meaning: "Đi (Nhóm 1 nhưng chia Te/Ta bất quy tắc)",
    forms: [
      { label: "Thể て/た", value: "行って / 行った" },
      { label: "Thể bị động", value: "行かれる" },
      { label: "Thể sai khiến", value: "行かせる" },
      { label: "Thể mệnh lệnh", value: "行け" }
    ]
  },
  {
    dict: "ある",
    reading: "ある",
    meaning: "Có (đồ vật) - Phủ định bất quy tắc",
    forms: [
      { label: "Thể ない", value: "ない (Không phải あらない)" },
      { label: "Thể điều kiện", value: "あれば" },
      { label: "Thể quá khứ", value: "あった" }
    ]
  },
  {
    dict: "くれる",
    reading: "くれる",
    meaning: "Cho tôi (Nhóm 2 nhưng Mệnh lệnh bất quy tắc)",
    forms: [
      { label: "Thể mệnh lệnh", value: "くれ (Không phải くれろ)" },
      { label: "Thể て", value: "くれて" },
      { label: "Thể ない", value: "くれない" }
    ]
  },
  {
    dict: "する",
    reading: "する",
    meaning: "Làm (Nhóm 3)",
    forms: [
      { label: "Thể bị động", value: "される" },
      { label: "Thể sai khiến", value: "させる" },
      { label: "Bị động sai khiến", value: "させられる" },
      { label: "Khả năng", value: "できる" },
      { label: "Ý chí", value: "しよう" }
    ]
  },
  {
    dict: "くる",
    reading: "くる",
    meaning: "Đến (Nhóm 3)",
    forms: [
      { label: "Thể bị động", value: "こられる" },
      { label: "Thể sai khiến", value: "こさせる" },
      { label: "Bị động sai khiến", value: "こさせられる" },
      { label: "Mệnh lệnh", value: "こい" },
      { label: "Nai", value: "こない" }
    ]
  },
  {
    dict: "問う",
    reading: "とう",
    meaning: "Hỏi (Đuôi う nhưng chia て bất quy tắc)",
    forms: [
      { label: "Thể て", value: "問うて (Không phải 問って)" },
      { label: "Thể た", value: "問うた" }
    ]
  },
  {
    dict: "いらっしゃる",
    reading: "いらっしゃる",
    meaning: "Đi / Đến / Ở (Tôn kính ngữ)",
    forms: [
      { label: "Thể ます", value: "いらっしゃいます" },
      { label: "Thể て", value: "いらっしゃって" },
      { label: "Thể mệnh lệnh", value: "いらっしゃい" }
    ]
  },
  {
    dict: "おっしゃる",
    reading: "おっしゃる",
    meaning: "Nói (Tôn kính ngữ)",
    forms: [
      { label: "Thể ます", value: "おっしゃいます" },
      { label: "Thể mệnh lệnh", value: "おっしゃい" }
    ]
  },
  {
    dict: "なさる",
    reading: "なさる",
    meaning: "Làm (Tôn kính ngữ)",
    forms: [
      { label: "Thể ます", value: "なさいます" },
      { label: "Thể mệnh lệnh", value: "なさい" }
    ]
  },
  {
    dict: "くださる",
    reading: "くださる",
    meaning: "Cho tôi (Tôn kính ngữ)",
    forms: [
      { label: "Thể ます", value: "くださいます" },
      { label: "Thể mệnh lệnh", value: "ください" }
    ]
  }
];

export { CONJUGATION_RULES, IRREGULAR_VERBS };

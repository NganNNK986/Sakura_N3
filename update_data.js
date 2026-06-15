import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- UPDATE KEIGO ---
const keigoFile = path.join(__dirname, 'src', 'data', 'keigo.js');
let keigoContent = fs.readFileSync(keigoFile, 'utf8');

const newScenarios = `
    { id: "s016", situation: "Gửi lời chào đầu email công việc", plain: "いつもありがとう", polite: "いつもお世話になっております", explain: "Câu chào kinh điển nhất trong email tiếng Nhật, mang nghĩa 'Cảm ơn ngài đã luôn chiếu cố'.", tags: ["email", "business"] },
    { id: "s017", situation: "Xin lỗi khách hàng/đối tác", plain: "ごめんなさい", polite: "申し訳ございません", explain: "Tuyệt đối không dùng ごめんなさい trong công việc. Phải dùng 申し訳ございません (もうしわけございません).", tags: ["apology", "business"] },
    { id: "s018", situation: "Nhờ vả ai đó làm gì (Mở đầu câu)", plain: "すみませんが", polite: "恐れ入りますが", explain: "恐れ入りますが (おそれいりますが) dùng làm mào đầu trước khi nhờ vả, mang ý 'Thật ngại quá nhưng...'.", tags: ["request", "business"] },
    { id: "s019", situation: "Chấp nhận yêu cầu / Đồng ý", plain: "いいですよ", polite: "承知いたしました", explain: "Dùng 承知いたしました (しょうちいたしました) để báo rằng mình đã hiểu và tiếp nhận yêu cầu.", tags: ["business"] },
    { id: "s020", situation: "Từ chối khéo yêu cầu", plain: "できません", polite: "いたしかねます", explain: "いたしかねます là cách nói vòng vo lịch sự của できません (Tôi khó có thể làm được).", tags: ["refusal", "business"] },
    { id: "s021", situation: "Hẹn gặp lại sau", plain: "また後で", polite: "後ほどご連絡いたします", explain: "後ほど (のちほど) nghĩa là 'sau đây', thường đi kèm với việc sẽ liên lạc lại.", tags: ["time", "business"] },
    { id: "s022", situation: "Nhắc nhở nhẹ nhàng (Mở đầu)", plain: "言いにくいけど", polite: "申し上げにくいのですが", explain: "申し上げにくいのですが dùng khi sắp nói một tin xấu hoặc điều khó nói.", tags: ["communication", "business"] },
    { id: "s023", situation: "Xác nhận lại một thông tin", plain: "確認してください", polite: "念のためご確認をお願いいたします", explain: "念のため (ねんのため) nghĩa là 'để chắc chắn/phòng hờ'. Rất hay dùng khi yêu cầu check lại.", tags: ["business"] },
    { id: "s024", situation: "Bày tỏ sự cảm kích", plain: "助かりました", polite: "誠に感謝申し上げます", explain: "誠に (まことに) = 本当に (rất/thực sự). 感謝申し上げる là mức độ cảm ơn cao nhất.", tags: ["gratitude", "business"] },
    { id: "s025", situation: "Hỏi xem khách có tiện nghe máy không", plain: "今、電話いいですか？", polite: "今、少しお時間よろしいでしょうか", explain: "Cách hỏi lịch sự nhất để đảm bảo không làm phiền đối phương khi gọi điện.", tags: ["phone", "business"] },
    { id: "s026", situation: "Khi không nghe rõ đối tác nói gì", plain: "え？もう一回言って", polite: "恐れ入りますが、もう一度お願いできますでしょうか", explain: "Luôn dùng mào đầu 恐れ入りますが trước khi nhờ người khác lặp lại.", tags: ["phone", "business"] },
    { id: "s027", situation: "Chuyển điện thoại cho người khác", plain: "Aさんに代わります", polite: "Aと代わりますので、少々お待ちください", explain: "Khi gọi người cùng công ty (A), không được gắn さん vào tên người đó khi nói với khách.", tags: ["phone", "business"] },
    { id: "s028", situation: "Hỏi xem có ai có ý kiến khác không", plain: "ほかに意見はありますか？", polite: "ほかにご意見やご質問はございませんか？", explain: "ございませんか là thể lịch sự của ありませんか.", tags: ["meeting", "business"] },
    { id: "s029", situation: "Mời đối tác ngồi", plain: "座ってください", polite: "どうぞお掛けください", explain: "お掛けになる (おかけになる) là Tôn kính ngữ của 座る (ngồi).", tags: ["action", "business"] },
    { id: "s030", situation: "Gửi lời chúc/hy vọng ở cuối email", plain: "よろしくね", polite: "引き続きよろしくお願い申し上げます", explain: "引き続き (ひきつづき - tiếp tục) thường dùng để mong đối tác tiếp tục hợp tác.", tags: ["email", "business"] }
  ]
};`;

keigoContent = keigoContent.replace(/\s*\]\s*};\s*(export default KEIGO;)?\s*$/, ',' + newScenarios);
if (!keigoContent.includes('export default KEIGO;')) {
  keigoContent += '\nexport default KEIGO;\n';
}

fs.writeFileSync(keigoFile, keigoContent, 'utf8');
console.log('Keigo updated.');

// --- UPDATE ADVERBS ---
const adverbsFile = path.join(__dirname, 'src', 'data', 'adverbs.js');
let adverbsContent = fs.readFileSync(adverbsFile, 'utf8');

const newAdverbs = `
  , { id: "a086", word: "じっと", reading: "じっと", romaji: "jitto", meaning: "chăm chú, yên lặng", example: "じっと見つめる。", exMeaning: "Nhìn chằm chằm.", tags: ["adverb", "onomatopoeia"] },
  { id: "a087", word: "そっと", reading: "そっと", romaji: "sotto", meaning: "nhẹ nhàng, rón rén", example: "そっとドアを閉める。", exMeaning: "Nhẹ nhàng đóng cửa.", tags: ["adverb", "onomatopoeia"] },
  { id: "a088", word: "ぼんやり", reading: "ぼんやり", romaji: "bonyari", meaning: "mờ ảo, lơ đãng", example: "ぼんやりと空を見る。", exMeaning: "Nhìn bầu trời lơ đãng.", tags: ["adverb", "onomatopoeia"] },
  { id: "a089", word: "わくわく", reading: "わくわく", romaji: "wakuwaku", meaning: "hồi hộp, háo hức", example: "旅行が楽しみでわくわくする。", exMeaning: "Háo hức vì mong chờ chuyến du lịch.", tags: ["adverb", "onomatopoeia"] },
  { id: "a090", word: "どきどき", reading: "どきどき", romaji: "dokidoki", meaning: "tim đập thình thịch", example: "面接でどきどきした。", exMeaning: "Tim đập thình thịch trong buổi phỏng vấn.", tags: ["adverb", "onomatopoeia"] },
  { id: "a091", word: "いらいら", reading: "いらいら", romaji: "iraira", meaning: "sốt ruột, bực bội", example: "バスが来なくていらいらする。", exMeaning: "Xe buýt mãi không đến nên bực bội.", tags: ["adverb", "onomatopoeia"] },
  { id: "a092", word: "すっきり", reading: "すっきり", romaji: "sukkiri", meaning: "sảng khoái, gọn gàng", example: "悩みが解決してすっきりした。", exMeaning: "Phiền não được giải quyết nên rất sảng khoái.", tags: ["adverb", "onomatopoeia"] },
  { id: "a093", word: "ぐっすり", reading: "ぐっすり", romaji: "gussuri", meaning: "ngủ say", example: "疲れていたのでぐっすり眠った。", exMeaning: "Vì mệt nên đã ngủ rất say.", tags: ["adverb", "onomatopoeia"] },
  { id: "a094", word: "にっこり", reading: "にっこり", romaji: "nikkori", meaning: "cười mỉm", example: "彼女はにっこり笑った。", exMeaning: "Cô ấy mỉm cười.", tags: ["adverb", "onomatopoeia"] },
  { id: "a095", word: "のんびり", reading: "のんびり", romaji: "nonbiri", meaning: "thong thả", example: "休日は家でのんびりする。", exMeaning: "Ngày nghỉ tôi thong thả ở nhà.", tags: ["adverb", "onomatopoeia"] },
  { id: "a096", word: "ばったり", reading: "ばったり", romaji: "battari", meaning: "tình cờ", example: "道でばったり友達に会った。", exMeaning: "Tình cờ gặp bạn trên đường.", tags: ["adverb", "onomatopoeia"] },
  { id: "a097", word: "こっそり", reading: "こっそり", romaji: "kossori", meaning: "lén lút", example: "こっそりお菓子を食べる。", exMeaning: "Lén lút ăn kẹo.", tags: ["adverb", "onomatopoeia"] },
  { id: "a098", word: "ぎりぎり", reading: "ぎりぎり", romaji: "girigiri", meaning: "sát nút", example: "締切ぎりぎりに提出した。", exMeaning: "Nộp bài sát nút giờ hạn.", tags: ["adverb", "onomatopoeia"] },
  { id: "a099", word: "ぴったり", reading: "ぴったり", romaji: "pittari", meaning: "vừa khít", example: "サイズがぴったりだ。", exMeaning: "Kích cỡ vừa khít.", tags: ["adverb", "onomatopoeia"] },
  { id: "a100", word: "ますます", reading: "ますます", romaji: "masumasu", meaning: "ngày càng", example: "雨はますます強くなった。", exMeaning: "Mưa ngày càng to.", tags: ["adverb", "degree"] },
  { id: "a101", word: "めったに", reading: "めったに", romaji: "metta ni", meaning: "hiếm khi", example: "彼はめったに怒らない。", exMeaning: "Anh ấy hiếm khi tức giận.", tags: ["adverb", "frequency"] },
  { id: "a102", word: "たまたま", reading: "たまたま", romaji: "tamatama", meaning: "tình cờ", example: "たまたま同じ本を読んでいた。", exMeaning: "Tình cờ đọc cùng một cuốn sách.", tags: ["adverb", "unexpected"] },
  { id: "a103", word: "ちっとも", reading: "ちっとも", romaji: "chittomo", meaning: "một chút cũng không", example: "ちっとも寒くない。", exMeaning: "Một chút cũng không lạnh.", tags: ["adverb", "negation"] },
  { id: "a104", word: "せめて", reading: "せめて", romaji: "semete", meaning: "ít nhất là", example: "せめて日曜日くらいは休みたい。", exMeaning: "Ít nhất là cũng muốn nghỉ ngày Chủ Nhật.", tags: ["adverb", "limit"] },
  { id: "a105", word: "どうしても", reading: "どうしても", romaji: "doushitemo", meaning: "nhất định, dù thế nào cũng", example: "どうしても行きたい。", exMeaning: "Dù thế nào cũng muốn đi.", tags: ["adverb", "strong"] },
  { id: "a106", word: "とりあえず", reading: "とりあえず", romaji: "toriaezu", meaning: "trước mắt, tạm thời", example: "とりあえずビールを注文しよう。", exMeaning: "Trước mắt cứ gọi bia đã.", tags: ["adverb", "time"] },
  { id: "a107", word: "わざと", reading: "わざと", romaji: "wazato", meaning: "cố tình", example: "わざと負けた。", exMeaning: "Cố tình thua.", tags: ["adverb", "purpose"] },
  { id: "a108", word: "わざわざ", reading: "わざわざ", romaji: "wazawaza", meaning: "cất công", example: "わざわざ来てくれてありがとう。", exMeaning: "Cảm ơn vì đã cất công đến.", tags: ["adverb", "purpose"] },
  { id: "a109", word: "案外", reading: "あんがい", romaji: "angai", meaning: "không ngờ, ngoài dự tính", example: "今日のテストは案外簡単だった。", exMeaning: "Bài kiểm tra hôm nay dễ không ngờ.", tags: ["adverb", "unexpected"] },
  { id: "a110", word: "思わず", reading: "おもわず", romaji: "omowazu", meaning: "bất giác, không kìm được", example: "痛くて思わず叫んだ。", exMeaning: "Đau quá nên bất giác hét lên.", tags: ["adverb", "action"] },
  { id: "a111", word: "相変わらず", reading: "あいかわらず", romaji: "aikawarazu", meaning: "vẫn như mọi khi", example: "彼は相変わらず元気だ。", exMeaning: "Anh ấy vẫn khỏe như mọi khi.", tags: ["adverb", "state"] },
  { id: "a112", word: "思い切り", reading: "おもいきり", romaji: "omoikiri", meaning: "hết sức, dứt khoát", example: "思い切り泣いた。", exMeaning: "Đã khóc hết sức.", tags: ["adverb", "degree"] }
];`;

adverbsContent = adverbsContent.replace(/\s*\]\s*;\s*(export default ADVERBS;)?\s*$/, newAdverbs + '\nexport default ADVERBS;\n');
fs.writeFileSync(adverbsFile, adverbsContent, 'utf8');
console.log('Adverbs updated.');

// --- UPDATE VOCAB ---
const vocabFile = path.join(__dirname, 'src', 'data', 'vocab.js');
let vocabContent = fs.readFileSync(vocabFile, 'utf8');

const newVocab = `
  , { id: "v101", kanji: "応募", reading: "おうぼ", romaji: "oubo", meaning: "ứng tuyển, đăng ký", tags: ["n3", "business"] },
  { id: "v102", kanji: "面接", reading: "めんせつ", romaji: "mensetsu", meaning: "phỏng vấn", tags: ["n3", "business"] },
  { id: "v103", kanji: "採用", reading: "さいよう", romaji: "saiyou", meaning: "tuyển dụng, áp dụng", tags: ["n3", "business"] },
  { id: "v104", kanji: "実績", reading: "じっせき", romaji: "jisseki", meaning: "thành tích thực tế", tags: ["n3", "business"] },
  { id: "v105", kanji: "利益", reading: "りえき", romaji: "rieki", meaning: "lợi ích, lợi nhuận", tags: ["n3", "business"] },
  { id: "v106", kanji: "赤字", reading: "あかじ", romaji: "akaji", meaning: "lỗ (đỏ)", tags: ["n3", "business"] },
  { id: "v107", kanji: "黒字", reading: "くろじ", romaji: "kuroji", meaning: "lãi (đen)", tags: ["n3", "business"] },
  { id: "v108", kanji: "経費", reading: "けいひ", romaji: "keihi", meaning: "kinh phí, chi phí", tags: ["n3", "business"] },
  { id: "v109", kanji: "条件", reading: "じょうけん", romaji: "jouken", meaning: "điều kiện", tags: ["n3", "general"] },
  { id: "v110", kanji: "提出", reading: "ていしゅつ", romaji: "teishutsu", meaning: "nộp, đệ trình", tags: ["n3", "business"] },
  { id: "v111", kanji: "期限", reading: "きげん", romaji: "kigen", meaning: "thời hạn", tags: ["n3", "time"] },
  { id: "v112", kanji: "延長", reading: "えんちょう", romaji: "enchou", meaning: "kéo dài, gia hạn", tags: ["n3", "time"] },
  { id: "v113", kanji: "短縮", reading: "たんしゅく", romaji: "tanshuku", meaning: "rút ngắn", tags: ["n3", "time"] },
  { id: "v114", kanji: "予定", reading: "よてい", romaji: "yotei", meaning: "dự định, kế hoạch", tags: ["n3", "time"] },
  { id: "v115", kanji: "変更", reading: "へんこう", romaji: "henkou", meaning: "thay đổi", tags: ["n3", "action"] },
  { id: "v116", kanji: "キャンセル", reading: "きゃんせる", romaji: "kyanseru", meaning: "hủy bỏ", tags: ["n3", "katakana"] },
  { id: "v117", kanji: "確認", reading: "かくにん", romaji: "kakunin", meaning: "xác nhận", tags: ["n3", "business"] },
  { id: "v118", kanji: "了承", reading: "りょうしょう", romaji: "ryoushou", meaning: "thấu hiểu, chấp nhận", tags: ["n3", "business"] },
  { id: "v119", kanji: "承諾", reading: "しょうだく", romaji: "shoudaku", meaning: "chấp thuận, đồng ý", tags: ["n3", "business"] },
  { id: "v120", kanji: "拒否", reading: "きょひ", romaji: "kyohi", meaning: "từ chối, cự tuyệt", tags: ["n3", "business"] },
  { id: "v121", kanji: "許可", reading: "きょか", romaji: "kyoka", meaning: "cho phép", tags: ["n3", "business"] },
  { id: "v122", kanji: "禁止", reading: "きんし", romaji: "kinshi", meaning: "cấm", tags: ["n3", "general"] },
  { id: "v123", kanji: "注意", reading: "ちゅうい", romaji: "chuui", meaning: "chú ý, cảnh báo", tags: ["n3", "general"] },
  { id: "v124", kanji: "警告", reading: "けいこく", romaji: "keikoku", meaning: "cảnh cáo", tags: ["n3", "general"] },
  { id: "v125", kanji: "要求", reading: "ようきゅう", romaji: "youkyuu", meaning: "yêu cầu", tags: ["n3", "business"] },
  { id: "v126", kanji: "希望", reading: "きぼう", romaji: "kibou", meaning: "nguyện vọng, hy vọng", tags: ["n3", "emotion"] },
  { id: "v127", kanji: "期待", reading: "きたい", romaji: "kitai", meaning: "kỳ vọng", tags: ["n3", "emotion"] },
  { id: "v128", kanji: "不安", reading: "ふあん", romaji: "fuan", meaning: "bất an", tags: ["n3", "emotion"] },
  { id: "v129", kanji: "安心", reading: "あんしん", romaji: "anshin", meaning: "an tâm", tags: ["n3", "emotion"] },
  { id: "v130", kanji: "満足", reading: "まんぞく", romaji: "manzoku", meaning: "thỏa mãn, hài lòng", tags: ["n3", "emotion"] },
  { id: "v131", kanji: "不満", reading: "ふまん", romaji: "fuman", meaning: "bất mãn", tags: ["n3", "emotion"] },
  { id: "v132", kanji: "文句", reading: "もんく", romaji: "monku", meaning: "phàn nàn, càu nhàu", tags: ["n3", "communication"] },
  { id: "v133", kanji: "苦情", reading: "くじょう", romaji: "kujou", meaning: "than phiền, phàn nàn (formal)", tags: ["n3", "business"] },
  { id: "v134", kanji: "謝罪", reading: "しゃざい", romaji: "shazai", meaning: "xin lỗi, tạ lỗi", tags: ["n3", "business"] },
  { id: "v135", kanji: "感謝", reading: "かんしゃ", romaji: "kansha", meaning: "cảm tạ, biết ơn", tags: ["n3", "business"] },
  { id: "v136", kanji: "尊敬", reading: "そんけい", romaji: "sonkei", meaning: "tôn kính", tags: ["n3", "emotion"] },
  { id: "v137", kanji: "謙遜", reading: "けんそん", romaji: "kenson", meaning: "khiêm tốn", tags: ["n3", "emotion"] },
  { id: "v138", kanji: "自信", reading: "じしん", romaji: "jishin", meaning: "tự tin", tags: ["n3", "emotion"] },
  { id: "v139", kanji: "誇り", reading: "ほこり", romaji: "hokori", meaning: "tự hào", tags: ["n3", "emotion"] },
  { id: "v140", kanji: "責任", reading: "せきにん", romaji: "sekinin", meaning: "trách nhiệm", tags: ["n3", "business"] },
  { id: "v141", kanji: "義務", reading: "ぎむ", romaji: "gimu", meaning: "nghĩa vụ", tags: ["n3", "general"] },
  { id: "v142", kanji: "権利", reading: "けんり", romaji: "kenri", meaning: "quyền lợi", tags: ["n3", "general"] },
  { id: "v143", kanji: "法律", reading: "ほうりつ", romaji: "houritsu", meaning: "pháp luật", tags: ["n3", "society"] },
  { id: "v144", kanji: "規則", reading: "きそく", romaji: "kisoku", meaning: "quy tắc", tags: ["n3", "society"] },
  { id: "v145", kanji: "ルール", reading: "るーる", romaji: "ruuru", meaning: "luật lệ", tags: ["n3", "katakana"] },
  { id: "v146", kanji: "マナー", reading: "まなー", romaji: "manaa", meaning: "phép lịch sự, văn hóa ứng xử", tags: ["n3", "katakana"] },
  { id: "v147", kanji: "常識", reading: "じょうしき", romaji: "joushiki", meaning: "kiến thức thông thường, lẽ thường", tags: ["n3", "general"] },
  { id: "v148", kanji: "知識", reading: "ちしき", romaji: "chishiki", meaning: "tri thức, kiến thức", tags: ["n3", "general"] },
  { id: "v149", kanji: "経験", reading: "けいけん", romaji: "keiken", meaning: "kinh nghiệm", tags: ["n3", "general"] },
  { id: "v150", kanji: "技術", reading: "ぎじゅつ", romaji: "gijutsu", meaning: "kỹ thuật", tags: ["n3", "general"] }
];`;

vocabContent = vocabContent.replace(/\s*\]\s*;\s*(export default VOCAB;)?\s*$/, newVocab + '\nexport default VOCAB;\n');
fs.writeFileSync(vocabFile, vocabContent, 'utf8');
console.log('Vocab updated.');


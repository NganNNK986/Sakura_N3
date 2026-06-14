import fs from 'fs';

const hanVietDict = {
"駐":"Trú","無":"Vô","満":"Mãn","向":"Hướng","禁":"Cấm","関":"Quan","係":"Hệ","断":"Đoạn","横":"Hoành","押":"Áp",
"式":"Thức","信":"Tín","号":"Hiệu","確":"Xác","認":"Nhận","飛":"Phi","非":"Phi","常":"Thường","階":"Giai","段":"Đoạn",
"箱":"Tương","危":"Nguy","険":"Hiểm","捨":"Xả","線":"Tuyến","面":"Diện","普":"Phổ","各":"Các","次":"Thứ","快":"Khoái",
"速":"Tốc","過":"Quá","鉄":"Thiết","指":"Chỉ","定":"Định","席":"Tịch","由":"Do","番":"Phiên","窓":"Song","側":"Trắc",
"路":"Lộ","停":"Đình","整":"Chỉnh","券":"Khoán","現":"Hiện","両":"Lưỡng","替":"Thế","優":"Ưu","座":"Tọa","降":"Giáng",
"未":"Vị","末":"Mạt","若":"Nhược","晩":"Vãn","島":"Đảo","皿":"Mãnh","血":"Huyết","助":"Trợ","準":"Chuẩn","備":"Bị",
"営":"Doanh","閉":"Bế","案":"Án","内":"Nội","予":"Dự","約":"Ước","煙":"Yên","当":"Đương","全":"Toàn","客":"Khách",
"様":"Dạng","解":"Giải","協":"Hiệp","願":"Nguyện","観":"Quan","園":"Viên","港":"Cảng","遊":"Du","美":"Mỹ","術":"Thuật",
"神":"Thần","寺":"Tự","役":"Dịch","郵":"Bưu","局":"Cục","交":"Giao","差":"Sai","点":"Điểm","橋":"Kiều","公":"Công",
"受":"Thụ","付":"Phó","科":"Khoa","鼻":"Tỵ","婦":"Phụ","形":"Hình","骨":"Cốt","折":"Chiết","困":"Khốn","消":"Tiêu",
"防":"Phòng","救":"Cứu","警":"Cảnh","察":"Sát","故":"Cố","伝":"Truyền","黄":"Hoàng","絵":"Hội","組":"Tổ","束":"Thúc",
"授":"Thụ","渡":"Độ","昔":"Tích","要":"Yếu","冷":"Lãnh","蔵":"Tàng","凍":"Đống","庫":"Khố","召":"Triệu","存":"Tồn",
"必":"Tất","費":"Phí","期":"Kỳ","限":"Hạn","製":"Chế","造":"Tạo","賞":"Thưởng","法":"Pháp","温":"Ôn","販":"Phán",
"機":"Cơ","増":"Tăng","減":"Giảm","量":"Lượng","氷":"Băng","返":"Phản","湯":"Thang","材":"Tài","卵":"Noãn","乳":"Nhũ",
"粉":"Phấn","袋":"Đại","混":"Hỗn","焼":"Thiêu","表":"Biểu","裏":"Lý","留":"Lưu","守":"Thủ","濃":"Nùng","薄":"Bạc",
"部":"Bộ","数":"Số","件":"Kiện","再":"Tái","接":"Tiếp","続":"Tục","示":"Thị","戻":"Lệ","完":"Hoàn","了":"Liễu",
"登":"Đăng","録":"Lục","育":"Dục","種":"Chủng","類":"Loại","師":"Sư","妻":"Thê","馬":"Mã","石":"Thạch","砂":"Sa",
"塩":"Diêm","油":"Du","緑":"Lục","紅":"Hồng","冊":"Sách","個":"Cá","枚":"Mai","告":"Cáo","利":"Lợi","割":"Cát",
"倍":"Bội","値":"Trị","商":"Thương","支":"Chi","払":"Phất","米":"Mễ","級":"Cấp","残":"Tàn","型":"Hình","税":"Thuế",
"込":"Vào","価":"Giá","格":"Cách","申":"Thân","記":"Ký","例":"Lệ","齢":"Linh","歳":"Tuế","性":"Tính","連":"Liên",
"絡":"Lạc","届":"Giới","宅":"Trạch","配":"Phối","希":"Hy","望":"Vọng","荷":"Hà","換":"Hoán","額":"Ngạch","在":"Tại",
"取":"Thủ","預":"Dự","衣":"Y","参":"Tham","達":"Đạt","勤":"Cần","帯":"Đới","細":"Tế","戸":"Hộ","湖":"Hồ",
"船":"Thuyền","角":"Giác","夫":"Phu","苦":"Khổ","礼":"Lễ","伺":"Tứ","遅":"Trì","失":"Thất","汗":"Hãn","念":"Niệm",
"涙":"Lệ","笑":"Tiếu","調":"Điều","査":"Tra","移":"Di","難":"Nan","簡":"Giản","単":"Đơn","感":"Cảm","想":"Tưởng",
"練":"Luyện","最":"Tối","適":"Thích","選":"Tuyển","違":"Vi","直":"Trực","復":"Phục","辞":"Từ","宿":"Túc","昨":"Tạc",
"君":"Quân","結":"Kết","婚":"Hôn","祝":"Chúc","曲":"Khúc","奥":"Áo","寝":"Tẩm","痛":"Thống","熱":"Nhiệt","虫":"Trùng",
"歯":"Xỉ","治":"Trị","汚":"Ô","並":"Tịnh","他":"Tha","身":"Thân","酒":"Tửu","吸":"Hấp","欲":"Dục","眠":"Miên",
"疲":"Bì","息":"Tức","呼":"Hô","厚":"Hậu","泣":"Khấp","鳴":"Minh","初":"Sơ","泊":"Bạc","葉":"Diệp","報":"Báo",
"晴":"Tình","雲":"Vân","吹":"Xuy","暖":"Noãn","雪":"Tuyết","震":"Chấn","波":"Ba","求":"Cầu","募":"Mộ","職":"Chức",
"容":"Dung","技":"Kỹ","般":"Ban","务":"Vụ","課":"Khóa","球":"Cầu","決":"Quyết","勝":"Thắng","対":"Đối","流":"Lưu",
"負":"Phụ","投":"Đầu","果":"Quả","戦":"Chiến","経":"Kinh","済":"Tế","成":"Thành","貿":"Mậu","易":"Dịch","輸":"Thâu",
"相":"Tương","化":"Hóa","比":"Tỷ","原":"Nguyên","因":"Nhân","際":"Tế","議":"Nghị","活":"Hoạt","変":"Biến","政":"Chính",
"府":"Phủ","改":"Cải","否":"Phủ","的":"Đích","実":"Thực","欠":"Khiếm","専":"Chuyên","亡":"Vong","忙":"Mang","忘":"Vong",
"祭":"Tế","労":"Lao","加":"Gia","情":"Tình","反":"Phản","務":"Vụ"
};

// 1. Read existing KANJI
const currentKanjiContent = fs.readFileSync('src/data/kanji.js', 'utf8');
const jsonStr = currentKanjiContent.substring(currentKanjiContent.indexOf('['), currentKanjiContent.lastIndexOf(']') + 1);
const kanjiList = JSON.parse(jsonStr);

// 2. Read Examples from soumatome_n3_words.csv
const wordsCsv = fs.readFileSync('soumatome_n3_words.csv', 'utf8');
const wordLines = wordsCsv.split('\n');

const wordsMapByTag = {};
for (let i = 1; i < wordLines.length; i++) {
  const line = wordLines[i].trim();
  if (!line) continue;
  // Handle quoted meanings like "стоянка, парковочное место"
  let formattedLine = line;
  if (formattedLine.includes('"')) {
    formattedLine = formattedLine.replace(/"[^"]+"/g, 'MEANING');
  }
  const parts = formattedLine.split(',');
  if (parts.length < 6) continue;
  
  const word = parts[1];
  const reading = parts[2];
  const kanjihidden = parts[4];
  const rawTag = parts[5] || parts[parts.length-1];
  const tag = rawTag.replace('第', 'Tuần ').replace('週', ' Ngày ').replace('日目', '');
  
  if (!wordsMapByTag[tag]) wordsMapByTag[tag] = [];
  wordsMapByTag[tag].push({ word, reading });
}

// 3. Update meanings and examples
for (const k of kanjiList) {
  // Update Meaning to Han Viet
  const hanViet = hanVietDict[k.char];
  if (hanViet) {
    if (k.meaning === '(Chưa có nghĩa)' || k.meaning.startsWith('Liên quan đến:')) {
      k.meaning = hanViet;
    } else if (!k.meaning.includes(hanViet)) {
      k.meaning = `${hanViet} (${k.meaning})`;
    }
  } else if (k.meaning === '(Chưa có nghĩa)') {
    k.meaning = 'Hán Việt chưa cập nhật';
  }

  // Update Examples
  if (k.examples.length === 0 || (k.examples.length < 3 && k.meaning.includes('Trú'))) {
    const examplesInTag = wordsMapByTag[k.category] || [];
    const matchingWords = examplesInTag.filter(w => w.word.includes(k.char));
    
    // Add examples
    for (const w of matchingWords) {
      const formatted = `${w.word} (${w.reading})`;
      // If no translation, we can just use the word itself or say "Từ vựng N3"
      if (!k.examples.find(ex => ex.startsWith(w.word))) {
         k.examples.push(`${formatted} = ${hanViet} (Từ ghép)`);
      }
    }
  }
}

const fileContent = `export const KANJI = ${JSON.stringify(kanjiList, null, 2)};\nexport default KANJI;\n`;
fs.writeFileSync('src/data/kanji.js', fileContent);
console.log('Successfully enriched kanji.js with Hán Việt and Examples!');

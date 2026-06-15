export const KEIGO = {
  intro: "Kính ngữ (敬語) là ngôn ngữ lịch sự trong tiếng Nhật, chia làm 3 loại chính.",
  types: [
    {
      id: "teineigo",
      name: "Thể lịch sự (丁寧語)",
      desc: "Cách nói lịch sự cơ bản dùng trong giao tiếp hàng ngày (Thể ます, です)."
    },
    {
      id: "sonkeigo",
      name: "Tôn kính ngữ (尊敬語)",
      desc: "Dùng khi đề cao hành động, trạng thái của người trên (Khách hàng, Giám đốc, Bề trên). TUYỆT ĐỐI KHÔNG dùng cho hành động của bản thân."
    },
    {
      id: "kenjougo",
      name: "Khiêm nhường ngữ (謙譲語)",
      desc: "Dùng khi hạ thấp hành động của CHÍNH MÌNH hoặc phe mình để tôn trọng người kia."
    }
  ],
  patterns: [
    { id: "kp001", plain: "食べる / 飲む", teineigo: "食べます / 飲みます", sonkeigo: "召し上がる (めしあがる)", kenjougo: "いただく", meaning: "ăn / uống", tags: ["food"] },
    { id: "kp002", plain: "行く", teineigo: "行きます", sonkeigo: "いらっしゃる / おいでになる", kenjougo: "参る (まいる) / 伺う (うかがう)", meaning: "đi", tags: ["movement"] },
    { id: "kp003", plain: "来る", teineigo: "来ます", sonkeigo: "いらっしゃる / お見えになる / お越しになる", kenjougo: "参る (まいる) / 伺う (うかがう)", meaning: "đến", tags: ["movement"] },
    { id: "kp004", plain: "いる", teineigo: "います", sonkeigo: "いらっしゃる / おいでになる", kenjougo: "おる", meaning: "có mặt, ở", tags: ["state"] },
    { id: "kp005", plain: "言う", teineigo: "言います", sonkeigo: "おっしゃる", kenjougo: "申す (もうす) / 申し上げる", meaning: "nói", tags: ["communication"] },
    { id: "kp006", plain: "する", teineigo: "します", sonkeigo: "なさる", kenjougo: "いたす", meaning: "làm", tags: ["action"] },
    { id: "kp007", plain: "見る", teineigo: "見ます", sonkeigo: "ご覧になる (ごらんになる)", kenjougo: "拝見する (はいけんする)", meaning: "nhìn, xem", tags: ["sight"] },
    { id: "kp008", plain: "聞く / 尋ねる", teineigo: "聞きます", sonkeigo: "お聞きになる", kenjougo: "伺う (うかがう) / 承る (うけたまわる)", meaning: "nghe / hỏi", tags: ["communication"] },
    { id: "kp009", plain: "知っている", teineigo: "知っています", sonkeigo: "ご存知だ (ごぞんじだ)", kenjougo: "存じている (ぞんじている) / 存じ上げる", meaning: "biết", tags: ["knowledge"] },
    { id: "kp010", plain: "もらう", teineigo: "もらいます", sonkeigo: "-", kenjougo: "いただく / 頂戴する (ちょうだいする)", meaning: "nhận", tags: ["giving"] },
    { id: "kp011", plain: "あげる", teineigo: "あげます", sonkeigo: "-", kenjougo: "差し上げる (さしあげる)", meaning: "cho, biếu", tags: ["giving"] },
    { id: "kp012", plain: "くれる", teineigo: "くれます", sonkeigo: "くださる", kenjougo: "-", meaning: "cho (tôi)", tags: ["giving"] },
    { id: "kp013", plain: "会う", teineigo: "会います", sonkeigo: "お会いになる", kenjougo: "お目にかかる (おめにかかる)", meaning: "gặp", tags: ["meeting"] },
    { id: "kp014", plain: "思う", teineigo: "思います", sonkeigo: "お思いになる", kenjougo: "存じる (ぞんじる)", meaning: "nghĩ", tags: ["mind"] },
    { id: "kp015", plain: "読む", teineigo: "読みます", sonkeigo: "お読みになる", kenjougo: "拝読する (はいどくする)", meaning: "đọc", tags: ["study"] },
    { id: "kp016", plain: "書く", teineigo: "書きます", sonkeigo: "お書きになる", kenjougo: "お書きする", meaning: "viết", tags: ["study"] },
    { id: "kp017", plain: "借りる", teineigo: "借ります", sonkeigo: "お借りになる", kenjougo: "拝借する (はいしゃくする)", meaning: "mượn", tags: ["action"] },
    { id: "kp018", plain: "見せる", teineigo: "見せます", sonkeigo: "お見せになる", kenjougo: "お目に掛ける (おめにかける)", meaning: "cho xem", tags: ["sight"] },
    { id: "kp019", plain: "分かる", teineigo: "分かります", sonkeigo: "お分かりになる", kenjougo: "承知する (しょうちする) / かしこまる", meaning: "hiểu, rõ", tags: ["knowledge"] },
    { id: "kp020", plain: "死ぬ", teineigo: "死にます", sonkeigo: "お亡くなりになる (おなくなりになる)", kenjougo: "-", meaning: "mất, qua đời", tags: ["state"] }
  ],
  scenarios: [
    { id: "s001", situation: "Khách hàng hỏi bạn có thể chờ một chút không", plain: "ちょっと待ってください", polite: "少々お待ちください", explain: "Dùng 少々 (しょうしょう) thay cho ちょっと và お...ください là thể tôn kính ngữ mệnh lệnh nhẹ nhàng.", tags: ["service"] },
    { id: "s002", situation: "Giới thiệu tên mình với đối tác", plain: "私は田中です", polite: "私、田中と申します", explain: "申す (もうす) là khiêm nhường ngữ của 言う. Rất hay dùng khi xưng tên.", tags: ["introduction"] },
    { id: "s003", situation: "Hỏi sếp đã ăn chưa", plain: "もう食べましたか？", polite: "もうお食事は召し上がりましたか？", explain: "召し上がる (めしあがる) là tôn kính ngữ của 食べる. Tuyệt đối không dùng いただく cho sếp.", tags: ["food"] },
    { id: "s004", situation: "Xin phép về trước", plain: "先に帰ります", polite: "お先に失礼いたします", explain: "失礼いたします là Khiêm nhường ngữ dùng khi xin phép ra về hoặc kết thúc điện thoại.", tags: ["leave"] },
    { id: "s005", situation: "Hỏi đối tác xem Giám đốc có ở văn phòng không", plain: "社長はいますか？", polite: "社長はいらっしゃいますか？", explain: "いらっしゃる là tôn kính ngữ của いる (có mặt).", tags: ["location"] },
    { id: "s006", situation: "Nói với khách hàng rằng mình đã hiểu rõ yêu cầu", plain: "はい、分かりました", polite: "はい、承知いたしました (hoặc かしこまりました)", explain: "承知する (しょうちする) là Khiêm nhường ngữ của 分かる. Thể hiện sự cung kính nhận lệnh.", tags: ["business"] },
    { id: "s007", situation: "Mời khách hàng xem qua tài liệu", plain: "この資料を見てください", polite: "こちらの資料をご覧ください", explain: "ご覧になる (ごらんになる) là Tôn kính ngữ của 見る. Đây là mẫu rất hay dùng trong văn phòng.", tags: ["business"] },
    { id: "s008", situation: "Hỏi tên khách hàng khi nghe điện thoại", plain: "名前は何ですか？", polite: "お名前をお伺いしてもよろしいでしょうか？", explain: "伺う (うかがう) là Khiêm nhường ngữ của 聞く (hỏi).", tags: ["phone"] },
    { id: "s009", situation: "Báo với khách hàng rằng Giám đốc của mình đang vắng mặt", plain: "社長は今いません", polite: "社長の田中はただいま席を外しております", explain: "Lưu ý: Nói về người trong công ty với người ngoài, phải hạ thấp phe mình bằng おる (Khiêm nhường ngữ của いる).", tags: ["phone"] },
    { id: "s010", situation: "Nói với sếp rằng mình sẽ đi đến công ty đối tác", plain: "明日、A社に行きます", polite: "明日、A社へ伺います (hoặc 参ります)", explain: "伺う / 参る là Khiêm nhường ngữ của 行く.", tags: ["business"] },
    { id: "s011", situation: "Cảm ơn khách hàng đã cất công đến", plain: "来てくれてありがとう", polite: "お越しいただき、ありがとうございます", explain: "お越しになる là Tôn kính ngữ của 来る, kết hợp với いただく (nhận được việc khách đến).", tags: ["service"] },
    { id: "s012", situation: "Nhờ sếp kiểm tra tài liệu giúp mình", plain: "これをチェックしてください", polite: "こちらをご確認いただけないでしょうか？", explain: "Dùng ご...いただけないでしょうか (Liệu tôi có thể nhận được việc sếp xác nhận giúp không) để nhờ vả lịch sự.", tags: ["request"] },
    { id: "s013", situation: "Khi tiếp nhận lời mời từ đối tác", plain: "喜んで行きます", polite: "喜んでお伺いいたします", explain: "お伺いする là dạng Khiêm nhường ngữ kép rất phổ biến khi nhận lời mời.", tags: ["business"] },
    { id: "s014", situation: "Khi gửi email đính kèm file", plain: "ファイルを送ります。見てください", polite: "ファイルを添付いたします。ご査収ください", explain: "ご査収ください (ごさしゅうください) là cụm từ chuyên dụng trong Email tiếng Nhật thay cho 見てください.", tags: ["email"] },
    { id: "s015", situation: "Khi kết thúc Email", plain: "よろしくお願いします", polite: "よろしくお願い申し上げます", explain: "申し上げる là Khiêm nhường ngữ. Đây là câu chốt tiêu chuẩn cho mọi Email công việc.", tags: ["email"] },
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
};
export default KEIGO;

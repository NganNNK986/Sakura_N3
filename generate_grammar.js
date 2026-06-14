import fs from 'fs';

const grammarData = [
  // CHƯƠNG 1: THỜI GIAN
  {
    id: "g01",
    pattern: "～うちに",
    meaning: "Trong lúc, nhân lúc...",
    formation: "Vる/Vている/Vない + うちに\nいAい/なAな/Nの + うちに",
    examples: [
      "忘れないうちに、メモしておこう。(Nhân lúc chưa quên, hãy ghi chú lại.)",
      "若いうちに、いろいろな経験をしたほうがいい。(Trong lúc còn trẻ, nên trải nghiệm nhiều thứ.)"
    ]
  },
  {
    id: "g02",
    pattern: "～間 / ～間に",
    meaning: "Trong suốt / Trong khi (có sự việc xảy ra)...",
    formation: "Vる/Vている/Vない + 間/間に\nNの + 間/間に",
    examples: [
      "お母さんが昼寝をしている間、子どもたちはテレビを見ていた。(Trong suốt lúc mẹ ngủ trưa, lũ trẻ xem TV.)",
      "私が旅行で留守の間に、庭に草がたくさん生えてしまった。(Trong khi tôi đi du lịch vắng nhà, cỏ mọc đầy vườn.)"
    ]
  },
  {
    id: "g03",
    pattern: "～てからでないと / ～てからでなければ",
    meaning: "Nếu chưa... thì không thể...",
    formation: "Vて + からでないと / からでなければ",
    examples: [
      "店長に聞いてからでないと、お答えできません。(Nếu chưa hỏi cửa hàng trưởng thì tôi không thể trả lời được.)",
      "この仕事は訓練を受けてからでなければ、できない。(Công việc này nếu chưa được huấn luyện thì không thể làm được.)"
    ]
  },
  {
    id: "g04",
    pattern: "～ところだ / ～ところ（+助詞）",
    meaning: "Đang chuẩn bị / Đang làm / Vừa mới làm xong...",
    formation: "Vる / Vている / Vた + ところ",
    examples: [
      "今から家を出るところです。(Tôi đang chuẩn bị ra khỏi nhà bây giờ đây.)",
      "ケーキが焼き上がったところへ、子供たちが帰ってきた。(Đúng lúc bánh vừa nướng xong thì lũ trẻ về.)"
    ]
  },

  // CHƯƠNG 2: MỨC ĐỘ, TIẾN TRIỂN
  {
    id: "g05",
    pattern: "～とおりだ / ～とおり（に） / ～どおり（に）",
    meaning: "Đúng như, theo như...",
    formation: "Vる/Vた/Vている + とおり\nNの + とおり / N + どおり",
    examples: [
      "交番で教えてもらったとおりに歩いていったので、迷わず着いた。(Tôi đã đi đúng như được chỉ ở đồn cảnh sát nên đến nơi không bị lạc.)",
      "予想どおり、Aチームが優勝した。(Đúng như dự đoán, đội A đã vô địch.)"
    ]
  },
  {
    id: "g06",
    pattern: "～によって / ～によっては",
    meaning: "Tùy thuộc vào...",
    formation: "N + によって / によっては",
    examples: [
      "国によって習慣が違う。(Tùy vào mỗi quốc gia mà phong tục khác nhau.)",
      "人によっては、この薬は副作用が出ることがある。(Tùy từng người mà thuốc này có thể gây ra tác dụng phụ.)"
    ]
  },
  {
    id: "g07",
    pattern: "～たびに",
    meaning: "Cứ mỗi lần... lại...",
    formation: "Vる / Nの + たびに",
    examples: [
      "この曲を聞くたびに、故郷を思い出す。(Cứ mỗi lần nghe bài hát này, tôi lại nhớ quê hương.)",
      "父は旅行のたびに、お土産を買ってきてくれる。(Bố tôi cứ mỗi lần đi du lịch lại mua quà về cho tôi.)"
    ]
  },
  {
    id: "g08",
    pattern: "（～ば）～ほど",
    meaning: "Càng... càng...",
    formation: "Vば + Vる + ほど\nいAければ + いAい + ほど\nなAなら（ば）+ なAな + ほど",
    examples: [
      "外国語は、使えば使うほど上手になる。(Ngoại ngữ càng sử dụng thì càng giỏi.)",
      "荷物は少なければ少ないほどいい。(Hành lý càng ít thì càng tốt.)"
    ]
  },
  {
    id: "g09",
    pattern: "～ついでに",
    meaning: "Nhân tiện, tiện thể...",
    formation: "Vる / Vた + ついでに\nNの + ついでに",
    examples: [
      "散歩のついでに、この手紙を出してきてくれない？(Nhân tiện đi dạo, gửi giúp tôi bức thư này được không?)",
      "郵便局へ行ったついでに、スーパーに寄った。(Tiện thể đi bưu điện, tôi đã ghé vào siêu thị.)"
    ]
  },

  // CHƯƠNG 3: SO SÁNH, MỨC ĐỘ
  {
    id: "g10",
    pattern: "～くらいだ / ～ぐらいだ / ～くらい / ～ぐらい / ～ほどだ / ～ほど",
    meaning: "Đến mức, cỡ như...",
    formation: "V / A / N + くらい/ほど",
    examples: [
      "風が強くて、立っていられないほどだった。(Gió mạnh đến mức không thể đứng vững được.)",
      "このパンは、あごが外れるくらい硬い。(Cái bánh mì này cứng đến mức sắp rớt cả hàm.)"
    ]
  },
  {
    id: "g11",
    pattern: "～くらい...はない / ～ほど...はない",
    meaning: "Không có gì... bằng...",
    formation: "N + くらい / ほど + N（người/vật/việc）+ はない",
    examples: [
      "リーさんぐらい動物好きな人はいない。(Không có ai thích động vật bằng anh Lee.)",
      "試験ほど嫌なものはない。(Không có thứ gì đáng ghét bằng thi cử.)"
    ]
  },
  {
    id: "g12",
    pattern: "～くらいなら / ～ぐらいなら",
    meaning: "Nếu phải... thì thà... còn hơn",
    formation: "Vる + くらいなら",
    examples: [
      "毎朝満員電車に乗るくらいなら、会社を辞めたい。(Nếu mỗi sáng phải đi xe điện chật cứng thì tôi thà nghỉ việc còn hơn.)",
      "途中でやめるくらいなら、初めからやらないほうがいい。(Nếu bỏ dở giữa chừng thì thà không làm từ đầu còn tốt hơn.)"
    ]
  },
  {
    id: "g13",
    pattern: "～に限る",
    meaning: "... là tốt nhất / tuyệt nhất",
    formation: "Vる / Vない / N + に限る",
    examples: [
      "疲れたときは、温泉に行くに限る。(Lúc mệt mỏi thì đi suối nước nóng là tuyệt nhất.)",
      "夏の飲み物はやっぱり麦茶に限る。(Đồ uống mùa hè thì quả nhiên trà lúa mạch là nhất.)"
    ]
  },

  // CHƯƠNG 4: ĐỐI LẬP, TRÁI NGƯỢC
  {
    id: "g14",
    pattern: "～に対して",
    meaning: "Trái ngược với / Đối với...",
    formation: "N + に対して / に対する\nThể thông thường (なAな/である・Nな/である) + の + に対して",
    examples: [
      "兄が活発な野に対して、弟はおとなしい。(Trái với người anh hoạt bát, người em lại trầm tính.)",
      "お客様に対して、失礼なことを言ってはいけない。(Không được nói những lời thất lễ đối với khách hàng.)"
    ]
  },
  {
    id: "g15",
    pattern: "～反面",
    meaning: "Mặt khác, ngược lại...",
    formation: "Thể thông thường (なAな/である・Nである) + 反面",
    examples: [
      "都会の生活は便利な反面、ストレスも多い。(Cuộc sống thành thị tiện lợi nhưng mặt khác cũng có nhiều căng thẳng.)",
      "この薬はよく効く反面、副作用がある。(Loại thuốc này có hiệu quả tốt nhưng mặt khác lại có tác dụng phụ.)"
    ]
  },
  {
    id: "g16",
    pattern: "～一方（で）",
    meaning: "Đồng thời, mặt khác...",
    formation: "Thể thông thường (なAな/である・Nである) + 一方で",
    examples: [
      "会議では自分の意見を言う一方で、ほかの人の話もよく聞いてください。(Trong cuộc họp, một mặt hãy nêu ý kiến của mình, mặt khác cũng hãy lắng nghe kỹ ý kiến của người khác.)",
      "子供が生まれてうれしい一方で、重い責任も感じる。(Một mặt thấy vui khi con ra đời, mặt khác cũng cảm thấy trách nhiệm nặng nề.)"
    ]
  },
  {
    id: "g17",
    pattern: "～というより",
    meaning: "Nói là... thì đúng hơn là...",
    formation: "V/A/N + というより",
    examples: [
      "あの学生はできないというより、やる気がないのだ。(Học sinh đó nói là không có hứng thú làm thì đúng hơn là không thể làm.)",
      "前の車は走っているというより、はっているようだ。(Chiếc xe phía trước nói là đang bò thì đúng hơn là đang chạy.)"
    ]
  },
  {
    id: "g18",
    pattern: "～かわりに",
    meaning: "Thay vì, đổi lại...",
    formation: "Vる/Vた / いAい / なAな / Nの + かわりに",
    examples: [
      "フリーの仕事は自由な時間が多いかわりに、お金のことがいつも心配だ。(Công việc tự do có nhiều thời gian rảnh rỗi, nhưng bù lại lúc nào cũng lo lắng về tiền bạc.)",
      "会長の代理として、私が会議に出席した。(Tôi đã tham dự cuộc họp với tư cách đại diện (thay thế) cho chủ tịch.)"
    ]
  },

  // CHƯƠNG 5: NGUYÊN NHÂN, LÝ DO
  {
    id: "g19",
    pattern: "～ためだ / ～ために",
    meaning: "Vì / Do... (Nguyên nhân khách quan)",
    formation: "Vる/Vた / いAい / なAな / Nの + ために",
    examples: [
      "雪が降ったために、電車が遅れました。(Do tuyết rơi nên xe điện bị trễ.)",
      "事故があったために、道が混んでいる。(Vì có tai nạn nên đường đang tắc.)"
    ]
  },
  {
    id: "g20",
    pattern: "～によって / ～による",
    meaning: "Vì / Do... (Dẫn đến kết quả)",
    formation: "N + によって / による",
    examples: [
      "不注意によって大事故が起こることもある。(Đôi khi tai nạn lớn xảy ra do sự bất cẩn.)",
      "地震による被害は大きかった。(Thiệt hại do trận động đất gây ra là rất lớn.)"
    ]
  },
  {
    id: "g21",
    pattern: "～から / ～ことから",
    meaning: "Bởi vì / Chính vì (Có căn cứ rõ ràng)...",
    formation: "Thể thông thường (なAな/である・Nである) + から / ことから",
    examples: [
      "顔がよく似ていることから、二人は親子だとすぐにわかった。(Chính vì khuôn mặt rất giống nhau nên tôi nhận ra ngay hai người là cha con.)",
      "わずかな誤解から、友達との関係が悪くなってしまった。(Chỉ vì một hiểu lầm nhỏ mà quan hệ với bạn bè trở nên tồi tệ.)"
    ]
  },
  {
    id: "g22",
    pattern: "～おかげだ / ～おかげで / ～せいだ / ～せいで",
    meaning: "Nhờ có... / Tại vì... (Mang lại kết quả tốt / xấu)",
    formation: "V/A/Nの + おかげで / せいで",
    examples: [
      "先生のおかげで、N3に合格できました。(Nhờ có thầy cô mà em đã đỗ N3.)",
      "バスが遅れたせいで、約束の時間に間に合わなかった。(Tại xe buýt đến muộn nên tôi không kịp giờ hẹn.)"
    ]
  },
  {
    id: "g23",
    pattern: "～のだから / ～んだから",
    meaning: "Vì... nên là chuyện đương nhiên",
    formation: "Thể thông thường (なAな/Nな) + のだから/んだから",
    examples: [
      "世界は広いのだから、いろいろな習慣があるのは当然だ。(Thế giới rộng lớn nên việc có nhiều phong tục khác nhau là điều đương nhiên.)",
      "あなたが悪いんだから、謝りなさい。(Vì lỗi là ở bạn nên hãy xin lỗi đi.)"
    ]
  },

  // CHƯƠNG 6: GIẢ ĐỊNH, ĐIỀU KIỆN
  {
    id: "g24",
    pattern: "～（の）なら",
    meaning: "Nếu mà (như thế)...",
    formation: "Thể thông thường / N + （の）なら",
    examples: [
      "その箱、もう使わないんですか。使わないなら、私にください。(Cái hộp đó không dùng nữa à? Nếu không dùng thì cho tôi nhé.)",
      "雨が降るのなら、出かけるのはやめよう。(Nếu trời mưa thì thôi không đi ra ngoài nữa.)"
    ]
  },
  {
    id: "g25",
    pattern: "～ては / ～（の）では",
    meaning: "Nếu / Giả sử... (Sẽ dẫn đến kết quả tiêu cực)",
    formation: "Vては / V/A/Nのでは",
    examples: [
      "こんなに雪が降っては、外に出られない。(Tuyết rơi nhiều thế này thì không thể ra ngoài được.)",
      "今から家を建てるのでは、今年中には完成しないだろう。(Nếu bây giờ mới xây nhà thì chắc trong năm nay sẽ không xong được.)"
    ]
  },
  {
    id: "g26",
    pattern: "～さえ～ば / ～さえ～なら",
    meaning: "Chỉ cần... là đủ",
    formation: "N + さえ + Vば/いAければ/なAなら/Nなら",
    examples: [
      "太郎は漫画さえ読んでいれば退屈しないようだ。(Tarou có vẻ chỉ cần đọc truyện tranh là không thấy chán.)",
      "体さえ丈夫なら、どんな苦労にも耐えられる。(Chỉ cần cơ thể khỏe mạnh thì gian khổ nào cũng chịu đựng được.)"
    ]
  },
  {
    id: "g27",
    pattern: "たとえ～ても / たとえ～でも",
    meaning: "Dù cho... đi nữa",
    formation: "たとえ + Vても / いAくても / なAでも / Nでも",
    examples: [
      "たとえ両親に反対されても、私は彼と結婚します。(Dù cho bị bố mẹ phản đối, tôi vẫn sẽ kết hôn với anh ấy.)",
      "たとえ雨でも、明日の試合は行われます。(Dù trời mưa đi nữa, trận đấu ngày mai vẫn sẽ diễn ra.)"
    ]
  },
  {
    id: "g28",
    pattern: "～ば / ～たら / ～なら",
    meaning: "Giá mà / Nếu mà (Sự việc không có thật)",
    formation: "Vば / Vたら / Vなら (Thể điều kiện giả định)",
    examples: [
      "お金とひまがあれば、私も海外旅行するんだけど…。(Giá mà có tiền và thời gian rảnh thì tôi cũng đi du lịch nước ngoài rồi...)",
      "もう少し背が高かったら、モデルになれたかもしれない。(Nếu cao thêm chút nữa thì có lẽ tôi đã trở thành người mẫu được.)"
    ]
  },

  // CHƯƠNG 7: CHỦ ĐỀ, NHẤN MẠNH
  {
    id: "g29",
    pattern: "～ということだ / ～とのことだ",
    meaning: "Nghe nói là... / Nghĩa là...",
    formation: "Thể thông thường + ということだ",
    examples: [
      "ニュースによると、今年は雨が多いということだ。(Theo tin tức, nghe nói năm nay mưa nhiều.)",
      "ご意見がないということは、賛成ということですね。(Việc không có ý kiến gì nghĩa là tán thành đúng không.)"
    ]
  },
  {
    id: "g30",
    pattern: "～と言われている",
    meaning: "Người ta nói rằng...",
    formation: "Thể thông thường + と言われている",
    examples: [
      "今年は黒い服が流行すると言われている。(Người ta nói rằng năm nay trang phục màu đen sẽ thịnh hành.)",
      "納豆は体にいいと言われている。(Người ta nói rằng Natto rất tốt cho cơ thể.)"
    ]
  },
  {
    id: "g31",
    pattern: "～とか",
    meaning: "Nghe đâu là / Thấy bảo là...",
    formation: "Thể thông thường + とか",
    examples: [
      "来月また出張だとか。今度はどちらですか。(Nghe đâu tháng sau lại đi công tác à. Lần này là ở đâu vậy?)",
      "あそこの店のパンはとてもおいしいとか。今日、買って帰ろう。(Thấy bảo bánh mì ở cửa hàng đằng kia ngon lắm. Hôm nay mua về thôi.)"
    ]
  },
  {
    id: "g32",
    pattern: "～って",
    meaning: "Nói là / Nghe nói là... (Dùng trong văn nói)",
    formation: "Thể thông thường + って",
    examples: [
      "小川さん、今日は休むって。(Anh Ogawa bảo là hôm nay nghỉ đấy.)",
      "佐藤さんの奥さんはお料理がとても上手だって。(Nghe nói vợ anh Satou nấu ăn rất giỏi đấy.)"
    ]
  },
  {
    id: "g33",
    pattern: "～という",
    meaning: "Nghe nói... (Văn viết trang trọng)",
    formation: "Thể thông thường + という",
    examples: [
      "この辺りは昔、広い野原だったという。(Nghe nói khu vực này ngày xưa là một cánh đồng rộng lớn.)",
      "この祭りには、毎年100万人の観光客が訪れるという。(Nghe nói lễ hội này mỗi năm có 1 triệu du khách đến thăm.)"
    ]
  },
  
  // CHƯƠNG 8: TÌNH TRẠNG, KHẢ NĂNG
  {
    id: "g34",
    pattern: "～はずがない / ～わけがない",
    meaning: "Chắc chắn không / Làm gì có chuyện...",
    formation: "V/A/N (thể bổ nghĩa cho N) + はずがない / わけがない",
    examples: [
      "ちゃんと約束したんだから、彼が来ないはずがない。(Đã hứa đàng hoàng rồi nên không có chuyện anh ấy không đến đâu.)",
      "あんな下手な絵が売れるわけがない。(Bức tranh tệ thế kia thì làm gì có chuyện bán được.)"
    ]
  },
  {
    id: "g35",
    pattern: "～とは限らない",
    meaning: "Không hẳn là / Chưa chắc đã...",
    formation: "Thể thông thường (なA/N giữ nguyên hoặc +だ) + とは限らない",
    examples: [
      "値段が高いものが必ずいいものだとは限らない。(Hàng đắt tiền không hẳn lúc nào cũng là hàng tốt.)",
      "日本語がわかる外国人が、日本の習慣もわかるとは限らない。(Người nước ngoài biết tiếng Nhật chưa chắc đã hiểu phong tục Nhật.)"
    ]
  },
  {
    id: "g36",
    pattern: "～わけではない / ～というわけではない / ～のではない",
    meaning: "Không có nghĩa là / Không hẳn là...",
    formation: "Thể thông thường (なAな/Nの) + わけではない",
    examples: [
      "長い間本をお借りしたままでしたが、忘れていたわけではありません。(Tôi mượn cuốn sách đã lâu nhưng không có nghĩa là tôi quên mất đâu.)",
      "お金があれば幸せだというわけではない。(Không hẳn là cứ có tiền là hạnh phúc.)"
    ]
  },
  {
    id: "g37",
    pattern: "～ないことはない",
    meaning: "Không phải là không...",
    formation: "Vない / いAくない / なAではない / Nではない + ことはない",
    examples: [
      "なっとうは、食べないことはないですが、あまり好きではありません。(Không phải là tôi không ăn được natto, chỉ là không thích lắm thôi.)",
      "無理をすれば買えないこともないが、今はやめておこう。(Nếu cố quá thì không phải là không mua được, nhưng bây giờ cứ từ từ đã.)"
    ]
  },
  {
    id: "g38",
    pattern: "～ことは～が、...",
    meaning: "Thì đúng là... nhưng...",
    formation: "V/A (thể thường) + ことは + V/A (cùng từ) + が",
    examples: [
      "この本は読んだことは読んだが、内容はあまり覚えていない。(Cuốn sách này đọc thì đúng là đọc rồi, nhưng nội dung thì không nhớ mấy.)",
      "彼からの手紙はうれしいことはうれしいが、ちょっと返事に困る。(Thư của anh ấy gửi đến vui thì vui thật, nhưng hơi khó để trả lời.)"
    ]
  },

  // CHƯƠNG 9: MỤC ĐÍCH, KHUYÊN BẢO
  {
    id: "g39",
    pattern: "～てもらう / ～ていただく",
    meaning: "Được ai đó làm giúp việc gì",
    formation: "Vて + もらう/いただく",
    examples: [
      "私は友達に引っ越しを手伝ってもらった。(Tôi được bạn bè giúp chuyển nhà.)",
      "先生に作文を直していただきました。(Tôi đã được giáo viên sửa bài văn giúp.)"
    ]
  },
  {
    id: "g40",
    pattern: "～てくれる / ～てくださる",
    meaning: "Ai đó làm giúp mình việc gì",
    formation: "Vて + くれる/くださる",
    examples: [
      "友達が引っ越しを手伝ってくれた。(Bạn bè đã giúp tôi chuyển nhà.)",
      "先生が作文を直してくださいました。(Giáo viên đã sửa bài văn giúp tôi.)"
    ]
  },
  {
    id: "g41",
    pattern: "～てあげる / ～てやる / ～てさしあげる",
    meaning: "Làm giúp ai đó việc gì",
    formation: "Vて + あげる/やる/さしあげる",
    examples: [
      "私は友達の引っ越しを手伝ってあげた。(Tôi đã giúp bạn bè chuyển nhà.)",
      "犬を散歩に連れて行ってやった。(Tôi đã dắt chó đi dạo.)"
    ]
  },
  {
    id: "g42",
    pattern: "～てもらえないか / ～ていただけないか / ～てくれないか / ～てくださらないか",
    meaning: "Bạn có thể làm... cho tôi được không?",
    formation: "Vて + もらえないか / いただけないか...",
    examples: [
      "すみませんが、この書類を見ていただけませんか。(Xin lỗi, anh xem giúp tôi tài liệu này được không?)",
      "ちょっと、そこのペン、取ってくれない？(Ê, lấy hộ tớ cái bút đằng kia được không?)"
    ]
  },
  {
    id: "g43",
    pattern: "～ように言う / 頼む / 注意する",
    meaning: "Nói / Nhờ / Nhắc nhở (ai đó làm gì)",
    formation: "Vる/Vない + ように + 言う/頼む/注意する",
    examples: [
      "先生に遅刻しないように注意された。(Tôi bị giáo viên nhắc nhở là không được đi muộn.)",
      "母に、帰りにスーパーで牛乳を買ってくるように頼まれた。(Tôi được mẹ nhờ là lúc về mua sữa ở siêu thị.)"
    ]
  },

  // CHƯƠNG 10: XU HƯỚNG, CẢM XÚC
  {
    id: "g44",
    pattern: "～ことだ",
    meaning: "Nên / Không nên... (Đưa ra lời khuyên)",
    formation: "Vる / Vない + ことだ",
    examples: [
      "ピアノが上手になりたかったら、毎日練習することだ。(Nếu muốn đánh piano giỏi thì nên luyện tập mỗi ngày.)",
      "無理をしないことだ。(Không nên cố quá.)"
    ]
  },
  {
    id: "g45",
    pattern: "～べきだ / ～べきではない",
    meaning: "Cần phải / Không được phép...",
    formation: "Vる + べきだ (する -> すべきだ)",
    examples: [
      "約束は守るべきだ。(Đã hứa thì phải giữ lời.)",
      "学生はもっと勉強すべきだ。(Học sinh cần phải học nhiều hơn nữa.)"
    ]
  },
  {
    id: "g46",
    pattern: "～たらどうか",
    meaning: "Thử... xem sao? (Khuyên nhủ nhẹ nhàng)",
    formation: "Vたら + どうか",
    examples: [
      "疲れているみたいですね。少し休んだらどうですか。(Có vẻ bạn đang mệt. Thử nghỉ ngơi một chút xem sao?)",
      "わからないなら、先生に聞いてみたらどう？(Nếu không hiểu thì thử hỏi giáo viên xem sao?)"
    ]
  },
  {
    id: "g47",
    pattern: "～に決まっている",
    meaning: "Chắc chắn là... / Nhất định là...",
    formation: "Thể thông thường (なA/N bỏ だ) + に決まっている",
    examples: [
      "あんなに練習したんだから、試合に勝つに決まっている。(Luyện tập nhiều thế kia thì chắc chắn sẽ thắng trận đấu thôi.)",
      "紙に書いても、どうせ忘れるに決まっている。(Dù có viết ra giấy thì đằng nào chắc chắn cũng quên thôi.)"
    ]
  },
  {
    id: "g48",
    pattern: "～に違いない",
    meaning: "Chắc hẳn là... (Phán đoán chắc chắn)",
    formation: "Thể thông thường (なA/N bỏ だ) + に違いない",
    examples: [
      "夜になっても電気がつかない。きっと出かけているに違いない。(Trời tối rồi mà không bật đèn. Chắc hẳn là đã ra ngoài rồi.)",
      "犯人はあいつに違いない。(Thủ phạm chắc hẳn là hắn ta.)"
    ]
  },
  {
    id: "g49",
    pattern: "～はずだ",
    meaning: "Chắc chắn là... / Thảo nào...",
    formation: "V/A/N (thể bổ nghĩa cho N) + はずだ",
    examples: [
      "田中さんは今旅行中だから、家にいないはずだ。(Anh Tanaka hiện đang đi du lịch nên chắc chắn không có ở nhà.)",
      "寒いはずだ。雪が降ってきた。(Thảo nào lạnh thế. Tuyết rơi rồi kìa.)"
    ]
  }
,\n  {
  "id": "g50",
  "pattern": "～てたまらない",
  "meaning": "Rất, không chịu nổi",
  "formation": "Vて / いAくて / なAで + たまらない",
  "examples": [
    "頭が痛くてたまらない。(Đau đầu không chịu nổi.)",
    "家族に会いたくてたまらない。(Nhớ gia đình không chịu nổi.)"
  ]
},\n  {
  "id": "g51",
  "pattern": "～てしょうがない / ～てしかたがない",
  "meaning": "Rất, vô cùng (đến mức không làm gì khác được)",
  "formation": "Vて / いAくて / なAで + しょうがない",
  "examples": [
    "今日は寒くてしょうがない。(Hôm nay lạnh không chịu nổi.)",
    "暇でしかたがない。(Rảnh rỗi kinh khủng.)"
  ]
},\n  {
  "id": "g52",
  "pattern": "～てならない",
  "meaning": "Rất, vô cùng (Tự nhiên cảm thấy thế)",
  "formation": "Vて / いAくて / なAで + ならない",
  "examples": [
    "将来のことが心配でならない。(Rất lo lắng về tương lai.)",
    "あの人のことが思い出されてならない。(Không thể nào không nhớ về người đó.)"
  ]
},\n  {
  "id": "g53",
  "pattern": "～ないではいられない / ～ずにはいられない",
  "meaning": "Không thể không... (Bộc phát tự nhiên)",
  "formation": "Vない + ではいられない / Vず（する→せず） + にはいられない",
  "examples": [
    "その話を聞いて、泣かないではいられなかった。(Nghe chuyện đó xong, tôi không thể không khóc.)",
    "彼にお礼を言わずにはいられません。(Tôi không thể không nói lời cảm ơn anh ấy.)"
  ]
},\n  {
  "id": "g54",
  "pattern": "～からいうと / ～からいえば / ～からいって",
  "meaning": "Xét từ mặt / Xét từ góc độ...",
  "formation": "N + からいうと",
  "examples": [
    "客の立場からいうと、この店はサービスが悪い。(Xét từ góc độ khách hàng, dịch vụ quán này tệ.)",
    "現在の実力からいって、彼が優勝するだろう。(Xét từ thực lực hiện tại, chắc anh ấy sẽ vô địch.)"
  ]
},\n  {
  "id": "g55",
  "pattern": "～から見ると / ～から見れば / ～から見て（も）",
  "meaning": "Nhìn từ góc độ của...",
  "formation": "N + から見ると",
  "examples": [
    "親から見れば、子供はいつまでも子供だ。(Nhìn từ góc độ cha mẹ, con cái lúc nào cũng là con nít.)",
    "日本の習慣は、外国人から見ると不思議なことが多い。(Phong tục Nhật Bản nhìn từ góc độ người nước ngoài có nhiều điều kỳ lạ.)"
  ]
},\n  {
  "id": "g56",
  "pattern": "～からして",
  "meaning": "Ngay từ... (đã thấy thế)",
  "formation": "N + からして",
  "examples": [
    "あの人は言葉づかいからして、ちょっと乱暴だ。(Người đó ngay từ cách dùng từ đã thấy hơi thô bạo.)",
    "タイトルからして、おもしろそうな本だ。(Ngay từ tiêu đề đã thấy đây là cuốn sách thú vị.)"
  ]
},\n  {
  "id": "g57",
  "pattern": "～にしては",
  "meaning": "Vậy mà... (Trái với dự đoán thông thường)",
  "formation": "V/A/N + にしては",
  "examples": [
    "彼は外国人にしては、日本語が上手だ。(Tuy là người nước ngoài nhưng anh ấy giỏi tiếng Nhật.)",
    "初めて作ったにしては、よくできましたね。(Tuy là lần đầu làm mà bạn làm tốt đấy.)"
  ]
},\n  {
  "id": "g58",
  "pattern": "～にしても",
  "meaning": "Ngay cả... cũng / Cho dù... thì cũng",
  "formation": "V/A/N + にしても",
  "examples": [
    "遅れるにしても、電話ぐらいすべきだ。(Cho dù có đến muộn thì ít nhất cũng nên gọi điện thoại.)",
    "冗談にしても、言っていいことと悪いことがある。(Dù là nói đùa thì cũng có cái nên nói cái không nên.)"
  ]
},\n  {
  "id": "g59",
  "pattern": "～げ",
  "meaning": "Có vẻ... (Nhìn từ bên ngoài)",
  "formation": "いA(bỏ い) / なA(bỏ な) + げ",
  "examples": [
    "彼は寂しげな顔をしている。(Anh ấy có khuôn mặt trông có vẻ buồn bã.)",
    "子供たちが楽しげに遊んでいる。(Bọn trẻ đang chơi đùa có vẻ rất vui.)"
  ]
},\n  {
  "id": "g60",
  "pattern": "～がち",
  "meaning": "Thường hay / Dễ bị... (Xu hướng xấu)",
  "formation": "Vます(bỏ ます) / N + がち",
  "examples": [
    "最近、彼は病気がちで、よく学校を休む。(Gần đây anh ấy hay bị ốm nên thường nghỉ học.)",
    "これは初心者にありがちな間違いだ。(Đây là lỗi thường thấy ở người mới bắt đầu.)"
  ]
},\n  {
  "id": "g61",
  "pattern": "～っぽい",
  "meaning": "Có vẻ / Hay... (Giống như tính chất)",
  "formation": "Vます(bỏ ます) / N / いA(bỏ い) + っぽい",
  "examples": [
    "年を取ると、忘れっぽくなる。(Khi có tuổi thì trở nên hay quên.)",
    "この牛乳は水っぽくておいしくない。(Sữa này loãng như nước, không ngon.)"
  ]
},\n  {
  "id": "g62",
  "pattern": "～気味（ぎみ）",
  "meaning": "Có cảm giác hơi / Có chiều hướng hơi...",
  "formation": "Vます(bỏ ます) / N + 気味",
  "examples": [
    "今日はちょっと風邪気味なので、早く帰ります。(Hôm nay tôi cảm thấy hơi cảm nên sẽ về sớm.)",
    "最近、少し太り気味です。(Gần đây tôi có chiều hướng hơi béo lên.)"
  ]
},\n  {
  "id": "g63",
  "pattern": "～だらけ",
  "meaning": "Đầy / Toàn là... (Nghĩa tiêu cực)",
  "formation": "N + だらけ",
  "examples": [
    "この部屋はごみだらけだ。(Căn phòng này đầy rác.)",
    "彼のテストの答えは間違いだらけだった。(Bài kiểm tra của cậu ấy toàn là lỗi sai.)"
  ]
},\n  {
  "id": "g64",
  "pattern": "～をはじめ（として）",
  "meaning": "Trước tiên là / Phải kể đến...",
  "formation": "N + をはじめ",
  "examples": [
    "校長先生をはじめ、先生方には大変お世話になりました。(Chúng em xin chân thành cảm ơn các thầy cô, trước tiên là thầy Hiệu trưởng.)",
    "日本には富士山をはじめ、美しい山がたくさんある。(Ở Nhật Bản có rất nhiều ngọn núi đẹp, phải kể đến đầu tiên là núi Phú Sĩ.)"
  ]
},\n  {
  "id": "g65",
  "pattern": "～からして",
  "meaning": "Ngay từ... đã",
  "formation": "N + からして",
  "examples": [
    "このレストランは雰囲気からして、高級そうだ。(Nhà hàng này ngay từ bầu không khí đã thấy có vẻ cao cấp rồi.)",
    "その言い方からして、彼は怒っているようだ。(Ngay từ cách nói đó đã thấy có vẻ anh ấy đang tức giận.)"
  ]
},\n  {
  "id": "g66",
  "pattern": "～にわたって / ～にわたり",
  "meaning": "Trải qua / Khắp... (Thời gian, không gian lớn)",
  "formation": "N + にわたって",
  "examples": [
    "会議は5時間にわたって行われた。(Cuộc họp đã diễn ra suốt 5 tiếng đồng hồ.)",
    "全国にわたって、台風の被害が出た。(Thiệt hại do bão đã xảy ra trên khắp cả nước.)"
  ]
},\n  {
  "id": "g67",
  "pattern": "～を通じて / ～を通して",
  "meaning": "Thông qua / Suốt... (Khoảng thời gian/phương tiện)",
  "formation": "N + を通じて / を通して",
  "examples": [
    "この町は一年を通じて暖かい。(Thị trấn này ấm áp suốt cả năm.)",
    "私は友人を通して、彼女と知り合った。(Tôi quen cô ấy thông qua một người bạn.)"
  ]
},\n  {
  "id": "g68",
  "pattern": "～に伴って / ～とともに",
  "meaning": "Cùng với / Kéo theo...",
  "formation": "Vる / N + に伴って / とともに",
  "examples": [
    "人口の増加に伴って、様々な問題が起きている。(Kéo theo sự gia tăng dân số, nhiều vấn đề đang nảy sinh.)",
    "経済が発展するとともに、環境破壊が進んだ。(Cùng với sự phát triển kinh tế, sự tàn phá môi trường cũng diễn ra.)"
  ]
},\n  {
  "id": "g69",
  "pattern": "～際（に） / ～際は",
  "meaning": "Khi / Lúc... (Trang trọng)",
  "formation": "Vる/Vた / Nの + 際（に）",
  "examples": [
    "帰国の際は、ぜひご連絡ください。(Khi nào về nước nhất định hãy liên lạc nhé.)",
    "カードを紛失した際には、すぐにお知らせください。(Trong trường hợp mất thẻ, xin hãy thông báo ngay lập tức.)"
  ]
},\n  {
  "id": "g70",
  "pattern": "～に際して / ～にあたって",
  "meaning": "Nhân dịp / Trước khi... (Trang trọng)",
  "formation": "Vる / N + に際して / にあたって",
  "examples": [
    "日本へ行くにあたって、日本の文化を勉強した。(Trước khi đi Nhật, tôi đã học về văn hóa Nhật Bản.)",
    "新店舗の開店に際して、ご挨拶申し上げます。(Nhân dịp khai trương cửa hàng mới, tôi xin gửi lời chào.)"
  ]
},\n  {
  "id": "g71",
  "pattern": "～たとたん（に）",
  "meaning": "Vừa mới... thì ngay lập tức...",
  "formation": "Vた + とたん",
  "examples": [
    "ドアを開けたとたん、猫が飛び出してきた。(Vừa mới mở cửa ra thì con mèo nhảy lao ra.)",
    "お酒を飲んだとたん、顔が赤くなった。(Vừa mới uống rượu xong mặt đã đỏ bừng.)"
  ]
},\n  {
  "id": "g72",
  "pattern": "～（か）と思うと / ～（か）と思ったら",
  "meaning": "Vừa mới... thì lập tức... (Bất ngờ)",
  "formation": "Vた + かと思うと",
  "examples": [
    "赤ちゃんは泣いたかと思うと、もう笑っている。(Em bé vừa mới khóc đó mà giờ đã cười rồi.)",
    "雨が降ってきたかと思ったら、すぐにやんだ。(Mưa vừa mới rơi xong thì đã tạnh ngay.)"
  ]
},\n  {
  "id": "g73",
  "pattern": "～か～ないかのうちに",
  "meaning": "Việc này chưa xong việc khác đã tới",
  "formation": "Vる/Vた + か + Vない + かのうちに",
  "examples": [
    "授業が終わるか終わらないかのうちに、彼は教室を飛び出した。(Lớp học vừa mới kết thúc (hay chưa kết thúc) thì cậu ấy đã phóng ra khỏi lớp.)",
    "ベッドに入るか入らないかのうちに、眠ってしまった。(Vừa mới chui vào chăn chưa kịp làm gì đã ngủ thiếp đi.)"
  ]
},\n  {
  "id": "g74",
  "pattern": "～最中だ / ～最中に",
  "meaning": "Đúng lúc đang (thì có việc chen ngang)",
  "formation": "Vている / Nの + 最中に",
  "examples": [
    "シャワーを浴びている最中に、電話がかかってきた。(Đúng lúc đang tắm vòi sen thì có điện thoại gọi đến.)",
    "会議の最中に停電した。(Đúng lúc đang họp thì mất điện.)"
  ]
},\n  {
  "id": "g75",
  "pattern": "～に限って",
  "meaning": "Đúng lúc... thì / Chỉ riêng...",
  "formation": "N + に限って",
  "examples": [
    "急いでいるときに限って、バスがなかなか来ない。(Đúng lúc đang vội thì xe buýt mãi không đến.)",
    "うちの子に限って、そんな悪いことをするはずがない。(Chỉ riêng con nhà tôi thì chắc chắn không bao giờ làm chuyện xấu như vậy.)"
  ]
},\n  {
  "id": "g76",
  "pattern": "～ばかりか / ～ばかりでなく",
  "meaning": "Không chỉ... mà còn...",
  "formation": "V/A/N (thể bổ nghĩa cho N) + ばかりか",
  "examples": [
    "彼は英語ばかりか、フランス語も話せる。(Anh ấy không chỉ nói được tiếng Anh mà còn nói được cả tiếng Pháp.)",
    "この薬は効かないばかりか、副作用もある。(Thuốc này không chỉ không có tác dụng mà còn có tác dụng phụ.)"
  ]
},\n  {
  "id": "g77",
  "pattern": "～のみならず",
  "meaning": "Không chỉ... mà còn (Trang trọng)",
  "formation": "V/A/N (thể bổ nghĩa cho N) + のみならず",
  "examples": [
    "この映画は日本のみならず、海外でも高く評価されている。(Bộ phim này không chỉ ở Nhật Bản mà còn được đánh giá cao ở nước ngoài.)",
    "彼の行動は自分のみならず、周囲の人にも迷惑をかけた。(Hành động của anh ta không chỉ gây phiền phức cho bản thân mà còn cho những người xung quanh.)"
  ]
},\n  {
  "id": "g78",
  "pattern": "～上に",
  "meaning": "Hơn nữa, thêm vào đó...",
  "formation": "V/A/N (thể bổ nghĩa cho N) + 上に",
  "examples": [
    "今日は寝坊した上に、財布も忘れてしまった。(Hôm nay không chỉ ngủ quên mà tôi còn quên cả ví.)",
    "彼女は頭がいい上に、性格もいい。(Cô ấy không chỉ thông minh mà tính tình còn rất tốt.)"
  ]
},\n  {
  "id": "g79",
  "pattern": "～上で",
  "meaning": "Sau khi... / Dựa trên...",
  "formation": "Vた / Nの + 上で",
  "examples": [
    "よく考えた上で、ご返事いたします。(Sau khi suy nghĩ kỹ, tôi sẽ trả lời lại.)",
    "家族と相談の上で、決めたいと思います。(Tôi muốn quyết định sau khi bàn bạc với gia đình.)"
  ]
},\n  {
  "id": "g80",
  "pattern": "～あげく（に）",
  "meaning": "Sau một thời gian dài... cuối cùng thì (Kết quả xấu)",
  "formation": "Vた / Nの + あげく",
  "examples": [
    "さんざん迷ったあげく、何も買わずに帰った。(Sau một hồi phân vân chán chê, cuối cùng tôi đi về mà chẳng mua gì.)",
    "彼らは口論のあげく、殴り合いのけんかになった。(Sau khi cãi vã, cuối cùng họ đã lao vào đánh nhau.)"
  ]
},\n  {
  "id": "g81",
  "pattern": "～末（に）",
  "meaning": "Sau một thời gian dài... cuối cùng thì (Kết quả tốt/xấu)",
  "formation": "Vた / Nの + 末（に）",
  "examples": [
    "長く苦しい練習の末に、ついに優勝することができた。(Sau một thời gian dài luyện tập khổ cực, cuối cùng cũng đã có thể vô địch.)",
    "悩んだ末の結論です。(Đây là kết luận sau một thời gian dài trăn trở.)"
  ]
},\n  {
  "id": "g82",
  "pattern": "～結果",
  "meaning": "Kết quả của việc...",
  "formation": "Vた / Nの + 結果",
  "examples": [
    "話し合いの結果、来月のイベントは中止することになった。(Kết quả của cuộc thảo luận là sự kiện tháng sau sẽ bị hủy.)",
    "努力した結果、合格できた。(Kết quả của sự nỗ lực là tôi đã thi đỗ.)"
  ]
},\n  {
  "id": "g83",
  "pattern": "～っぱなし",
  "meaning": "Cứ để nguyên như vậy / Suốt...",
  "formation": "Vます(bỏ ます) + っぱなし",
  "examples": [
    "テレビをつけっぱなしで寝てしまった。(Tôi cứ để TV bật nguyên như thế mà ngủ thiếp đi.)",
    "今日は朝から立ちっぱなしで、足が疲れた。(Hôm nay đứng suốt từ sáng nên chân mỏi nhừ.)"
  ]
},\n  {
  "id": "g84",
  "pattern": "～きり",
  "meaning": "Chỉ có / Kể từ khi...",
  "formation": "Vた/N + きり",
  "examples": [
    "彼とは三年前に会ったきり、連絡を取っていない。(Kể từ khi gặp anh ấy 3 năm trước, chúng tôi không liên lạc gì nữa.)",
    "二人きりでゆっくり話したい。(Tôi muốn được nói chuyện thong thả chỉ có hai người.)"
  ]
},\n  {
  "id": "g85",
  "pattern": "～くせに",
  "meaning": "Mặc dù... vậy mà (Trách móc, mỉa mai)",
  "formation": "V/A/N (thể bổ nghĩa cho N) + くせに",
  "examples": [
    "知っているくせに、教えてくれない。(Biết thế mà không chịu chỉ cho tôi.)",
    "男のくせに、よく泣く。(Là con trai vậy mà hay khóc nhè.)"
  ]
},\n  {
  "id": "g86",
  "pattern": "～わりに（は）",
  "meaning": "So với... thì... (Không tương xứng)",
  "formation": "V/A/N (thể bổ nghĩa cho N) + わりに",
  "examples": [
    "この料理は安いわりに、おいしい。(Món ăn này so với giá rẻ thì lại rất ngon.)",
    "彼はたくさん食べるわりに、太らない。(Anh ấy ăn nhiều vậy mà không hề béo.)"
  ]
},\n  {
  "id": "g87",
  "pattern": "～にかかわらず / ～に（は）かかわりなく",
  "meaning": "Bất kể... / Không liên quan đến...",
  "formation": "Vる/Vない/N + にかかわらず",
  "examples": [
    "天候にかかわらず、試合は行われます。(Bất kể thời tiết thế nào, trận đấu vẫn sẽ diễn ra.)",
    "年齢や性別にかかわらず、だれでも参加できます。(Bất kể tuổi tác hay giới tính, ai cũng có thể tham gia.)"
  ]
},\n  {
  "id": "g88",
  "pattern": "～にもかかわらず",
  "meaning": "Mặc dù... vậy mà (Ngạc nhiên)",
  "formation": "V/A/N (thể thông thường) + にもかかわらず",
  "examples": [
    "雨が降っているにもかかわらず、多くの人が集まった。(Mặc dù trời đang mưa vậy mà vẫn có rất đông người tụ tập.)",
    "彼は熱があるにもかかわらず、仕事に行った。(Mặc dù đang bị sốt nhưng anh ấy vẫn đi làm.)"
  ]
},\n  {
  "id": "g89",
  "pattern": "～を問わず",
  "meaning": "Bất kể... / Không đòi hỏi...",
  "formation": "N + を問わず",
  "examples": [
    "このマラソン大会は、年齢を問わず参加できます。(Giải marathon này ai cũng có thể tham gia bất kể tuổi tác.)",
    "経験の有無を問わず、社員を募集します。(Tuyển nhân viên bất kể có kinh nghiệm hay không.)"
  ]
},\n  {
  "id": "g90",
  "pattern": "～ことか",
  "meaning": "Biết bao / Thật là... (Cảm thán)",
  "formation": "Vた / いAい / なAな + ことか",
  "examples": [
    "合格したと知ったとき、どんなにうれしかったことか。(Lúc biết tin thi đỗ, tôi đã vui sướng biết bao.)",
    "彼を説得するのが、どんなに大変だったことか。(Việc thuyết phục anh ấy đã vất vả đến nhường nào.)"
  ]
},\n  {
  "id": "g91",
  "pattern": "～ばかりに",
  "meaning": "Chỉ vì... (Dẫn đến kết quả xấu)",
  "formation": "V/A/N (thể bổ nghĩa cho N) + ばかりに",
  "examples": [
    "お金がないばかりに、大学に進学できなかった。(Chỉ vì không có tiền mà tôi không thể học lên đại học.)",
    "少し油断したばかりに、事故を起こしてしまった。(Chỉ vì một chút lơ đễnh mà tôi đã gây ra tai nạn.)"
  ]
},\n  {
  "id": "g92",
  "pattern": "～たいばかりに",
  "meaning": "Chỉ vì muốn... mà (Cố gắng làm việc khó)",
  "formation": "Vたい + ばかりに",
  "examples": [
    "彼女に会いたいばかりに、何時間も待っていた。(Chỉ vì muốn gặp cô ấy mà tôi đã chờ đợi suốt mấy tiếng đồng hồ.)",
    "新しいスマホが欲しいばかりに、アルバイトを増やした。(Chỉ vì muốn có smartphone mới mà tôi đã nhận thêm việc làm thêm.)"
  ]
},\n  {
  "id": "g93",
  "pattern": "～どころか",
  "meaning": "Đừng nói đến... / Trái lại...",
  "formation": "V/A/N (thể thông thường) + どころか",
  "examples": [
    "彼はお金持ちどころか、借金がたくさんある。(Anh ta đừng nói đến chuyện giàu có, trái lại còn đang nợ nần chồng chất.)",
    "風邪は治るどころか、ひどくなる一方だ。(Cảm cúm đừng nói là khỏi, trái lại còn ngày càng nặng thêm.)"
  ]
},\n  {
  "id": "g94",
  "pattern": "～どころではない / ～どころじゃない",
  "meaning": "Không phải lúc để... / Không rảnh để...",
  "formation": "Vる / N + どころではない",
  "examples": [
    "忙しくて、映画を見るどころではない。(Đang bận tối mắt tối mũi, không phải lúc để xem phim đâu.)",
    "給料が下がって、旅行どころじゃない。(Lương bị giảm, không rảnh rang tiền bạc để đi du lịch đâu.)"
  ]
},\n  {
  "id": "g95",
  "pattern": "～だけあって",
  "meaning": "Quả đúng là... / Xứng đáng là...",
  "formation": "V/A/N (thể bổ nghĩa cho N) + だけあって",
  "examples": [
    "彼はスポーツ選手だけあって、体格がいい。(Anh ấy quả đúng là vận động viên thể thao, thể hình rất đẹp.)",
    "このケーキは高いだけあって、とてもおいしい。(Cái bánh này quả đúng là đắt tiền, rất là ngon.)"
  ]
},\n  {
  "id": "g96",
  "pattern": "～だけに",
  "meaning": "Chính vì... nên càng...",
  "formation": "V/A/N (thể bổ nghĩa cho N) + だけに",
  "examples": [
    "期待が大きかっただけに、失敗したときのショックも大きかった。(Chính vì kỳ vọng càng lớn nên khi thất bại cú sốc càng nặng nề.)",
    "明日は大切な試験だけに、今日は早く寝よう。(Chính vì ngày mai có bài thi quan trọng nên hôm nay hãy ngủ sớm.)"
  ]
},\n  {
  "id": "g97",
  "pattern": "～として",
  "meaning": "Với tư cách là / Nhờ danh nghĩa...",
  "formation": "N + として",
  "examples": [
    "彼は留学生として日本に来た。(Anh ấy đến Nhật Bản với tư cách là du học sinh.)",
    "この建物は、歴史的な価値があるものとして保存されている。(Tòa nhà này được bảo tồn với tư cách là một di sản có giá trị lịch sử.)"
  ]
},\n  {
  "id": "g98",
  "pattern": "～にとって",
  "meaning": "Đối với... (Đánh giá)",
  "formation": "N + にとって",
  "examples": [
    "私にとって、家族は一番大切なものです。(Đối với tôi, gia đình là điều quan trọng nhất.)",
    "この問題は子供にとって難しすぎる。(Bài toán này đối với trẻ con thì quá khó.)"
  ]
},\n  {
  "id": "g99",
  "pattern": "～について",
  "meaning": "Về việc... / Về vấn đề...",
  "formation": "N + について",
  "examples": [
    "日本の経済について研究しています。(Tôi đang nghiên cứu về nền kinh tế Nhật Bản.)",
    "その件については、後でお話しします。(Về vấn đề đó, tôi sẽ nói chuyện sau.)"
  ]
},\n  {
  "id": "g100",
  "pattern": "～から～にかけて",
  "meaning": "Từ... cho đến... (Đại khái)",
  "formation": "N1 から N2 にかけて",
  "examples": [
    "明日は関東から東北地方にかけて、大雨になるでしょう。(Ngày mai, từ khu vực Kanto cho đến Tohoku dự báo sẽ có mưa lớn.)",
    "2月から3月にかけて、花粉症の人が増える。(Từ tháng 2 đến tháng 3, số người bị dị ứng phấn hoa tăng lên.)"
  ]
},\n  {
  "id": "g101",
  "pattern": "～において / ～における",
  "meaning": "Tại / Trong / Ở... (Trang trọng)",
  "formation": "N + において",
  "examples": [
    "会議は第一会議室において行われます。(Cuộc họp sẽ được tiến hành tại phòng họp số 1.)",
    "教育における家庭の役割は大きい。(Vai trò của gia đình trong giáo dục là rất lớn.)"
  ]
},\n  {
  "id": "g102",
  "pattern": "～に応じて",
  "meaning": "Tương ứng với / Phù hợp với...",
  "formation": "N + に応じて",
  "examples": [
    "お客様のご要望に応じて、メニューを変更いたします。(Chúng tôi sẽ thay đổi thực đơn tùy theo yêu cầu của khách hàng.)",
    "体力に応じて、運動の量を調節してください。(Hãy điều chỉnh lượng vận động cho phù hợp với thể lực.)"
  ]
},\n  {
  "id": "g103",
  "pattern": "～に加えて",
  "meaning": "Thêm vào đó / Cùng với...",
  "formation": "N + に加えて",
  "examples": [
    "大風に加えて、雨も激しくなってきた。(Thêm vào việc gió to, mưa cũng bắt đầu trút xuống dữ dội.)",
    "英語に加えて、フランス語も勉強している。(Ngoài tiếng Anh ra, tôi còn đang học thêm tiếng Pháp.)"
  ]
},\n  {
  "id": "g104",
  "pattern": "～をめぐって",
  "meaning": "Xoay quanh (vấn đề gì đó)",
  "formation": "N + をめぐって",
  "examples": [
    "親の遺産をめぐって、兄弟が争っている。(Anh em đang tranh chấp xoay quanh vấn đề tài sản thừa kế của cha mẹ.)",
    "その計画をめぐって、活発な議論が行われた。(Một cuộc thảo luận sôi nổi đã diễn ra xoay quanh kế hoạch đó.)"
  ]
},\n  {
  "id": "g105",
  "pattern": "～をもとに（して）",
  "meaning": "Dựa trên (chất liệu, cơ sở)...",
  "formation": "N + をもとに",
  "examples": [
    "この小説は、実話をもとにして書かれた。(Cuốn tiểu thuyết này được viết dựa trên một câu chuyện có thật.)",
    "アンケートの結果をもとに、新しい商品を開発した。(Chúng tôi đã phát triển sản phẩm mới dựa trên kết quả khảo sát.)"
  ]
},\n  {
  "id": "g106",
  "pattern": "～に基づいて",
  "meaning": "Dựa trên (số liệu, pháp luật)...",
  "formation": "N + に基づいて",
  "examples": [
    "法律に基づいて、厳しく罰する。(Sẽ xử phạt nghiêm khắc dựa trên pháp luật.)",
    "この計画は、確かなデータに基づいている。(Kế hoạch này được lập dựa trên dữ liệu chuẩn xác.)"
  ]
},\n  {
  "id": "g107",
  "pattern": "～に沿って / ～にそって",
  "meaning": "Theo như / Dọc theo...",
  "formation": "N + に沿って",
  "examples": [
    "この川に沿って歩いていくと、駅に着きます。(Cứ đi bộ dọc theo con sông này là sẽ đến nhà ga.)",
    "お客様のご希望に沿って、プランを作成いたします。(Chúng tôi sẽ lên kế hoạch theo nguyện vọng của quý khách.)"
  ]
},\n  {
  "id": "g108",
  "pattern": "～のもとで / ～のもとに",
  "meaning": "Dưới sự (chỉ đạo, hướng dẫn)...",
  "formation": "N + のもとで",
  "examples": [
    "素晴らしい先生の指導のもとで、ピアノを練習した。(Tôi đã luyện tập piano dưới sự hướng dẫn của một người thầy tuyệt vời.)",
    "両親の温かい愛情のもとで育った。(Tôi lớn lên dưới tình yêu thương ấm áp của cha mẹ.)"
  ]
},\n  {
  "id": "g109",
  "pattern": "～に伴って / ～に伴い",
  "meaning": "Cùng với (sự thay đổi)...",
  "formation": "Vる / N + に伴って",
  "examples": [
    "地球温暖化に伴って、異常気象が増えている。(Cùng với sự nóng lên toàn cầu, thời tiết cực đoan đang tăng lên.)",
    "会社の移転に伴い、引っ越すことになった。(Cùng với việc di dời công ty, tôi cũng quyết định chuyển nhà.)"
  ]
},\n  {
  "id": "g110",
  "pattern": "～とともに",
  "meaning": "Cùng với / Đồng thời...",
  "formation": "Vる / N + とともに",
  "examples": [
    "年をとるとともに、記憶力が衰えてきた。(Cùng với tuổi tác, trí nhớ cũng bắt đầu suy giảm.)",
    "家族とともに、海外へ移住することになった。(Tôi sẽ chuyển ra nước ngoài sinh sống cùng với gia đình.)"
  ]
},\n  {
  "id": "g111",
  "pattern": "～だらけ",
  "meaning": "Đầy, toàn là (tiêu cực)",
  "formation": "N + だらけ",
  "examples": [
    "この服は泥だらけだ。(Bộ quần áo này đầy bùn đất.)",
    "間違いだらけの作文。(Một bài văn toàn là lỗi sai.)"
  ]
},\n  {
  "id": "g112",
  "pattern": "～っぽい",
  "meaning": "Có vẻ như, hay (quên, giận)",
  "formation": "Vます(bỏ ます) / N + っぽい",
  "examples": [
    "子供っぽい行動。(Hành động trẻ con.)",
    "忘れっぽくなる。(Trở nên hay quên.)"
  ]
},\n  {
  "id": "g113",
  "pattern": "～がち",
  "meaning": "Thường hay (xảy ra)",
  "formation": "Vます(bỏ ます) / N + がち",
  "examples": [
    "曇りがちの天気。(Thời tiết thường hay nhiều mây.)",
    "彼は最近、授業を休みがちだ。(Gần đây anh ấy hay nghỉ học.)"
  ]
},\n  {
  "id": "g114",
  "pattern": "～気味",
  "meaning": "Có cảm giác hơi...",
  "formation": "Vます(bỏ ます) / N + 気味",
  "examples": [
    "少し風邪気味だ。(Cảm thấy hơi cảm cúm.)",
    "最近太り気味です。(Gần đây có chiều hướng hơi béo lên.)"
  ]
},\n  {
  "id": "g115",
  "pattern": "～がたい",
  "meaning": "Khó (về mặt tâm lý)",
  "formation": "Vます(bỏ ます) + がたい",
  "examples": [
    "信じがたい話。(Một câu chuyện khó tin.)",
    "捨てがたい思い出。(Những kỷ niệm khó vứt bỏ.)"
  ]
},\n  {
  "id": "g116",
  "pattern": "～わけにはいかない",
  "meaning": "Không thể (vì lý do đạo đức, trách nhiệm)",
  "formation": "Vる + わけにはいかない",
  "examples": [
    "明日は大事なテストがあるので、休むわけにはいかない。(Ngày mai có bài kiểm tra quan trọng nên không thể nghỉ được.)",
    "社長の命令だから、断るわけにはいかない。(Vì là lệnh của giám đốc nên không thể từ chối được.)"
  ]
},\n  {
  "id": "g117",
  "pattern": "～ないわけにはいかない",
  "meaning": "Đành phải / Bắt buộc phải...",
  "formation": "Vない + わけにはいかない",
  "examples": [
    "友達の結婚式だから、行かないわけにはいかない。(Vì là đám cưới của bạn nên không thể không đi được.)",
    "親が倒れたので、帰国しないわけにはいかない。(Vì bố mẹ ngã bệnh nên tôi buộc phải về nước.)"
  ]
},\n  {
  "id": "g118",
  "pattern": "～かける / ～かけだ",
  "meaning": "Đang làm dở...",
  "formation": "Vます(bỏ ます) + かける",
  "examples": [
    "読みかけの本が机の上にある。(Cuốn sách đang đọc dở nằm trên bàn.)",
    "彼女は何か言いかけて、やめた。(Cô ấy dường như định nói gì đó rồi lại thôi.)"
  ]
},\n  {
  "id": "g119",
  "pattern": "～きる / ～きれる",
  "meaning": "Làm hết / Có thể làm hết...",
  "formation": "Vます(bỏ ます) + きる",
  "examples": [
    "こんなにたくさんの料理、一人では食べきれない。(Nhiều thức ăn thế này một mình không thể ăn hết được.)",
    "彼はマラソンを走りきった。(Anh ấy đã chạy hết quãng đường marathon.)"
  ]
},\n  {
  "id": "g120",
  "pattern": "～ぬく",
  "meaning": "Làm đến cùng (vượt qua khó khăn)",
  "formation": "Vます(bỏ ます) + ぬく",
  "examples": [
    "どんなに苦しくても、最後まで走りぬくつもりだ。(Dù có khổ cực đến đâu, tôi cũng định sẽ chạy đến cùng.)",
    "考えぬいた結果、会社を辞めることにした。(Sau khi suy nghĩ kỹ càng đến cùng, tôi đã quyết định nghỉ việc.)"
  ]
},\n  {
  "id": "g121",
  "pattern": "～ば～のに / ～たら～のに",
  "meaning": "Giá mà... thì đã... (Nuối tiếc)",
  "formation": "Vば / Vたら + のに",
  "examples": [
    "もっと早く出発すればよかったのに。(Giá mà xuất phát sớm hơn thì đã tốt rồi.)",
    "安かったら買ったのに。(Nếu rẻ thì tôi đã mua rồi.)"
  ]
},\n  {
  "id": "g122",
  "pattern": "～てほしい / ～てもらいたい",
  "meaning": "Muốn ai đó làm gì cho mình",
  "formation": "Vて + ほしい / もらいたい",
  "examples": [
    "あなたに教えてほしいことがあります。(Tôi có chuyện muốn bạn chỉ cho.)",
    "親にはいつまでも元気でいてもらいたい。(Tôi muốn bố mẹ luôn luôn khỏe mạnh.)"
  ]
},\n  {
  "id": "g123",
  "pattern": "～といい / ～ばいい / ～たらいい",
  "meaning": "Giá mà / Ước gì...",
  "formation": "Thể điều kiện + いい",
  "examples": [
    "明日、晴れるといいですね。(Ngày mai trời nắng thì tốt nhỉ.)",
    "もっとお金があればいいのに。(Giá mà có nhiều tiền hơn thì tốt biết mấy.)"
  ]
},\n  {
  "id": "g124",
  "pattern": "～てみせる",
  "meaning": "Cho xem (quyết tâm)",
  "formation": "Vて + みせる",
  "examples": [
    "今度の試験には、絶対に合格してみせる。(Kỳ thi lần này tôi nhất định sẽ thi đỗ cho mà xem.)",
    "必ず勝ってみせる。(Tôi nhất định sẽ thắng cho xem.)"
  ]
},\n  {
  "id": "g125",
  "pattern": "～をこめて",
  "meaning": "Gửi gắm (tình cảm, tâm tư)",
  "formation": "N + をこめて",
  "examples": [
    "愛をこめて、セーターを編んだ。(Tôi đã đan chiếc áo len gửi gắm tình yêu vào đó.)",
    "感謝の気持ちをこめて、歌を歌います。(Tôi xin hát một bài hát gửi gắm lòng biết ơn.)"
  ]
},\n  {
  "id": "g126",
  "pattern": "～わりに",
  "meaning": "Thế mà lại (Không ngờ tới)",
  "formation": "Thể bổ nghĩa danh từ + わりに",
  "examples": [
    "彼はたくさん食べるわりに、太らない。(Cậu ấy ăn nhiều thế mà lại không béo.)",
    "年のわりには若く見える。(Trông trẻ hơn so với tuổi.)"
  ]
},\n  {
  "id": "g127",
  "pattern": "～くせに",
  "meaning": "Mặc dù... (Ý chê bai)",
  "formation": "Thể bổ nghĩa danh từ + くせに",
  "examples": [
    "知っているくせに、教えてくれない。(Biết thế mà không chịu nói.)",
    "男のくせに、よく泣く。(Đàn ông gì mà hay khóc nhè.)"
  ]
},\n  {
  "id": "g128",
  "pattern": "～てみろ",
  "meaning": "Thử làm đi (Ra lệnh)",
  "formation": "Vて + みろ",
  "examples": [
    "文句があるなら、言ってみろ。(Có phàn nàn gì thì thử nói ra xem nào.)",
    "できるものなら、やってみろ。(Nếu làm được thì làm thử đi.)"
  ]
},\n  {
  "id": "g129",
  "pattern": "～からには",
  "meaning": "Một khi đã... thì phải...",
  "formation": "Vる/Vた + からには",
  "examples": [
    "約束したからには、守らなければならない。(Một khi đã hứa thì phải giữ lời.)",
    "日本に来たからには、日本語をマスターしたい。(Một khi đã đến Nhật thì tôi muốn thành thạo tiếng Nhật.)"
  ]
},\n  {
  "id": "g130",
  "pattern": "～以上は",
  "meaning": "Một khi đã... thì phải...",
  "formation": "Vる/Vた + 以上は",
  "examples": [
    "学生である以上は、勉強を第一に考えるべきだ。(Một khi đã là học sinh thì nên đặt việc học lên hàng đầu.)",
    "引き受けた以上は、最後まで責任を持ってやります。(Một khi đã nhận việc thì tôi sẽ làm có trách nhiệm đến cùng.)"
  ]
},\n  {
  "id": "g131",
  "pattern": "～上は",
  "meaning": "Một khi đã... thì phải...",
  "formation": "Vる/Vた + 上は",
  "examples": [
    "こうなった上は、最後まで戦うしかない。(Một khi đã ra nông nỗi này thì chỉ còn cách chiến đấu đến cùng.)",
    "契約を結んだ上は、条件を守ってください。(Một khi đã ký hợp đồng thì xin hãy tuân thủ điều kiện.)"
  ]
},\n  {
  "id": "g132",
  "pattern": "～ことだから",
  "meaning": "Vì là... (Nên chắc chắn sẽ)",
  "formation": "Nの + ことだから",
  "examples": [
    "まじめな彼のことだから、約束は守るでしょう。(Vì là người nghiêm túc như anh ấy nên chắc chắn sẽ giữ lời.)",
    "朝寝坊の彼女のことだから、今日も遅れるだろう。(Vì là người hay ngủ nướng như cô ấy nên hôm nay chắc lại đến muộn thôi.)"
  ]
},\n  {
  "id": "g133",
  "pattern": "～ことだ",
  "meaning": "Nên / Không nên (Khuyên bảo)",
  "formation": "Vる/Vない + ことだ",
  "examples": [
    "疲れたときは、早く寝ることだ。(Lúc mệt thì nên ngủ sớm.)",
    "無理をしないことだ。(Không nên quá sức.)"
  ]
},\n  {
  "id": "g134",
  "pattern": "～ことに",
  "meaning": "Thật là... (Cảm xúc)",
  "formation": "Vた/いAい/なAな + ことに",
  "examples": [
    "残念なことに、不合格だった。(Thật đáng tiếc, tôi đã thi trượt.)",
    "うれしいことに、スピーチ大会で優勝した。(Thật vui sướng, tôi đã vô địch cuộc thi hùng biện.)"
  ]
},\n  {
  "id": "g135",
  "pattern": "～ことなく",
  "meaning": "Mà không... (Giữ nguyên trạng thái)",
  "formation": "Vる + ことなく",
  "examples": [
    "彼は休むことなく、働き続けた。(Anh ấy tiếp tục làm việc mà không nghỉ ngơi.)",
    "雨はやむことなく、一日中降り続いた。(Mưa rơi rả rích cả ngày mà không hề tạnh.)"
  ]
},\n  {
  "id": "g136",
  "pattern": "～こと",
  "meaning": "Hãy... / Không được... (Chỉ thị, quy tắc)",
  "formation": "Vる/Vない + こと",
  "examples": [
    "明日は8時までに集合すること。(Ngày mai hãy tập trung trước 8 giờ.)",
    "レポートは期限までに提出すること。(Hãy nộp báo cáo đúng hạn.)"
  ]
},\n  {
  "id": "g137",
  "pattern": "～というものだ",
  "meaning": "Đó là... / Có nghĩa là...",
  "formation": "Thể thông thường + というものだ",
  "examples": [
    "人の話を聞かないのは、失礼というものだ。(Không nghe người khác nói chuyện thì đó là sự thất lễ.)",
    "若者がお年寄りに席を譲るのは、当然というものだ。(Việc thanh niên nhường ghế cho người già là điều đương nhiên.)"
  ]
},\n  {
  "id": "g138",
  "pattern": "～というものではない",
  "meaning": "Không hẳn là... / Đâu phải...",
  "formation": "Thể thông thường + というものではない",
  "examples": [
    "お金があれば幸せだというものではない。(Đâu phải cứ có tiền là hạnh phúc.)",
    "謝れば済むというものではない。(Đâu phải xin lỗi là xong chuyện.)"
  ]
},\n  {
  "id": "g139",
  "pattern": "～ものだ",
  "meaning": "Chân lý / Bản chất (Nhớ về quá khứ)",
  "formation": "V/A (thể thông thường) + ものだ",
  "examples": [
    "子供は外で遊ぶものだ。(Trẻ con thì bản chất là chơi ngoài trời.)",
    "学生時代はよく朝まで飲んだものだ。(Thời sinh viên tôi thường hay uống rượu tới sáng.)"
  ]
},\n  {
  "id": "g140",
  "pattern": "～ないものか",
  "meaning": "Không thể... sao? (Mong muốn mạnh mẽ)",
  "formation": "Vない + ものか",
  "examples": [
    "どうにかして、この病気を治せないものか。(Liệu có cách nào chữa khỏi căn bệnh này không nhỉ?)",
    "もう少し早く終わらないものか。(Không thể xong sớm hơn một chút được sao?)"
  ]
},\n  {
  "id": "g141",
  "pattern": "～ばかりに",
  "meaning": "Chỉ vì...",
  "formation": "V/A/N (thể bổ nghĩa) + ばかりに",
  "examples": [
    "本当のことを言ったばかりに、彼を怒らせてしまった。(Chỉ vì nói sự thật mà tôi đã làm anh ấy nổi giận.)",
    "お金がないばかりに、進学をあきらめた。(Chỉ vì không có tiền mà tôi từ bỏ việc học lên.)"
  ]
},\n  {
  "id": "g142",
  "pattern": "～たいばかりに",
  "meaning": "Chỉ vì muốn... mà",
  "formation": "Vたい + ばかりに",
  "examples": [
    "彼女に会いたいばかりに、雨の中を待っていた。(Chỉ vì muốn gặp cô ấy mà tôi đã chờ dưới trời mưa.)",
    "褒められたいばかりに、うそをついてしまった。(Chỉ vì muốn được khen mà tôi đã nói dối.)"
  ]
},\n  {
  "id": "g143",
  "pattern": "～ばかりか",
  "meaning": "Không chỉ... mà còn",
  "formation": "V/A/N (thể bổ nghĩa) + ばかりか",
  "examples": [
    "彼は英語ばかりか、フランス語も話せる。(Anh ấy không chỉ tiếng Anh mà còn nói được cả tiếng Pháp.)",
    "この薬は効かないばかりか、副作用もある。(Thuốc này không chỉ không có tác dụng mà còn có tác dụng phụ.)"
  ]
},\n  {
  "id": "g144",
  "pattern": "～ばかりだ",
  "meaning": "Ngày càng... (Chỉ xu hướng xấu)",
  "formation": "Vる + ばかりだ",
  "examples": [
    "おばあちゃんの病気は悪くなるばかりだ。(Bệnh của bà ngày càng trở nặng.)",
    "物価は上がるばかりだ。(Vật giá ngày càng tăng lên.)"
  ]
},\n  {
  "id": "g145",
  "pattern": "～たばかりだ",
  "meaning": "Vừa mới...",
  "formation": "Vた + ばかりだ",
  "examples": [
    "さっき起きたばかりです。(Tôi vừa mới ngủ dậy lúc nãy.)",
    "日本に来たばかりで、まだ言葉がわかりません。(Vì vừa mới đến Nhật nên tôi chưa hiểu ngôn ngữ.)"
  ]
},\n  {
  "id": "g146",
  "pattern": "～てばかりいる",
  "meaning": "Chỉ toàn làm... (Chê trách)",
  "formation": "Vて + ばかりいる",
  "examples": [
    "彼は遊んでばかりいる。(Anh ta chỉ toàn chơi bời.)",
    "甘いものばかり食べていると太りますよ。(Nếu chỉ toàn ăn đồ ngọt thì sẽ béo đấy.)"
  ]
},\n  {
  "id": "g147",
  "pattern": "～にかけては",
  "meaning": "Riêng về mặt... thì",
  "formation": "N + にかけては",
  "examples": [
    "数学にかけては、誰にも負けない自信がある。(Riêng về toán học, tôi tự tin không thua kém ai.)",
    "走ることにかけては、彼がクラスで一番だ。(Về việc chạy thì cậu ấy nhất lớp.)"
  ]
},\n  {
  "id": "g148",
  "pattern": "～にこたえて",
  "meaning": "Đáp ứng (kỳ vọng, yêu cầu)",
  "formation": "N + にこたえて",
  "examples": [
    "お客様の要望にこたえて、営業時間を延長した。(Đáp ứng yêu cầu của khách hàng, chúng tôi đã kéo dài thời gian kinh doanh.)",
    "ファンの期待にこたえるすばらしい試合だった。(Đó là một trận đấu tuyệt vời đáp ứng được kỳ vọng của người hâm mộ.)"
  ]
},\n  {
  "id": "g149",
  "pattern": "～にしては",
  "meaning": "So với... thì lại (Trái với dự đoán)",
  "formation": "V/A/N (thể thông thường) + にしては",
  "examples": [
    "外国人にしては、日本語が上手だ。(So với người nước ngoài thì tiếng Nhật của anh ấy giỏi thật.)",
    "初めて作ったにしては、おいしいですね。(Tuy là lần đầu làm mà ngon phết nhỉ.)"
  ]
},\n  {
  "id": "g150",
  "pattern": "～のもとで",
  "meaning": "Dưới sự (chỉ đạo, hướng dẫn)",
  "formation": "N + のもとで",
  "examples": [
    "先生のご指導のもとで、論文を書き上げました。(Dưới sự hướng dẫn của thầy, tôi đã viết xong luận văn.)",
    "厳しい両親のもとで育った。(Tôi lớn lên dưới sự nuôi dạy nghiêm khắc của cha mẹ.)"
  ]
},\n  {
  "id": "g151",
  "pattern": "～のもとに",
  "meaning": "Dưới danh nghĩa / Dựa trên điều kiện",
  "formation": "N + のもとに",
  "examples": [
    "平等という名のもとに、不平等な扱いが行われている。(Dưới danh nghĩa bình đẳng, những sự đối xử bất bình đẳng vẫn diễn ra.)",
    "合意のもとに、契約を解除した。(Đã hủy hợp đồng dựa trên sự đồng thuận.)"
  ]
},\n  {
  "id": "g152",
  "pattern": "～はともかく（として）",
  "meaning": "Khoan bàn đến... / Tạm gác lại...",
  "formation": "N + はともかく",
  "examples": [
    "顔はともかく、性格がいい人と結婚したい。(Khoan bàn đến nhan sắc, tôi muốn kết hôn với người có tính cách tốt.)",
    "値段はともかく、デザインが気に入った。(Khoan bàn đến giá cả, tôi rất ưng thiết kế này.)"
  ]
},\n  {
  "id": "g153",
  "pattern": "～も～ば～も",
  "meaning": "Đã... lại còn...",
  "formation": "N + も + Vば/いAければ + N + も",
  "examples": [
    "彼は勉強もできれば、スポーツもできる。(Anh ấy đã học giỏi lại còn chơi thể thao giỏi.)",
    "人生には楽しい時もあれば、つらい時もある。(Đời người có lúc vui thì cũng có lúc buồn.)"
  ]
},\n  {
  "id": "g154",
  "pattern": "～ぬきで / ～ぬきに",
  "meaning": "Bỏ qua / Không có...",
  "formation": "N + ぬきで",
  "examples": [
    "冗談ぬきで、真面目に話し合いましょう。(Bỏ qua trò đùa, chúng ta hãy thảo luận nghiêm túc nào.)",
    "わさびぬきでお寿司を握ってください。(Xin hãy làm sushi không có wasabi.)"
  ]
},\n  {
  "id": "g155",
  "pattern": "～てたまらない",
  "meaning": "Rất... không chịu nổi",
  "formation": "Vて/いAくて/なAで + たまらない",
  "examples": [
    "喉が渇いてたまらない。(Khát nước không chịu nổi.)",
    "試合の結果が気になってたまらない。(Tò mò về kết quả trận đấu không chịu nổi.)"
  ]
},\n  {
  "id": "g156",
  "pattern": "～てしょうがない / ～てしかたがない",
  "meaning": "Rất... vô cùng (Đến mức không làm gì khác được)",
  "formation": "Vて/いAくて/なAで + しょうがない",
  "examples": [
    "今日は寒くてしょうがない。(Hôm nay lạnh không chịu nổi.)",
    "暇でしかたがない。(Rảnh rỗi kinh khủng.)"
  ]
},\n  {
  "id": "g157",
  "pattern": "～てならない",
  "meaning": "Rất... vô cùng (Cảm xúc tự nhiên sinh ra)",
  "formation": "Vて/いAくて/なAで + ならない",
  "examples": [
    "将来のことが心配でならない。(Vô cùng lo lắng về tương lai.)",
    "あの時のことが思い出されてならない。(Không thể không nhớ về lúc đó.)"
  ]
},\n  {
  "id": "g158",
  "pattern": "～ないではいられない",
  "meaning": "Không thể không... (Bộc phát tự nhiên)",
  "formation": "Vない + ではいられない",
  "examples": [
    "その話を聞いて、泣かないではいられなかった。(Nghe chuyện đó xong không thể không khóc.)",
    "彼にお礼を言わないではいられません。(Tôi không thể không nói lời cảm ơn anh ấy.)"
  ]
},\n  {
  "id": "g159",
  "pattern": "～ずにはいられない",
  "meaning": "Không thể không... (Văn viết)",
  "formation": "Vず + にはいられない",
  "examples": [
    "この映画を見ると、感動せずにはいられない。(Xem bộ phim này không thể không cảm động.)",
    "事実を知って、怒らずにはいられなかった。(Biết được sự thật không thể không tức giận.)"
  ]
},\n  {
  "id": "g160",
  "pattern": "～ねばならない",
  "meaning": "Phải làm... (Nghĩa vụ, văn cứng)",
  "formation": "Vない(bỏ ない) + ねばならない (する->せねば)",
  "examples": [
    "明日までにこの仕事を終わらせねばならない。(Phải hoàn thành công việc này trước ngày mai.)",
    "法律は守らねばならない。(Pháp luật là phải tuân thủ.)"
  ]
},\n  {
  "id": "g161",
  "pattern": "～てはいられない",
  "meaning": "Không thể tiếp tục... (Vì quá gấp hoặc có lý do)",
  "formation": "Vて + はいられない",
  "examples": [
    "もうすぐ試験だから、遊んでなどいられない。(Sắp thi rồi nên không thể cứ chơi bời được.)",
    "忙しくて、テレビを見てはいられない。(Bận quá nên không thể cứ ngồi xem TV được.)"
  ]
},\n  {
  "id": "g162",
  "pattern": "～つつある",
  "meaning": "Đang dần dần... (Thay đổi)",
  "formation": "Vます(bỏ ます) + つつある",
  "examples": [
    "日本の人口は減りつつある。(Dân số Nhật Bản đang dần dần giảm đi.)",
    "景気は回復しつつある。(Nền kinh tế đang dần dần phục hồi.)"
  ]
},\n  {
  "id": "g163",
  "pattern": "～つつ",
  "meaning": "Vừa... vừa... (= ながら)",
  "formation": "Vます(bỏ ます) + つつ",
  "examples": [
    "お茶を飲みつつ、将来について語り合った。(Chúng tôi vừa uống trà vừa nói chuyện về tương lai.)",
    "悪いと知りつつ、うそをついてしまった。(Dù biết là xấu nhưng vẫn vừa nói dối.)"
  ]
},\n  {
  "id": "g164",
  "pattern": "～てはじめて",
  "meaning": "Cho đến khi... thì mới...",
  "formation": "Vて + はじめて",
  "examples": [
    "病気になってはじめて、健康のありがたさがわかった。(Đến khi bị bệnh mới hiểu được sự quý giá của sức khỏe.)",
    "親になってはじめて、親の苦労がわかった。(Đến khi làm cha mẹ mới hiểu được nỗi vất vả của cha mẹ.)"
  ]
},\n  {
  "id": "g165",
  "pattern": "～上（で）",
  "meaning": "Trên phương diện / Về mặt...",
  "formation": "Nの + 上（で） / N上",
  "examples": [
    "カレンダーの上ではもう春だ。(Về mặt lịch thì đã là mùa xuân rồi.)",
    "これは計算上の間違いです。(Đây là lỗi về mặt tính toán.)"
  ]
},\n  {
  "id": "g166",
  "pattern": "～次第",
  "meaning": "Ngay sau khi... thì sẽ...",
  "formation": "Vます(bỏ ます) + 次第",
  "examples": [
    "決まり次第、ご連絡いたします。(Ngay sau khi quyết định, chúng tôi sẽ liên lạc.)",
    "雨がやみ次第、出発しましょう。(Ngay sau khi tạnh mưa, chúng ta hãy xuất phát.)"
  ]
},\n  {
  "id": "g167",
  "pattern": "～て以来",
  "meaning": "Kể từ sau khi...",
  "formation": "Vて + 以来",
  "examples": [
    "日本に来て以来、毎日日本語を勉強している。(Kể từ sau khi đến Nhật, ngày nào tôi cũng học tiếng Nhật.)",
    "彼とは卒業して以来、一度も会っていない。(Kể từ khi tốt nghiệp, tôi chưa gặp lại cậu ấy lần nào.)"
  ]
},\n  {
  "id": "g168",
  "pattern": "～てからでないと",
  "meaning": "Nếu chưa... thì không thể...",
  "formation": "Vて + からでないと",
  "examples": [
    "親に相談してからでないと、決められない。(Nếu chưa bàn bạc với bố mẹ thì không thể quyết định được.)",
    "手を洗ってからでないと、食べてはいけません。(Nếu chưa rửa tay thì không được ăn.)"
  ]
},\n  {
  "id": "g169",
  "pattern": "～をはじめ（として）",
  "meaning": "Trước tiên là / Tiêu biểu là...",
  "formation": "N + をはじめ",
  "examples": [
    "日本には富士山をはじめ、美しい山がたくさんある。(Ở Nhật có rất nhiều ngọn núi đẹp, tiêu biểu là núi Phú Sĩ.)",
    "校長先生をはじめ、先生方には大変お世話になりました。(Chúng em xin chân thành cảm ơn các thầy cô, tiêu biểu là thầy hiệu trưởng.)"
  ]
},\n  {
  "id": "g170",
  "pattern": "～からして",
  "meaning": "Ngay từ...",
  "formation": "N + からして",
  "examples": [
    "あのレストランは雰囲気からして高級そうだ。(Nhà hàng kia ngay từ bầu không khí đã thấy có vẻ cao cấp rồi.)",
    "その言い方からして、彼は怒っているようだ。(Ngay từ cách nói đó đã thấy anh ấy đang tức giận.)"
  ]
},\n  {
  "id": "g171",
  "pattern": "～にわたって",
  "meaning": "Trải qua / Trong suốt...",
  "formation": "N + にわたって",
  "examples": [
    "会議は5時間にわたって行われた。(Cuộc họp đã diễn ra trong suốt 5 tiếng đồng hồ.)",
    "全国にわたって台風の被害が出た。(Thiệt hại do bão đã trải rộng trên toàn quốc.)"
  ]
},\n  {
  "id": "g172",
  "pattern": "～を通じて / ～を通して",
  "meaning": "Thông qua / Trong suốt...",
  "formation": "N + を通じて/を通して",
  "examples": [
    "この町は一年を通じて暖かい。(Thị trấn này ấm áp trong suốt cả năm.)",
    "社長を通して、意見を伝えた。(Tôi đã truyền đạt ý kiến thông qua giám đốc.)"
  ]
},\n  {
  "id": "g173",
  "pattern": "～だけ",
  "meaning": "Đến mức tối đa có thể",
  "formation": "Vる + だけ",
  "examples": [
    "食べられるだけ食べてください。(Hãy ăn nhiều nhất có thể đi.)",
    "やれるだけのことはやった。(Tôi đã làm tất cả những gì có thể làm rồi.)"
  ]
},\n  {
  "id": "g174",
  "pattern": "～に限り",
  "meaning": "Chỉ dành cho / Chỉ giới hạn ở...",
  "formation": "N + に限り",
  "examples": [
    "本日ご来店のお客様に限り、20％割引いたします。(Chỉ giảm giá 20% giới hạn cho khách hàng đến quán hôm nay.)",
    "雨天の日に限り、ポイントが2倍になります。(Chỉ vào những ngày trời mưa, điểm tích lũy sẽ được nhân đôi.)"
  ]
},\n  {
  "id": "g175",
  "pattern": "～ざるを得ない",
  "meaning": "Đành phải / Buộc phải...",
  "formation": "Vない(bỏ ない) + ざるを得ない (する->せざるを得ない)",
  "examples": [
    "熱が39度もあるなら、仕事を休まざるを得ない。(Sốt đến 39 độ thì đành phải nghỉ làm thôi.)",
    "こんなに雨が降っていては、試合を中止せざるを得ない。(Mưa to thế này thì đành phải hủy trận đấu thôi.)"
  ]
},\n  {
  "id": "g176",
  "pattern": "～がたい",
  "meaning": "Khó (làm gì đó)",
  "formation": "Vます(bỏ ます) + がたい",
  "examples": [
    "彼がそんな悪いことをしたとは、信じがたい。(Việc anh ta làm điều xấu như thế thật khó tin.)",
    "これは捨てがたい思い出だ。(Đây là một kỷ niệm khó vứt bỏ.)"
  ]
},\n  {
  "id": "g177",
  "pattern": "～かねる",
  "meaning": "Không thể / Khó lòng (từ chối khéo)",
  "formation": "Vます(bỏ ます) + かねる",
  "examples": [
    "そのご要望にはお応えしかねます。(Chúng tôi khó lòng đáp ứng được yêu cầu đó.)",
    "私にはわかりかねますので、担当者に代わります。(Vì tôi không thể biết được nên xin chuyển máy cho người phụ trách.)"
  ]
},\n  {
  "id": "g178",
  "pattern": "～かねない",
  "meaning": "Có khả năng (xảy ra điều xấu)",
  "formation": "Vます(bỏ ます) + かねない",
  "examples": [
    "あんなにスピードを出したら、事故を起こしかねない。(Chạy tốc độ cao thế kia thì có khả năng gây tai nạn mất.)",
    "休まずに働いたら、病気になりかねない。(Nếu cứ làm việc không nghỉ ngơi thì có khả năng đổ bệnh mất.)"
  ]
},\n  {
  "id": "g179",
  "pattern": "～おそれがある",
  "meaning": "Có nguy cơ / E rằng...",
  "formation": "Vる/Nの + おそれがある",
  "examples": [
    "この地震による津波のおそれがあります。(Có nguy cơ xảy ra sóng thần do trận động đất này.)",
    "台風で橋が壊れるおそれがある。(Có nguy cơ bão sẽ làm sập cầu.)"
  ]
},\n  {
  "id": "g180",
  "pattern": "～まい / ～まいか",
  "meaning": "Sẽ không / Tuyệt đối không...",
  "formation": "Vる + まい / Vます(bỏ ます) + まい",
  "examples": [
    "あんなまずい店には二度と行くまい。(Một cái quán dở tệ như vậy, tôi sẽ tuyệt đối không đến lần thứ hai.)",
    "あの人は本当のことを言うまい。(Người đó chắc sẽ không nói sự thật đâu.)"
  ]
},\n  {
  "id": "g181",
  "pattern": "～に決まっている",
  "meaning": "Chắc chắn là...",
  "formation": "V/A/N(thể thông thường) + に決まっている",
  "examples": [
    "あんなに練習したんだから、勝つに決まっている。(Luyện tập nhiều thế kia thì chắc chắn sẽ thắng thôi.)",
    "この仕事は私には無理に決まっている。(Công việc này chắc chắn là quá sức đối với tôi.)"
  ]
},\n  {
  "id": "g182",
  "pattern": "～に違いない",
  "meaning": "Chắc hẳn là... / Không sai được",
  "formation": "V/A/N(thể thông thường) + に違いない",
  "examples": [
    "彼はいつも遅刻するから、今日も遅れるに違いない。(Cậu ấy lúc nào cũng đến muộn nên hôm nay chắc hẳn cũng sẽ đến muộn thôi.)",
    "犯人は彼に違いない。(Thủ phạm chắc chắn là hắn.)"
  ]
}\n];

const fileContent = `export const GRAMMAR = ${JSON.stringify(grammarData, null, 2)};\nexport default GRAMMAR;\n`;
fs.writeFileSync('src/data/grammar.js', fileContent);
console.log('Successfully generated grammar.js with N3 Grammar data!');

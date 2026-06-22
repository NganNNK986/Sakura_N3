// Liên từ (Từ nối) - Connectives in Japanese
// Used to connect sentences and clarify relationships between ideas

export const CONNECTIVES = [
  // Category 1: Adding Information (Thêm thông tin)
  {
    id: "c01",
    pattern: "および",
    category: "Thêm thông tin",
    meaning: "Và, cùng với",
    usage: "Dùng để kết nối danh sách hoặc thêm thông tin",
    formation: "N + および + N",
    examples: [
      "社長および副社長が出席します。(Chủ tịch và phó chủ tịch sẽ dự hội.",
      "スポーツおよび文化活動を支援しています。(Hỗ trợ các hoạt động thể thao và văn hóa.)",
    ],
  },
  {
    id: "c02",
    pattern: "おまけに",
    category: "Thêm thông tin",
    meaning: "Hơn nữa, vả lại, ngoài ra",
    usage: "Thêm một thông tin bổ sung, thường là tiêu cực",
    formation: "Câu + おまけに + Câu",
    examples: [
      "雨に降られた。おまけに、傘も忘れてしまった。(Bị mưa ướt. Hơn nữa, còn quên mang ô.)",
      "仕事が忙しい。おまけに、家族の問題もある。(Công việc bận rộn. Ngoài ra còn có vấn đề gia đình.)",
    ],
  },
  {
    id: "c03",
    pattern: "さらに",
    category: "Thêm thông tin",
    meaning: "Hơn nữa, vả lại, ngoài ra",
    usage: "Thêm thông tin phụ, mở rộng ý tưởng",
    formation: "Câu + さらに + Câu",
    examples: [
      "このレストランは安い。さらに、美味しいです。(Nhà hàng này rẻ. Hơn nữa, rất ngon.)",
      "去年の売上が増加した。さらに今年も好調だ。(Doanh số năm ngoái tăng. Ngoài ra năm nay cũng tốt.)",
    ],
  },
  {
    id: "c04",
    pattern: "それに",
    category: "Thêm thông tin",
    meaning: "Bên cạnh đó, hơn thế nữa",
    usage: "Thêm thông tin hoặc lý do bổ sung",
    formation: "Câu + それに + Câu",
    examples: [
      "彼は頭がいい。それに、性格もいい。(Anh ấy thông minh. Bên cạnh đó, tính cách cũng tốt.)",
      "給料が上がった。それに、賞与ももらった。(Lương tăng. Thêm vào đó, còn được thưởng.)",
    ],
  },
  {
    id: "c05",
    pattern: "しかも",
    category: "Thêm thông tin",
    meaning: "Hơn nữa, mà lại",
    usage: "Nhấn mạnh thêm một sự kiện bất ngờ hoặc đáng chú ý",
    formation: "Câu + しかも + Câu",
    examples: [
      "今年の冬は寒い。しかも、雪も多い。(Mùa đông năm nay rất lạnh. Mà lại, tuyết cũng nhiều.)",
      "田中さんは日本語ができる。しかも、英語もできる。(Tanaka có thể nói tiếng Nhật. Mà lại, tiếng Anh cũng được.)",
    ],
  },
  {
    id: "c06",
    pattern: "また",
    category: "Thêm thông tin",
    meaning: "Lại còn, hơn nữa, ngoài ra",
    usage: "Thêm một thông tin, hành động hoặc lý do khác",
    formation: "Câu + また + Câu",
    examples: [
      "この公園は広い。また、自然も多い。(Công viên này rộng. Lại còn thiên nhiên cũng nhiều.)",
      "りんごは甘い。また、栄養も豊富だ。(Táo ngon. Ngoài ra, dinh dưỡng cũng dồi dào.)",
    ],
  },

  // Category 2: Selection/Choice (Lựa chọn)
  {
    id: "c07",
    pattern: "あるいは",
    category: "Lựa chọn",
    meaning: "Hoặc, hay là",
    usage: "Đưa ra lựa chọn thay thế",
    formation: "N + あるいは + N",
    examples: [
      "明日、あるいは明後日に来てください。(Hãy đến vào ngày mai, hoặc ngày kia.)",
      "コーヒーあるいは紅茶をお飲みになりますか。(Bạn muốn uống cà phê hay trà?)",
    ],
  },
  {
    id: "c08",
    pattern: "または",
    category: "Lựa chọn",
    meaning: "Hoặc, hay là",
    usage: "Chính thức hơn あるいは, thường dùng trong văn bản chính thức",
    formation: "N + または + N",
    examples: [
      "メールまたはお電話でお申し込みください。(Vui lòng đăng ký qua email hoặc điện thoại.)",
      "お支払いは現金または銀行振込でお願いします。(Thanh toán bằng tiền mặt hoặc chuyển khoản ngân hàng.)",
    ],
  },
  {
    id: "c09",
    pattern: "それとも",
    category: "Lựa chọn",
    meaning: "Hay, hoặc là",
    usage: "Đưa ra lựa chọn trong câu hỏi",
    formation: "Câu 1 + それとも + Câu 2?",
    examples: [
      "肉が好きですか。それとも魚が好きですか。(Bạn thích thịt hay cá?)",
      "今週行きますか。それとも来週に行きますか。(Bạn đi tuần này hay tuần tới?)",
    ],
  },

  // Category 3: Explanation (Giải thích)
  {
    id: "c10",
    pattern: "つまり",
    category: "Giải thích",
    meaning: "Tóm lại, tức là, cũng chính là",
    usage: "Giải thích hay tóm tắt lại ý trước đó",
    formation: "Câu + つまり + Câu (giải thích)",
    examples: [
      "彼は毎日運動します。つまり、健康を大切にしています。(Anh ấy tập thể dục mỗi ngày. Tóm lại, anh ta coi trọng sức khỏe.)",
      "この製品は環境に優しい。つまり、長く使える。(Sản phẩm này thân thiện với môi trường. Tức là, có thể dùng lâu.)",
    ],
  },
  {
    id: "c11",
    pattern: "すなわち",
    category: "Giải thích",
    meaning: "Tức là, cũng chính là, cụ thể là",
    usage: "Giải thích chi tiết hơn, thường trong văn bản chính thức",
    formation: "Câu + すなわち + Câu (giải thích)",
    examples: [
      "弊社の売上は1000万円増加した。すなわち、去年より20%増えたことになる。(Doanh số của công ty tăng 10 triệu yên. Tức là, tăng 20% so với năm ngoái.)",
      "私たちの目標は顧客満足である。すなわち、品質とサービスを向上させることだ。(Mục tiêu của chúng tôi là sự hài lòng khách hàng. Cụ thể là nâng cao chất lượng và dịch vụ.)",
    ],
  },
  {
    id: "c12",
    pattern: "なぜなら(ば)",
    category: "Giải thích",
    meaning: "Bởi vì, vì thế là",
    usage: "Giải thích lý do cho câu trước",
    formation: "Câu + なぜなら(ば) + Câu (lý do)",
    examples: [
      "野菜をたくさん食べるべきだ。なぜなら、栄養が必要だからだ。(Nên ăn nhiều rau. Bởi vì cần dinh dưỡng.)",
      "日本語を勉強しています。なぜなら、日本の文化に興味があるからです。(Tôi đang học tiếng Nhật. Vì tôi quan tâm đến văn hóa Nhật Bản.)",
    ],
  },

  // Category 4: Topic Transition (Chuyển đổi chủ đề)
  {
    id: "c13",
    pattern: "ところで",
    category: "Chuyển đổi chủ đề",
    meaning: "Nhân tiện, mà nói đến đó, có điều là",
    usage: "Chuyển sang chủ đề mới hoặc hỏi một điều liên quan",
    formation: "Câu (kết thúc) + ところで + Câu (chủ đề mới)",
    examples: [
      "もうすぐ卒業ですね。ところで、就職はどうですか。(Bạn sắp tốt nghiệp rồi nhỉ? Nhân tiện, xin việc thế nào rồi?)",
      "去年のプロジェクトは成功しました。ところで、今年のプロジェクトの進み具合はいかがですか。(Dự án năm ngoái thành công. Mà nói đến đó, tiến độ dự án năm nay thế nào?)",
    ],
  },
  {
    id: "c14",
    pattern: "さて",
    category: "Chuyển đổi chủ đề",
    meaning: "Nào, và bây giờ, vậy thì",
    usage: "Chuyển sang chủ đề mới hoặc tóm tắt",
    formation: "Câu (kết thúc) + さて + Câu (chủ đề mới)",
    examples: [
      "それまでの説明で十分ご理解いただけたと思います。さて、次に具体的な例を見てみましょう。(Tôi tin rằng các bạn đã hiểu rõ từ phần giải thích trên. Nào, bây giờ hãy xem ví dụ cụ thể.)",
      "午前の会議は終わりました。さて、昼食をしましょう。(Hội họp sáng kết thúc rồi. Vậy thì hãy ăn trưa.)",
    ],
  },
  {
    id: "c15",
    pattern: "では",
    category: "Chuyển đổi chủ đề",
    meaning: "Vậy thì, thế là",
    usage: "Bắt đầu hay chuyển sang phần tiếp theo",
    formation: "では + Câu (hành động tiếp theo)",
    examples: [
      "それでは、質問を受け付けます。(Vậy thì, hãy đặt câu hỏi.)",
      "では、明日の打ち合わせの時間を決めましょう。(Thế là, hãy xác định thời gian họp ngày mai.)",
    ],
  },

  // Category 5: Consequence/Condition (Hệ quả/Điều kiện)
  // 5a: Forward relationship (Thuận)
  {
    id: "c16",
    pattern: "したがって",
    category: "Hệ quả (Thuận)",
    meaning: "Vì vậy, do đó, sở dĩ",
    usage: "Kết nối với hệ quả logic từ câu trước",
    formation: "Câu (nguyên nhân) + したがって + Câu (hệ quả)",
    examples: [
      "売上が20%増加した。したがって、利益も増えた。(Doanh số tăng 20%. Vì vậy, lợi nhuận cũng tăng.)",
      "試験に合格しました。したがって、来月から新しい職位で働きます。(Tôi đã vượt qua kỳ thi. Do đó, từ tháng tới tôi sẽ làm việc ở vị trí mới.)",
    ],
  },
  {
    id: "c17",
    pattern: "そこで",
    category: "Hệ quả (Thuận)",
    meaning: "Vì vậy, do đó, vậy nên",
    usage: "Chỉ một hành động hoặc quyết định được thực hiện dựa trên tình huống trước",
    formation: "Câu (tình huống) + そこで + Câu (hành động)",
    examples: [
      "オフィスの近くに公園があります。そこで、昼休みには散歩します。(Gần văn phòng có một công viên. Vì vậy, tôi đi dạo trong giờ nghỉ trưa.)",
      "大雨が降ってきた。そこで、試合は延期することになった。(Mưa to buổi sáng. Do đó, trận đấu đã được hoãn lại.)",
    ],
  },
  {
    id: "c18",
    pattern: "すると",
    category: "Hệ quả (Thuận)",
    meaning: "Do đó, lập tức thì, kế đó",
    usage: "Diễn tả một kết quả xảy ra nhanh chóng sau hành động trước",
    formation: "Câu + すると + Câu (kết quả)",
    examples: [
      "私が部屋に入ると、猫がいた。(Khi tôi bước vào phòng, có một con mèo. / Lập tức thì tôi thấy có con mèo.)",
      "ボタンを押すと、ドアが開いた。(Khi tôi nhấn nút, cửa mở ra. / Lập tức cửa mở ra.)",
    ],
  },
  {
    id: "c19",
    pattern: "それで",
    category: "Hệ quả (Thuận)",
    meaning: "Vì vậy, cho nên, do đó",
    usage: "Chỉ ra kết quả hoặc lý do của hành động",
    formation: "Câu + それで + Câu (hệ quả)",
    examples: [
      "雨が降っています。それで、試合が中止になった。(Trời mưa. Vì vậy, trận đấu bị hủy.)",
      "昨日は早く寝た。それで、今日は元気です。(Tôi ngủ sớm hôm qua. Do đó, hôm nay tôi khỏe.)",
    ],
  },
  {
    id: "c20",
    pattern: "ですから",
    category: "Hệ quả (Thuận)",
    meaning: "Vì vậy, thế nên, do đó",
    usage: "Diễn tả kết luận hoặc lời khuyên dựa trên thông tin trước",
    formation: "Câu + ですから + Câu (kết luận)",
    examples: [
      "このプロジェクトは非常に重要です。ですから、細心の注意が必要です。(Dự án này rất quan trọng. Vì vậy, cần sự chú ý cẩn thận.)",
      "毎日学習することは大切です。ですから、習慣をつけましょう。(Học tập mỗi ngày rất quan trọng. Thế nên, hãy tạo thói quen.)",
    ],
  },

  // 5b: Reverse relationship (Nghịch)
  {
    id: "c21",
    pattern: "しかし",
    category: "Hệ quả (Nghịch)",
    meaning: "Nhưng, tuy nhiên",
    usage: "Chỉ ra sự trái ngược hoặc ngoại lệ",
    formation: "Câu A + しかし + Câu B (trái ngược)",
    examples: [
      "今日は日曜日だ。しかし、仕事がある。(Hôm nay là Chủ nhật. Nhưng tôi có công việc.)",
      "このレストランは有名です。しかし、料金が高い。(Nhà hàng này nổi tiếng. Nhưng giá cả cao.)",
    ],
  },
  {
    id: "c22",
    pattern: "けれども",
    category: "Hệ quả (Nghịch)",
    meaning: "Nhưng, tuy nhiên",
    usage: "Giống しかし, nhưng trang trọng hơn",
    formation: "Câu A + けれども + Câu B (trái ngược)",
    examples: [
      "頑張ったけれども、合格できなかった。(Tôi cố gắng. Tuy nhiên, không đỗ được.)",
      "予報では晴れると言っていました。けれども、雨が降りました。(Theo dự báo trời sẽ nắng. Tuy nhiên, trời lại mưa.)",
    ],
  },
  {
    id: "c23",
    pattern: "だが",
    category: "Hệ quả (Nghịch)",
    meaning: "Nhưng, tuy nhiên",
    usage: "Phiên bản ngắn hơn của けれども, thường dùng trong văn bản",
    formation: "Câu A + だが + Câu B (trái ngược)",
    examples: [
      "彼は優秀だ。だが、謙虚だ。(Anh ấy xuất sắc. Nhưng lại rất khiêm tốn.)",
      "計画は立てた。だが、実行するのは難しい。(Đã lập kế hoạch. Tuy nhiên, thực hiện rất khó.)",
    ],
  },
  {
    id: "c24",
    pattern: "それでも",
    category: "Hệ quả (Nghịch)",
    meaning: "Dù vậy, nhưng vẫn, cho dù..., tuy vậy",
    usage: "Chỉ ra sự tiếp tục hoặc cố gắng mặc dù tình huống khó khăn",
    formation: "Câu A (khó khăn) + それでも + Câu B (vẫn thực hiện)",
    examples: [
      "疲れました。それでも、やることが残っている。(Tôi mệt. Dù vậy, vẫn còn việc phải làm.)",
      "失敗した。それでも、もう一度試してみます。(Tôi thất bại. Nhưng vẫn sẽ thử lần nữa.)",
    ],
  },
  {
    id: "c25",
    pattern: "でも",
    category: "Hệ quả (Nghịch)",
    meaning: "Nhưng, tuy nhiên",
    usage: "Phiên bản thân mật hơn, thường dùng trong nói chuyện",
    formation: "Câu A + でも + Câu B (trái ngược)",
    examples: [
      "好きですけど、今は時間がない。(Tôi thích. Nhưng bây giờ không có thời gian.)",
      "安い。でも、品質は良い。(Rẻ. Nhưng chất lượng tốt.)",
    ],
  },
  {
    id: "c26",
    pattern: "ただし",
    category: "Hệ quả (Nghịch)",
    meaning: "Tuy nhiên, nhưng (bổ sung điều kiện)",
    usage: "Thêm một điều kiện hoặc hạn chế vào câu trước",
    formation: "Câu A + ただし + Câu B (điều kiện)",
    examples: [
      "この商品は返品できます。ただし、1週間以内です。(Có thể hoàn trả sản phẩm này. Tuy nhiên, chỉ trong vòng 1 tuần.)",
      "参加費は無料です。ただし、事前登録が必要です。(Phí tham dự miễn phí. Tuy nhiên, phải đăng ký trước.)",
    ],
  },
];

export default CONNECTIVES;

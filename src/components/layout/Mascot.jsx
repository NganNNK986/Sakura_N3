import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TIPS = {
  '/': ['Xin chào! Hôm nay học gì nhé? 😊', 'Hãy bắt đầu với Từ Vựng nhé! 📚', 'Luyện tập mỗi ngày là chìa khóa thành công! 🗝️'],
  '/vocab': ['Hãy lật thẻ để xem nghĩa! 🎴', 'Thử chế độ Quiz để kiểm tra nhé! 🧠', '880 từ vựng N3 đang chờ bạn! 💪'],
  '/kanji': ['Click vào Kanji để xem chi tiết! 🔍', 'Hãy chú ý cả âm On và Kun nhé! 📖', '316 Kanji N3 — mỗi ngày một ít! ✨'],
  '/grammar': ['Ngữ pháp N3 khá thú vị đấy! 😄', 'Hãy xem ví dụ để hiểu rõ hơn! 💡', 'Thử chế độ quiz ngữ pháp nhé! 🎯'],
  '/mocktest': ['Cố lên! Bạn có thể làm được! 🌸', 'Bình tĩnh và đọc kỹ đề nhé! 🧘', 'Quản lý thời gian là quan trọng! ⏰'],
  '/results': ['Đừng nản! Ôn lại điểm yếu nhé! 💪', 'Tiến bộ từng ngày là quan trọng! 📈', '頑張れ！(Ganbarre!) — Cố lên! 🌸'],
};

export default function Mascot() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);
  const [tip, setTip] = useState('');
  const [mood, setMood] = useState('happy');

  useEffect(() => {
    const tips = TIPS[pathname] || TIPS['/'];
    setTip(tips[Math.floor(Math.random() * tips.length)]);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="mascot-wrap">
      {visible && (
        <div className="mascot-bubble animate-slideUp">
          <p>{tip}</p>
          <button className="bubble-close" onClick={() => setVisible(false)}>✕</button>
        </div>
      )}
      <button className="mascot-btn animate-float" onClick={() => setVisible(v => !v)} title="Sakura-chan">
        <div className="mascot-face">
          {mood === 'happy' ? '🌸' : mood === 'celebrate' ? '🎉' : '💭'}
        </div>
        <div className="mascot-name">さくら</div>
      </button>
      <style>{`
        .mascot-wrap {
          position: fixed;
          bottom: var(--space-xl);
          right: var(--space-xl);
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: var(--space-sm);
        }
        @media(max-width:768px){.mascot-wrap{bottom:80px;right:var(--space-md);}}
        .mascot-bubble {
          background: white;
          border: 2px solid var(--sakura-300);
          border-radius: var(--radius-lg) var(--radius-lg) 0 var(--radius-lg);
          padding: var(--space-md);
          max-width: 220px;
          box-shadow: var(--shadow-md);
          position: relative;
          font-size: 0.85rem;
          color: var(--ink);
          line-height: 1.5;
        }
        .bubble-close {
          position: absolute;
          top: 6px; right: 8px;
          background: none;
          border: none;
          font-size: 0.75rem;
          color: var(--ink-40);
          cursor: pointer;
        }
        .mascot-btn {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, var(--sakura-300), var(--sakura-500));
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: var(--shadow-md);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1px;
          transition: transform var(--trans-spring);
        }
        .mascot-btn:hover { transform: scale(1.12); }
        .mascot-face { font-size: 1.4rem; line-height: 1; }
        .mascot-name { font-size: 0.55rem; color: white; font-family: var(--font-jp); font-weight: 700; }
      `}</style>
    </div>
  );
}

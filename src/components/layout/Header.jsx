import { useLocation, Link } from 'react-router-dom';

const TITLES = {
  '/': '🏠 Trang Chủ',
  '/vocab': '📚 Từ Vựng N3',
  '/kanji': '🖊️ Kanji N3',
  '/grammar': '📖 Ngữ Pháp N3',
  '/conjugation': '🔄 Chia Động Từ',
  '/keigo': '🎩 Kính Ngữ',
  '/adverbs': '✨ Phó Từ N3',
  '/mocktest': '📝 Thi Thử N3',
  '/results': '📊 Kết Quả',
  '/profile': '👤 Hồ Sơ',
};

export default function Header() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] || '🌸 Sakura N3';

  return (
    <header className="app-header hide-mobile">
      <h1 className="header-title">{title}</h1>
      <Link to="/mocktest" className="btn btn-primary btn-sm">
        📝 Thi Thử Ngay
      </Link>
      <style>{`
        .app-header {
          position: sticky;
          top: 0;
          background: rgba(255,245,248,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--sakura-200);
          padding: 0 var(--space-xl);
          height: var(--header-h);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 50;
        }
        .header-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--ink);
        }
      `}</style>
    </header>
  );
}

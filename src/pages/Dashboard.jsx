import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { VOCAB } from '../data/vocab';
import { KANJI } from '../data/kanji';
import { GRAMMAR } from '../data/grammar';

const MODULES = [
  { to: '/vocab', icon: '📚', label: 'Từ Vựng', key: 'vocab', total: VOCAB.length, color: '#E8809C' },
  { to: '/kanji', icon: '🖊️', label: 'Kanji', key: 'kanji', total: KANJI.length, color: '#87CEEB' },
  { to: '/grammar', icon: '📖', label: 'Ngữ Pháp', key: 'grammar', total: GRAMMAR.length, color: '#7BC47F' },
  { to: '/conjugation', icon: '🔄', label: 'Chia Động Từ', key: 'conjugation', total: 15, color: '#F0B429' },
  { to: '/keigo', icon: '🎩', label: 'Kính Ngữ', key: 'keigo', total: 18, color: '#B57FD4' },
  { to: '/adverbs', icon: '✨', label: 'Phó Từ', key: 'adverbs', total: 30, color: '#F4A261' },
];

function ProgressRing({ pct, color, size = 70 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EDE5F2" strokeWidth={8} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }} />
    </svg>
  );
}

export default function Dashboard() {
  const { state } = useStore();
  const { progress, xp, streak, testHistory, profile } = state;

  const totalMastered = Object.values(progress).reduce((a, m) => a + (m.mastered?.length || 0), 0);
  const lastTest = testHistory[0];

  return (
    <div className="page-container animate-fadeIn">
      {/* Hero */}
      <div className="dashboard-hero card card-body mb-xl">
        <div>
          <div className="text-muted text-sm">おかえり！</div>
          <h2 style={{fontSize:'1.6rem', marginTop:'4px'}}>
            こんにちは、<span className="text-sakura">{profile?.name || 'Bạn'}</span>さん！🌸
          </h2>
          <p className="text-muted mt-sm">Hãy tiếp tục luyện tập để đạt N3 nhé!</p>
          <div className="hero-stats mt-md">
            <div className="hero-stat"><span className="stat-val">🔥 {streak}</span><span className="stat-label">ngày liên tiếp</span></div>
            <div className="hero-stat"><span className="stat-val">⭐ {xp}</span><span className="stat-label">điểm XP</span></div>
            <div className="hero-stat"><span className="stat-val">✅ {totalMastered}</span><span className="stat-label">đã thành thạo</span></div>
          </div>
        </div>
        <div className="hero-cta">
          <Link to="/mocktest" className="btn btn-primary btn-lg">📝 Thi Thử N3</Link>
          <p className="text-xs text-muted mt-sm text-center">100 phút · Không có Nghe</p>
        </div>
      </div>

      {/* Module Progress Grid */}
      <h3 className="mb-md">Tiến Độ Học Tập</h3>
      <div className="module-grid mb-xl">
        {MODULES.map(m => {
          const mod = progress[m.key] || { mastered: [] };
          const pct = m.total > 0 ? Math.round((mod.mastered.length / m.total) * 100) : 0;
          return (
            <Link key={m.to} to={m.to} className="module-card card card-hover">
              <div className="module-ring">
                <ProgressRing pct={pct} color={m.color} />
                <div className="ring-icon">{m.icon}</div>
              </div>
              <div className="module-info">
                <div className="module-label">{m.label}</div>
                <div className="module-pct" style={{ color: m.color }}>{pct}%</div>
                <div className="text-xs text-muted">{mod.mastered.length}/{m.total}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Tests */}
      {testHistory.length > 0 && (
        <div className="mb-xl">
          <h3 className="mb-md">Lịch Sử Thi Thử</h3>
          <div className="test-history">
            {testHistory.slice(0, 5).map((t, i) => (
              <div key={i} className="test-row card card-sm card-body flex items-center justify-between mb-sm">
                <div>
                  <div className="font-medium">Lần {testHistory.length - i}</div>
                  <div className="text-xs text-muted">{new Date(t.date).toLocaleDateString('vi-VN')}</div>
                </div>
                <div className="flex gap-md items-center">
                  <div className="text-2xl font-bold" style={{color: t.score >= 95 ? 'var(--spring-green)' : 'var(--sakura-700)'}}>
                    {t.score}
                    <span className="text-sm text-muted">/120</span>
                  </div>
                  <span className={`badge ${t.score >= 95 ? 'badge-green' : 'badge-sakura'}`}>
                    {t.score >= 95 ? '✅ Đậu' : '❌ Trượt'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .dashboard-hero { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:var(--space-lg); }
        .hero-stats { display:flex; gap:var(--space-lg); flex-wrap:wrap; }
        .hero-stat { display:flex; flex-direction:column; }
        .stat-val { font-size:1.3rem; font-weight:700; color:var(--ink); }
        .stat-label { font-size:0.72rem; color:var(--ink-40); }
        .hero-cta { text-align:center; }
        .module-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:var(--space-md); }
        .module-card { display:flex; flex-direction:column; align-items:center; padding:var(--space-md); gap:var(--space-sm); text-decoration:none; color:inherit; }
        .module-ring { position:relative; display:flex; align-items:center; justify-content:center; }
        .ring-icon { position:absolute; font-size:1.5rem; }
        .module-info { text-align:center; }
        .module-label { font-size:0.82rem; font-weight:600; color:var(--ink); }
        .module-pct { font-size:1.1rem; font-weight:700; }
      `}</style>
    </div>
  );
}

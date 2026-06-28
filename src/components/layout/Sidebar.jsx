import { NavLink } from "react-router-dom";
import { useStore } from "../../store/useStore";

import {
  Home,
  BookOpen,
  PenTool,
  FileText,
  RefreshCw,
  Briefcase,
  Sparkles,
  AlertTriangle,
  User,
  Flame,
  Star,
  Volume2,
} from "lucide-react";

const NAV = [
  { to: "/", icon: <Home size={18} />, label: "Trang Chủ" },
  { to: "/vocab", icon: <BookOpen size={18} />, label: "Từ Vựng" },
  { to: "/kanji", icon: <PenTool size={18} />, label: "Kanji" },
  { to: "/grammar", icon: <FileText size={18} />, label: "Ngữ Pháp" },
  { to: "/conjugation", icon: <RefreshCw size={18} />, label: "Chia Động Từ" },
  { to: "/keigo", icon: <Briefcase size={18} />, label: "Kính Ngữ" },
  { to: "/adverbs", icon: <Sparkles size={18} />, label: "Phó Từ" },
  { to: "/tulays", icon: <Volume2 size={18} />, label: "Từ Láy" },
  { to: "/traps", icon: <AlertTriangle size={18} />, label: "Bẫy Đọc" },
  { to: "/profile", icon: <User size={18} />, label: "Hồ Sơ" },
];

const MOBILE_NAV = NAV;

export default function Sidebar() {
  const { state } = useStore();
  const xp = state.xp || 0;
  const streak = state.streak || 0;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar hide-mobile">
        <div className="sidebar-logo">
          <span className="logo-icon">🌸</span>
          <div>
            <div className="logo-title">Sakura N3</div>
            <div className="logo-sub">JLPT N3 Study</div>
          </div>
        </div>

        <div className="sidebar-stats">
          <div className="stat-chip flex items-center gap-xs justify-center">
            <Flame size={14} className="text-error" /> {streak} ngày
          </div>
          <div className="stat-chip flex items-center gap-xs justify-center">
            <Star size={14} className="text-sakura-500" /> {xp} XP
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
            >
              <span className="nav-icon">{icon}</span>
              <span className="nav-label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p className="text-xs text-muted text-center">🌸 Cố lên! 頑張れ！</p>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav show-mobile" aria-label="Điều hướng mobile">
        {MOBILE_NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `bottom-nav-item${isActive ? " active" : ""}`
            }
          >
            <span className="nav-icon">{icon}</span>
            <span className="bottom-nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <style>{`
        .sidebar {
          position: fixed;
          left: 0; top: 0;
          width: var(--sidebar-w);
          height: 100vh;
          background: var(--bg-sidebar);
          border-right: 1px solid var(--sakura-200);
          display: flex;
          flex-direction: column;
          padding: var(--space-lg) 0;
          z-index: 100;
          overflow-y: auto;
          box-shadow: 2px 0 20px rgba(180,50,90,0.06);
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: 0 var(--space-lg) var(--space-lg);
          border-bottom: 1px solid var(--sakura-200);
          margin-bottom: var(--space-md);
        }
        .logo-icon { font-size: 1.8rem; }
        .logo-title { font-size: 1.1rem; font-weight: 800; color: var(--sakura-700); }
        .logo-sub { font-size: 0.7rem; color: var(--ink-40); letter-spacing: 0.05em; }
        .sidebar-stats {
          display: flex;
          gap: var(--space-sm);
          padding: 0 var(--space-md) var(--space-md);
          flex-wrap: wrap;
        }
        .stat-chip {
          background: var(--sakura-100);
          color: var(--sakura-700);
          border-radius: var(--radius-full);
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 600;
          flex: 1;
          text-align: center;
        }
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 0 var(--space-sm);
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: 10px var(--space-md);
          border-radius: var(--radius-md);
          color: var(--ink-70);
          font-size: 0.88rem;
          font-weight: 500;
          transition: all var(--trans-fast);
          text-decoration: none;
        }
        .sidebar-link:hover {
          background: var(--sakura-100);
          color: var(--sakura-700);
          transform: translateX(4px);
        }
        .sidebar-link.active {
          background: linear-gradient(135deg, var(--sakura-700), var(--sakura-500));
          color: white;
          box-shadow: 0 4px 12px rgba(181,54,90,0.3);
        }
        .nav-icon { font-size: 1.1rem; width: 24px; text-align: center; }
        .sidebar-footer { padding: var(--space-md); margin-top: auto; }

        .bottom-nav {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: var(--bg-sidebar);
          border-top: 1px solid var(--sakura-200);
          display: flex;
          z-index: 100;
          box-shadow: 0 -4px 20px rgba(180,50,90,0.1);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .bottom-nav::-webkit-scrollbar { display: none; }
        .bottom-nav-item {
          flex: 0 0 74px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 8px 4px;
          color: var(--ink-40);
          font-size: 0.65rem;
          font-weight: 500;
          text-decoration: none;
          transition: color var(--trans-fast);
          min-width: 74px;
        }
        .bottom-nav-item .nav-icon { font-size: 1.2rem; width: auto; }
        .bottom-nav-label {
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bottom-nav-item.active { color: var(--sakura-700); }
      `}</style>
    </>
  );
}

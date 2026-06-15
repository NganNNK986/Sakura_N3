import { useState } from "react";
import { useStore } from "../store/useStore";
import KEIGO from "../data/keigo";

export default function Keigo() {
  const { state, markMastered } = useStore();
  const [activeTab, setActiveTab] = useState("patterns"); // patterns, scenarios

  const progress = state.progress.keigo || { seen: [], mastered: [] };
  const isMastered = (id) => progress.mastered.includes(id);

  const handleMaster = (id) => {
    markMastered("keigo", id);
  };

  return (
    <div className="page-container animate-fadeIn">
      <div className="mb-lg">
        <h2>Kính Ngữ (Keigo)</h2>
        <p className="text-muted mt-xs">{KEIGO.intro}</p>
      </div>

      <div className="card card-body mb-lg">
        <div className="keigo-types-grid">
          {KEIGO.types.map((t) => (
            <div key={t.id} className="type-box">
              <div className="font-bold text-sakura mb-xs">{t.name}</div>
              <div className="text-sm text-muted">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="tabs mb-md">
        <button
          className={`tab-btn ${activeTab === "patterns" ? "active" : ""}`}
          onClick={() => setActiveTab("patterns")}
        >
          Bảng Động Từ
        </button>
        <button
          className={`tab-btn ${activeTab === "scenarios" ? "active" : ""}`}
          onClick={() => setActiveTab("scenarios")}
        >
          Tình Huống
        </button>
      </div>

      {activeTab === "patterns" && (
        <div className="card overflow-x-auto">
          <table className="keigo-table w-full">
            <thead>
              <tr>
                <th>Thể thường</th>
                <th>Lịch sự (丁寧)</th>
                <th>Tôn kính (尊敬)</th>
                <th>Khiêm nhường (謙譲)</th>
                <th>Ý nghĩa</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {KEIGO.patterns.map((p) => (
                <tr
                  key={p.id}
                  className={isMastered(p.id) ? "bg-spring-light" : ""}
                >
                  <td className="font-bold jp">{p.plain}</td>
                  <td className="jp">{p.teineigo}</td>
                  <td className="jp text-sakura font-medium">
                    {p.sonkeigo || "-"}
                  </td>
                  <td className="jp text-blue font-medium">
                    {p.kenjougo || "-"}
                  </td>
                  <td>{p.meaning}</td>
                  <td className="text-center">
                    <button
                      className={`btn btn-sm ${isMastered(p.id) ? "btn-success" : "btn-secondary"}`}
                      onClick={() => handleMaster(p.id)}
                    >
                      {isMastered(p.id) ? "✓" : "Đánh dấu"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "scenarios" && (
        <div className="flex-col gap-md">
          {KEIGO.scenarios.map((s, i) => (
            <div key={s.id} className="card card-body">
              <div className="flex items-start justify-between mb-sm">
                <div className="font-bold text-lg">
                  Tình huống {i + 1}: {s.situation}
                </div>
                <span className="badge badge-sakura">{s.tags[1]}</span>
              </div>
              <div className="scenario-grid mb-sm">
                <div className="p-sm bg-pale rounded">
                  <div className="text-xs text-muted mb-xs">Bình thường:</div>
                  <div className="jp">{s.plain}</div>
                </div>
                <div className="p-sm bg-sakura-50 rounded border border-sakura-200">
                  <div className="text-xs text-sakura mb-xs font-bold">
                    Lịch sự (Keigo):
                  </div>
                  <div className="jp text-lg font-bold">{s.polite}</div>
                </div>
              </div>
              <div className="text-sm text-muted">Giải thích: {s.explain}</div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .keigo-types-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-sm); }
        @media(min-width: 768px) { .keigo-types-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .type-box { padding: var(--space-md); border: 1px dashed var(--sakura-300); border-radius: var(--radius-sm); background: var(--sakura-50); }
        .tabs { display: flex; border-bottom: 2px solid var(--pale); }
        .tab-btn { padding: var(--space-sm) var(--space-lg); background: none; border: none; font-weight: bold; color: var(--ink-40); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; }
        .tab-btn.active { color: var(--sakura-700); border-bottom-color: var(--sakura-700); }
        .keigo-table { border-collapse: collapse; text-align: left; min-width: 600px; }
        .keigo-table th { background: var(--bg-card); padding: var(--space-md); border-bottom: 2px solid var(--pale); font-size: 0.85rem; color: var(--ink-40); }
        .keigo-table td { padding: var(--space-md); border-bottom: 1px solid var(--pale); vertical-align: middle; }
        .text-blue { color: #2196f3; }
        .scenario-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
        @media(max-width: 600px) { .scenario-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

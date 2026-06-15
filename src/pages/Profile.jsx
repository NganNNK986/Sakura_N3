import { useState } from "react";
import { useStore } from "../store/useStore";

const AVATARS = ["🌸", "🦊", "🐼", "🐱", "🦋", "🌟"];

export default function Profile({ isSetup }) {
  const { state, setProfile, setState } = useStore();
  const [name, setName] = useState(state.profile?.name || "");
  const [avatar, setAvatar] = useState(state.profile?.avatar || "🌸");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    setProfile({
      name: name.trim(),
      avatar,
      createdAt: state.profile?.createdAt || Date.now(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (
      confirm(
        "すべてのデータをリセットしますか？ / Bạn có chắc muốn xóa toàn bộ dữ liệu?",
      )
    ) {
      setState(() => ({
        profile: null,
        xp: 0,
        streak: 0,
        lastStudyDate: null,
        progress: {
          vocab: { seen: [], mastered: [] },
          kanji: { seen: [], mastered: [] },
          grammar: { seen: [], mastered: [] },
          conjugation: { seen: [], mastered: [] },
          keigo: { seen: [], mastered: [] },
          adverbs: { seen: [], mastered: [] },
        },
        testHistory: [],
        lastTestResult: null,
      }));
    }
  };

  const { xp, streak, testHistory, progress } = state;
  const totalMastered = Object.values(progress).reduce(
    (a, m) => a + (m.mastered?.length || 0),
    0,
  );

  return (
    <div className="page-container animate-fadeIn">
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        {isSetup && (
          <div className="text-center mb-xl">
            <div style={{ fontSize: "4rem" }}>🌸</div>
            <h2>Chào mừng đến Sakura N3!</h2>
            <p className="text-muted mt-sm">
              Hãy tạo hồ sơ để bắt đầu hành trình chinh phục JLPT N3!
            </p>
          </div>
        )}

        {!isSetup && <h2 className="mb-lg">Hồ Sơ Của Bạn</h2>}

        <div className="card card-body mb-lg">
          <h3 className="mb-md">Chọn Avatar</h3>
          <div className="avatar-grid mb-md">
            {AVATARS.map((a) => (
              <button
                key={a}
                className={`avatar-btn ${avatar === a ? "selected" : ""}`}
                onClick={() => setAvatar(a)}
              >
                {a}
              </button>
            ))}
          </div>
          <h3 className="mb-sm">Tên Của Bạn</h3>
          <input
            className="input-field mb-md"
            placeholder="Nhập tên của bạn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <button
            className="btn btn-primary w-full"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            {saved ? "Đã lưu!" : isSetup ? "Bắt Đầu Học!" : "Lưu"}
          </button>
        </div>

        {!isSetup && state.profile && (
          <>
            <div className="card card-body mb-lg">
              <h3 className="mb-md">Thống Kê</h3>
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-num">{streak}</div>
                  <div className="stat-lbl">Ngày học liên tiếp</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num">{xp}</div>
                  <div className="stat-lbl">Tổng XP</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num">{totalMastered}</div>
                  <div className="stat-lbl">Đã thành thạo</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num">{testHistory.length}</div>
                  <div className="stat-lbl">Lần thi thử</div>
                </div>
              </div>
            </div>

            {testHistory.length > 0 && (
              <div className="card card-body mb-lg">
                <h3 className="mb-md">Lịch Sử Thi</h3>
                {testHistory.map((t, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center mb-sm"
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid var(--pale)",
                    }}
                  >
                    <span className="text-sm text-muted">
                      {new Date(t.date).toLocaleDateString("vi-VN")}
                    </span>
                    <span
                      className="font-bold"
                      style={{
                        color:
                          t.score >= 95
                            ? "var(--spring-green)"
                            : "var(--sakura-700)",
                      }}
                    >
                      {t.score}/120
                    </span>
                    <span
                      className={`badge ${t.score >= 95 ? "badge-green" : "badge-error"}`}
                    >
                      {t.score >= 95 ? "Đậu" : "Trượt"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button className="btn btn-secondary w-full" onClick={handleReset}>
              Xóa Toàn Bộ Dữ Liệu
            </button>
          </>
        )}
      </div>

      <style>{`
        .avatar-grid { display:flex; gap:var(--space-sm); flex-wrap:wrap; }
        .avatar-btn {
          width:56px; height:56px; border-radius:50%; border:3px solid var(--pale);
          font-size:1.8rem; background:var(--sakura-50); cursor:pointer;
          transition:all var(--trans-spring);
        }
        .avatar-btn.selected {
          border-color:var(--sakura-700);
          box-shadow:0 0 0 4px rgba(181,54,90,0.2);
          transform:scale(1.1);
        }
        .avatar-btn:hover { transform:scale(1.05); }
        .stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); }
        .stat-box { background:var(--sakura-50); border-radius:var(--radius-md); padding:var(--space-md); text-align:center; }
        .stat-num { font-size:1.4rem; font-weight:700; }
        .stat-lbl { font-size:0.75rem; color:var(--ink-40); margin-top:4px; }
      `}</style>
    </div>
  );
}

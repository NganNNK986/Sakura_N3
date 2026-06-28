import { useState, useMemo } from "react";
import JLPT_TRAPS, { getAllTrapItems } from "../data/jlptTraps";

function TrapTable({ items }) {
  return (
    <div className="trap-table-wrap">
      <table className="trap-table">
        <thead>
          <tr>
            <th>Từ vựng</th>
            <th>Nghĩa</th>
            <th>Bẫy thường gặp</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={`${item.word}-${item.reading}`}>
              <td>
                <span className="trap-word">{item.word}</span>
                <span className="trap-reading">（{item.reading}）</span>
              </td>
              <td>{item.meaning}</td>
              <td className="trap-wrong">
                {item.trap.startsWith("⚠") ? item.trap : `❌ ${item.trap}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuickNotes({ notes }) {
  return (
    <ul className="quick-notes">
      {notes.map((n) => (
        <li key={n.word}>
          <strong className="font-jp">{n.word}</strong>: {n.meaning}
          <br />
          <span className="text-muted">
            → Lỗi từng mắc: nhầm thành <strong className="font-jp">{n.mistake}</strong>
            {n.note && <> ({n.note})</>}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function JlptTraps() {
  const [mode, setMode] = useState("study");
  const [activeSection, setActiveSection] = useState("chouon");
  const [quizState, setQuizState] = useState(null);

  const allItems = useMemo(() => getAllTrapItems(), []);
  const totalItems = allItems.length;

  const generateQuiz = () => {
    const item = allItems[Math.floor(Math.random() * allItems.length)];
    const wrongReadings = item.trap.split(" / ").map((t) => t.trim());
    const others = allItems
      .filter((i) => i.word !== item.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.max(0, 3 - wrongReadings.length))
      .map((i) => i.trap.split(" / ")[0]);
    const options = [item.reading, ...wrongReadings, ...others]
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    if (!options.includes(item.reading)) options[0] = item.reading;
    setQuizState({ item, options, answer: item.reading, selected: null });
  };

  const startQuiz = () => {
    setMode("quiz");
    generateQuiz();
  };

  const handleOptionClick = (reading) => {
    if (quizState.selected) return;
    setQuizState({ ...quizState, selected: reading });
    setTimeout(generateQuiz, 1500);
  };

  const section = JLPT_TRAPS.sections.find((s) => s.id === activeSection);

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-lg flex-wrap gap-sm">
        <div>
          <h2>Bẫy Đọc JLPT N3</h2>
          <p className="text-muted mt-xs">{totalItems} từ · Trường âm, On/Kun, ゛ & っ</p>
        </div>
        <div className="flex gap-sm">
          <button
            className={`btn ${mode === "study" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setMode("study")}
          >
            Học Tập
          </button>
          <button
            className={`btn ${mode === "quiz" ? "btn-primary" : "btn-secondary"}`}
            onClick={startQuiz}
          >
            Trắc Nghiệm
          </button>
        </div>
      </div>

      {mode === "quiz" && quizState ? (
        <div className="card card-body quiz-panel">
          <p className="text-muted text-sm mb-sm">Chọn cách đọc đúng:</p>
          <div className="quiz-word font-jp">{quizState.item.word}</div>
          <p className="text-muted mb-lg">{quizState.item.meaning}</p>
          <div className="quiz-options">
            {quizState.options.map((opt) => {
              const isCorrect = opt === quizState.answer;
              const isSelected = opt === quizState.selected;
              let cls = "quiz-opt";
              if (quizState.selected) {
                if (isCorrect) cls += " correct";
                else if (isSelected) cls += " wrong";
              }
              return (
                <button
                  key={opt}
                  className={cls}
                  onClick={() => handleOptionClick(opt)}
                  disabled={!!quizState.selected}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {quizState.selected && (
            <p className="mt-md text-sm text-muted">
              Bẫy thường gặp: ❌ {quizState.item.trap}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="flex gap-sm mb-lg flex-wrap">
            {JLPT_TRAPS.sections.map((s) => (
              <button
                key={s.id}
                className={`btn ${activeSection === s.id ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.title.replace(/^[^\s]+\s/, "")}
              </button>
            ))}
          </div>

          {section?.subsections ? (
            section.subsections.map((sub) => (
              <div key={sub.id} className="mb-xl">
                <h3 className="mb-sm">{sub.title}</h3>
                {sub.description && (
                  <p className="text-muted mb-md">{sub.description}</p>
                )}
                {sub.groups?.map((group) => (
                  <div key={group.id} className="mb-lg">
                    <h4 className="mb-xs">{group.title}</h4>
                    {group.note && (
                      <p className="text-sm text-muted mb-sm">{group.note}</p>
                    )}
                    <TrapTable items={group.items} />
                  </div>
                ))}
                {sub.quickNotes && (
                  <>
                    <h4 className="mb-sm">Ghi nhớ nhanh các lỗi dễ mắc</h4>
                    <QuickNotes notes={sub.quickNotes} />
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="mb-xl">
              <h3 className="mb-sm">{section.title}</h3>
              {section.description && (
                <p className="text-muted mb-md">{section.description}</p>
              )}
              {section.groups?.map((group) => (
                <div key={group.id}>
                  <TrapTable items={group.items} />
                </div>
              ))}
            </div>
          )}

          <div className="card card-body tips-card">
            <h3 className="mb-sm">{JLPT_TRAPS.tips.title}</h3>
            <p className="mb-sm">{JLPT_TRAPS.tips.intro}</p>
            <ul className="tips-list">
              {JLPT_TRAPS.tips.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="mt-md text-muted">{JLPT_TRAPS.tips.conclusion}</p>
          </div>
        </>
      )}

      <style>{`
        .trap-table-wrap { overflow-x: auto; margin-bottom: var(--space-md); }
        .trap-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
        }
        .trap-table th, .trap-table td {
          padding: 10px 12px;
          border-bottom: 1px solid var(--sakura-200);
          text-align: left;
          vertical-align: top;
        }
        .trap-table th {
          background: var(--sakura-100);
          font-weight: 600;
          color: var(--sakura-700);
        }
        .trap-table tr:hover td { background: var(--sakura-50); }
        .trap-word { font-family: var(--font-jp); font-weight: 600; font-size: 1rem; }
        .trap-reading { font-family: var(--font-jp); color: var(--ink-40); font-size: 0.85rem; margin-left: 4px; }
        .trap-wrong { color: var(--error); font-family: var(--font-jp); }
        .quick-notes { list-style: none; padding: 0; }
        .quick-notes li {
          padding: var(--space-md);
          background: var(--sakura-50);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-sm);
          line-height: 1.6;
        }
        .tips-card {
          background: linear-gradient(135deg, var(--sakura-50), white);
          border: 1px solid var(--sakura-200);
        }
        .tips-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }
        .tips-list li {
          background: var(--sakura-100);
          color: var(--sakura-700);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
        }
        .quiz-panel { max-width: 520px; margin: 0 auto; text-align: center; }
        .quiz-word { font-size: 2.5rem; font-weight: 700; color: var(--sakura-700); }
        .quiz-options { display: grid; gap: var(--space-sm); }
        .quiz-opt {
          padding: 14px;
          border: 2px solid var(--sakura-200);
          border-radius: var(--radius-md);
          background: white;
          font-family: var(--font-jp);
          font-size: 1rem;
          cursor: pointer;
          transition: all var(--trans-fast);
        }
        .quiz-opt:hover:not(:disabled) {
          border-color: var(--sakura-400);
          background: var(--sakura-50);
        }
        .quiz-opt.correct { border-color: var(--spring-green); background: var(--spring-green-light); }
        .quiz-opt.wrong { border-color: var(--error); background: var(--error-light); }
        .font-jp { font-family: var(--font-jp); }
      `}</style>
    </div>
  );
}

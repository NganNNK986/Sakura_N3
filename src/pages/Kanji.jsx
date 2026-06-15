import { useState } from "react";
import { useStore } from "../store/useStore";
import KANJI from "../data/kanji";
import Modal from "../components/ui/Modal";

export default function Kanji() {
  const { state, markMastered, markSeen } = useStore();
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [filter, setFilter] = useState("all"); // all, mastered, unmastered
  const [mode, setMode] = useState("study");
  const [quizState, setQuizState] = useState(null);

  const progress = state.progress.kanji || { seen: [], mastered: [] };
  const isMastered = (id) => progress.mastered.includes(id);

  const filteredKanji = KANJI.filter((k) => {
    if (filter === "mastered") return isMastered(k.id);
    if (filter === "unmastered") return !isMastered(k.id);
    return true;
  });

  const handleMaster = (k) => {
    markMastered("kanji", k.id);
    setSelectedKanji(null);
  };

  // Quiz Logic
  const generateQuiz = () => {
    const kanji = KANJI[Math.floor(Math.random() * KANJI.length)];
    const others = [...KANJI]
      .sort(() => 0.5 - Math.random())
      .filter((k) => k.id !== kanji.id)
      .slice(0, 3);
    const options = [kanji, ...others].sort(() => 0.5 - Math.random());
    setQuizState({
      question: kanji,
      options,
      answer: kanji.id,
      selected: null,
    });
  };

  const startQuiz = () => {
    setMode("quiz");
    generateQuiz();
  };

  const handleOptionClick = (id) => {
    if (quizState.selected) return; // already answered
    setQuizState({ ...quizState, selected: id });
    if (id === quizState.answer) {
      if (markSeen) markSeen("kanji", quizState.question.id);
      markMastered("kanji", quizState.question.id);
    }
    setTimeout(() => {
      generateQuiz();
    }, 1500);
  };

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-lg flex-wrap gap-md">
        <div>
          <h2>Kanji N3</h2>
          <p className="text-muted mt-xs">316 chữ Kanji thiết yếu</p>
        </div>
        <div className="flex gap-sm">
          {mode === "study" && (
            <select
              className="input-field"
              style={{ width: "auto" }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tất cả ({KANJI.length})</option>
              <option value="mastered">
                Đã thuộc ({progress.mastered.length})
              </option>
              <option value="unmastered">
                Chưa thuộc ({KANJI.length - progress.mastered.length})
              </option>
            </select>
          )}
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

      <div className="card card-body mb-lg text-center">
        <div className="flex justify-between text-sm mb-sm font-medium">
          <span className="text-muted">Tiến độ Kanji</span>
          <span className="text-sakura">
            {progress.mastered.length} / {KANJI.length} (
            {Math.round((progress.mastered.length / KANJI.length) * 100)}%)
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{
              width: (progress.mastered.length / KANJI.length) * 100 + "%",
            }}
          ></div>
        </div>
      </div>

      {mode === "study" && (
        <div className="kanji-grid">
          {filteredKanji.map((k) => (
            <div
              key={k.id}
              className={`kanji-cell ${isMastered(k.id) ? "mastered" : ""}`}
              onClick={() => setSelectedKanji(k)}
            >
              {k.char}
            </div>
          ))}
          {filteredKanji.length === 0 && (
            <div
              className="text-center text-muted p-xl"
              style={{ gridColumn: "1 / -1" }}
            >
              Không có Kanji nào trong mục này.
            </div>
          )}
        </div>
      )}

      {mode === "quiz" && quizState && (
        <div className="quiz-container max-w-md mx-auto card card-body animate-slideUp">
          <div className="text-center mb-xl">
            <div className="text-sm text-muted mb-sm">
              Ý nghĩa của chữ Kanji này là gì?
            </div>
            <div className="text-6xl font-bold jp text-sakura my-md">
              {quizState.question.char}
            </div>
            <div className="text-md text-ink-40 mt-xs">
              {quizState.question.on
                ? quizState.question.on
                : quizState.question.kun}
            </div>
          </div>

          <div className="flex-col gap-sm">
            {quizState.options.map((opt) => {
              let btnClass = "btn-secondary";
              if (quizState.selected) {
                if (opt.id === quizState.answer) btnClass = "btn-success";
                else if (opt.id === quizState.selected)
                  btnClass = "btn-secondary text-error border-error";
              }
              return (
                <button
                  key={opt.id}
                  className={`btn w-full justify-center p-md text-lg ${btnClass}`}
                  onClick={() => handleOptionClick(opt.id)}
                  disabled={!!quizState.selected}
                  style={{ whiteSpace: "normal", height: "auto" }}
                >
                  {opt.meaning}
                </button>
              );
            })}
          </div>

          {quizState.selected && (
            <div
              className={`mt-lg text-center font-bold ${quizState.selected === quizState.answer ? "text-green" : "text-error"} animate-fadeIn`}
            >
              {quizState.selected === quizState.answer
                ? "Chính xác! (+5 XP)"
                : "Sai rồi, thử lại nhé!"}
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={!!selectedKanji}
        onClose={() => setSelectedKanji(null)}
        title="Chi Tiết Kanji"
      >
        {selectedKanji && (
          <div className="text-center">
            <div className="flex gap-md mb-lg justify-center">
              <div className="kanji-display jp">{selectedKanji.char}</div>
              <div className="flex-col justify-center text-left gap-sm">
                <div>
                  <span className="badge badge-sakura mr-xs">Ý Nghĩa</span>{" "}
                  <strong>{selectedKanji.meaning}</strong>
                </div>
                {selectedKanji.on && (
                  <div>
                    <span className="badge badge-blue mr-xs">Onyomi</span>{" "}
                    <span className="jp text-lg">{selectedKanji.on}</span>
                  </div>
                )}
                {selectedKanji.kun && (
                  <div>
                    <span className="badge badge-green mr-xs">Kunyomi</span>{" "}
                    <span className="jp text-lg">{selectedKanji.kun}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-left bg-sakura-50 p-md rounded-md mb-lg">
              <div className="font-bold mb-sm text-sakura">Ví dụ:</div>
              <ul className="pl-md m-0" style={{ lineHeight: 1.8 }}>
                {selectedKanji.examples.map((ex, i) => {
                  const [jp, vn] = ex.split("=");
                  return (
                    <li key={i}>
                      <span className="jp font-medium">{jp}</span> :{" "}
                      <span className="text-muted">{vn}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              className={`btn w-full justify-center ${isMastered(selectedKanji.id) ? "btn-success" : "btn-primary"}`}
              onClick={() => handleMaster(selectedKanji)}
            >
              {isMastered(selectedKanji.id)
                ? "Đã Thuộc"
                : "Đánh dấu Đã Thuộc (+5 XP)"}
            </button>
          </div>
        )}
      </Modal>

      <style>{`
        .kanji-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
          gap: var(--space-sm);
        }
        @media(max-width: 600px) {
          .kanji-grid { grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); gap: 4px; }
        }
        .kanji-cell {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--sakura-200);
          border-radius: var(--radius-sm);
          font-size: 1.8rem;
          font-family: var(--font-jp);
          cursor: pointer;
          transition: all var(--trans-fast);
          color: var(--ink);
        }
        .kanji-cell:hover {
          transform: scale(1.1);
          border-color: var(--sakura-500);
          box-shadow: var(--shadow-sm);
          z-index: 2;
        }
        .kanji-cell.mastered {
          background: var(--spring-green-light);
          border-color: var(--spring-green);
          color: #1b5e20;
        }
        .kanji-display {
          font-size: 5rem;
          line-height: 1;
          width: 100px; height: 100px;
          display: flex; align-items: center; justify-content: center;
          background: white; border: 2px dashed var(--sakura-300);
          border-radius: var(--radius-md);
        }
      `}</style>
    </div>
  );
}

import { useState } from "react";
import { useStore } from "../store/useStore";
import GRAMMAR from "../data/grammar";
import Modal from "../components/ui/Modal";

export default function Grammar() {
  const { state, markMastered, markSeen } = useStore();
  const [selectedGrammar, setSelectedGrammar] = useState(null);
  const [mode, setMode] = useState("study");
  const [quizState, setQuizState] = useState(null);

  const progress = state.progress.grammar || { seen: [], mastered: [] };
  const isMastered = (id) => progress.mastered.includes(id);

  const handleMaster = (g) => {
    markMastered("grammar", g.id);
    setSelectedGrammar(null);
  };

  // Quiz Logic
  const generateQuiz = () => {
    const grammar = GRAMMAR[Math.floor(Math.random() * GRAMMAR.length)];
    const others = [...GRAMMAR]
      .sort(() => 0.5 - Math.random())
      .filter((g) => g.id !== grammar.id)
      .slice(0, 3);
    const options = [grammar, ...others].sort(() => 0.5 - Math.random());
    setQuizState({
      question: grammar,
      options,
      answer: grammar.id,
      selected: null,
    });
  };

  const startQuiz = () => {
    setMode("quiz");
    generateQuiz();
  };

  const handleOptionClick = (id) => {
    if (quizState.selected) return;
    setQuizState({ ...quizState, selected: id });
    if (id === quizState.answer) {
      if (markSeen) markSeen("grammar", quizState.question.id);
      markMastered("grammar", quizState.question.id);
    }
    setTimeout(() => {
      generateQuiz();
    }, 1500);
  };

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h2>Ngữ Pháp N3</h2>
          <p className="text-muted mt-xs">{GRAMMAR.length} mẫu câu ngữ pháp</p>
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

      <div className="card card-body mb-lg text-center">
        <div className="flex justify-between text-sm mb-sm font-medium">
          <span className="text-muted">Tiến độ Ngữ Pháp</span>
          <span className="text-sakura">
            {progress.mastered.length} / {GRAMMAR.length} (
            {Math.round((progress.mastered.length / GRAMMAR.length) * 100)}%)
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{
              width: (progress.mastered.length / GRAMMAR.length) * 100 + "%",
            }}
          ></div>
        </div>
      </div>

      {mode === "study" && (
        <div className="grammar-list">
          {GRAMMAR.map((g, i) => (
            <div
              key={g.id}
              className={`grammar-card card card-hover ${isMastered(g.id) ? "mastered" : ""}`}
              onClick={() => setSelectedGrammar(g)}
            >
              <div className="flex items-center gap-md">
                <div className="grammar-num">{i + 1}</div>
                <div className="flex-1">
                  <div className="text-lg font-bold jp text-sakura">
                    {g.pattern}
                  </div>
                  <div className="text-sm text-muted">{g.meaning}</div>
                </div>
                <div className="text-xl">
                  {isMastered(g.id) ? "Đã thuộc" : "Chi tiết"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {mode === "quiz" && quizState && (
        <div className="quiz-container max-w-md mx-auto card card-body animate-slideUp">
          <div className="text-center mb-xl">
            <div className="text-sm text-muted mb-sm">
              Ý nghĩa của cấu trúc ngữ pháp này là gì?
            </div>
            <div className="text-4xl font-bold jp text-sakura my-md">
              {quizState.question.pattern}
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
        isOpen={!!selectedGrammar}
        onClose={() => setSelectedGrammar(null)}
        title="Chi Tiết Ngữ Pháp"
      >
        {selectedGrammar && (
          <div>
            <div className="text-center mb-md">
              <h3 className="text-3xl font-bold jp text-sakura mb-sm">
                {selectedGrammar.pattern}
              </h3>
              <div className="text-lg font-medium">
                {selectedGrammar.meaning}
              </div>
            </div>

            <div className="bg-sakura-50 p-md rounded-md mb-md">
              <div className="font-bold text-sakura mb-xs">Cấu trúc:</div>
              <div className="jp text-lg">{selectedGrammar.formation}</div>
            </div>

            <div className="mb-lg">
              <div className="font-bold text-sakura mb-sm">Ví dụ:</div>
              <ul
                className="pl-0 m-0"
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {selectedGrammar.examples.map((ex, i) => {
                  // Phân tách tiếng Nhật và nghĩa Việt. VD: 日本語を学ぶために、毎日練習します。(Để học tiếng Nhật, tôi luyện tập mỗi ngày.)
                  const match = ex.match(/^(.*?)\((.*?)\)$/);
                  const jp = match ? match[1] : ex;
                  const vn = match ? match[2] : "";
                  return (
                    <li
                      key={i}
                      className="border-b pb-sm border-pale last:border-0"
                    >
                      <div className="jp text-lg mb-xs font-medium">{jp}</div>
                      {vn && <div className="text-muted text-sm">{vn}</div>}
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              className={`btn w-full justify-center ${isMastered(selectedGrammar.id) ? "btn-success" : "btn-primary"}`}
              onClick={() => handleMaster(selectedGrammar)}
            >
              {isMastered(selectedGrammar.id)
                ? "Đã thuộc Đã Thuộc"
                : "Đánh dấu Đã Thuộc (+5 XP)"}
            </button>
          </div>
        )}
      </Modal>

      <style>{`
        .grammar-list { display: flex; flex-direction: column; gap: var(--space-md); }
        .grammar-card { cursor: pointer; padding: var(--space-md) var(--space-lg); }
        .grammar-card.mastered { background: var(--spring-green-light); border-color: var(--spring-green); }
        .grammar-num { 
          width: 32px; height: 32px; border-radius: 50%; 
          background: var(--sakura-100); color: var(--sakura-700);
          display: flex; align-items: center; justify-content: center;
          font-weight: bold; font-size: 0.85rem;
        }
        .grammar-card.mastered .grammar-num { background: white; color: var(--spring-green); }
        .border-b { border-bottom: 1px solid var(--pale); }
        .pb-sm { padding-bottom: var(--space-sm); }
        .last\\:border-0:last-child { border-bottom: 0; }
      `}</style>
    </div>
  );
}

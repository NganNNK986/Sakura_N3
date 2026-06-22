import { useState } from "react";
import { useStore } from "../store/useStore";
import GRAMMAR from "../data/grammar";
import CONNECTIVES from "../data/connectives";
import Modal from "../components/ui/Modal";

export default function Grammar() {
  const { state, markMastered, markSeen } = useStore();
  const [selectedItem, setSelectedItem] = useState(null);
  const [mode, setMode] = useState("study");
  const [itemType, setItemType] = useState("grammar"); // "grammar" or "connectives"
  const [quizState, setQuizState] = useState(null);

  const currentData = itemType === "grammar" ? GRAMMAR : CONNECTIVES;
  const progress = state.progress[itemType] || { seen: [], mastered: [] };
  const isMastered = (id) => progress.mastered.includes(id);

  const handleMaster = (item) => {
    markMastered(itemType, item.id);
    setSelectedItem(null);
  };

  // Quiz Logic
  const generateQuiz = () => {
    const item = currentData[Math.floor(Math.random() * currentData.length)];
    const others = [...currentData]
      .sort(() => 0.5 - Math.random())
      .filter((g) => g.id !== item.id)
      .slice(0, 3);
    const options = [item, ...others].sort(() => 0.5 - Math.random());
    setQuizState({
      question: item,
      options,
      answer: item.id,
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
      if (markSeen) markSeen(itemType, quizState.question.id);
      markMastered(itemType, quizState.question.id);
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
          <p className="text-muted mt-xs">{currentData.length} mẫu</p>
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

      {/* Item Type Tabs */}
      <div className="flex gap-sm mb-lg">
        <button
          className={`btn ${itemType === "grammar" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => {
            setItemType("grammar");
            setMode("study");
            setSelectedItem(null);
            setQuizState(null);
          }}
        >
          Ngữ Pháp
        </button>
        <button
          className={`btn ${itemType === "connectives" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => {
            setItemType("connectives");
            setMode("study");
            setSelectedItem(null);
            setQuizState(null);
          }}
        >
          Liên Từ
        </button>
      </div>

      <div className="card card-body mb-lg text-center">
        <div className="flex justify-between text-sm mb-sm font-medium">
          <span className="text-muted">Tiến độ {itemType === "grammar" ? "Ngữ Pháp" : "Liên Từ"}</span>
          <span className="text-sakura">
            {progress.mastered.length} / {currentData.length} (
            {Math.round((progress.mastered.length / currentData.length) * 100)}%)
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{
              width: (progress.mastered.length / currentData.length) * 100 + "%",
            }}
          ></div>
        </div>
      </div>

      {mode === "study" && (
        <div className="grammar-list">
          {currentData.map((item, i) => (
            <div
              key={item.id}
              className={`grammar-card card card-hover ${isMastered(item.id) ? "mastered" : ""}`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex items-center gap-md">
                <div className="grammar-num">{i + 1}</div>
                <div className="flex-1">
                  <div className="text-lg font-bold jp text-sakura">
                    {item.pattern}
                  </div>
                  <div className="text-sm text-muted">{item.meaning}</div>
                  {item.category && (
                    <div className="text-xs text-pale mt-xs">{item.category}</div>
                  )}
                </div>
                <div className="text-xl">
                  {isMastered(item.id) ? "Đã thuộc" : "Chi tiết"}
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
              Ý nghĩa của {itemType === "grammar" ? "cấu trúc ngữ pháp" : "liên từ"} này là gì?
            </div>
            <div className="text-6xl font-bold jp text-sakura my-md">
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
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={itemType === "grammar" ? "Chi Tiết Ngữ Pháp" : "Chi Tiết Liên Từ"}
      >
        {selectedItem && (
          <div>
            <div className="text-center mb-md">
              <h3 className="text-3xl font-bold jp text-sakura mb-sm">
                {selectedItem.pattern}
              </h3>
              <div className="text-lg font-medium">
                {selectedItem.meaning}
              </div>
              {selectedItem.category && (
                <div className="text-sm text-muted mt-xs">
                  {selectedItem.category}
                </div>
              )}
            </div>

            {selectedItem.usage && (
              <div className="bg-sakura-50 p-md rounded-md mb-md">
                <div className="font-bold text-sakura mb-xs">Cách sử dụng:</div>
                <div className="text-sm">{selectedItem.usage}</div>
              </div>
            )}

            {selectedItem.formation && (
              <div className="bg-sakura-50 p-md rounded-md mb-md">
                <div className="font-bold text-sakura mb-xs">Cấu trúc:</div>
                <div className="jp text-lg">{selectedItem.formation}</div>
              </div>
            )}

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
                {selectedItem.examples.map((ex, i) => {
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
              className={`btn w-full justify-center ${isMastered(selectedItem.id) ? "btn-success" : "btn-primary"}`}
              onClick={() => handleMaster(selectedItem)}
            >
              {isMastered(selectedItem.id)
                ? "Đã thuộc"
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

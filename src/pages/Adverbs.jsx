import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import ADVERBS from "../data/adverbs";
import FlashCard from "../components/ui/FlashCard";

function getAdverbsQuizQuestion(adverbs) {
  const item = adverbs[Math.floor(Math.random() * adverbs.length)];
  const others = [...adverbs]
    .filter((w) => w.id !== item.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  const options = [item, ...others].sort(() => 0.5 - Math.random());
  return {
    question: item,
    options,
    answer: item.id,
    selected: null,
  };
}

export default function Adverbs() {
  const { state, markSeen, markMastered, saveCurrentIndex } = useStore();
  const progress = state.progress.adverbs || {
    seen: [],
    mastered: [],
    currentIndex: 0,
  };

  const [mode, setMode] = useState("flashcard");
  const [currentIndex, setCurrentIndex] = useState(progress.currentIndex || 0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizState, setQuizState] = useState(null);

  useEffect(() => {
    saveCurrentIndex("adverbs", currentIndex);
  }, [currentIndex, saveCurrentIndex]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % ADVERBS.length);
    }, 150);
  };

  const handleKnow = () => {
    const adv = ADVERBS[currentIndex];
    markSeen("adverbs", adv.id);
    markMastered("adverbs", adv.id);
    handleNext();
  };

  const handleReview = () => {
    const adv = ADVERBS[currentIndex];
    markSeen("adverbs", adv.id);
    handleNext();
  };

  const generateQuiz = () => {
    const nextQuestion = getAdverbsQuizQuestion(ADVERBS);
    setQuizState(nextQuestion);
  };

  const startQuiz = () => {
    setMode("quiz");
    generateQuiz();
  };

  const handleOptionClick = (id) => {
    if (quizState.selected) return;
    setQuizState({ ...quizState, selected: id });
    if (id === quizState.answer) {
      markSeen("adverbs", quizState.question.id);
      markMastered("adverbs", quizState.question.id);
    }
    setTimeout(() => {
      generateQuiz();
    }, 1800);
  };

  const currentAdv = ADVERBS[currentIndex];

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h2>Phó Từ (Fukushi)</h2>
          <p className="text-muted mt-xs">30 phó từ N3 thường gặp nhất</p>
        </div>
        <div className="flex gap-sm">
          <button
            className={`btn ${mode === "flashcard" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setMode("flashcard")}
          >
            Thẻ Ghi Nhớ
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
          <span className="text-muted">Tiến độ Phó Từ</span>
          <span className="text-sakura">
            {progress.mastered.length} / {ADVERBS.length} (
            {Math.round((progress.mastered.length / ADVERBS.length) * 100)}%)
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{
              width: (progress.mastered.length / ADVERBS.length) * 100 + "%",
            }}
          ></div>
        </div>
      </div>

      {mode === "flashcard" && currentAdv && (
        <div className="flex-col items-center">
          <FlashCard
            front={currentAdv.word}
            backHeader={
              <div className="text-center">
                {currentAdv.reading} ({currentAdv.romaji})
              </div>
            }
            backBody={
              <div>
                <div className="text-xl font-bold mb-md text-sakura">
                  {currentAdv.meaning}
                </div>
                <div className="text-sm bg-sakura-50 p-md rounded-md">
                  <div className="jp mb-xs font-bold">{currentAdv.example}</div>
                  <div className="text-muted">{currentAdv.exMeaning}</div>
                </div>
              </div>
            }
            backFooter={
              <div className="text-xs text-muted text-center">
                Nhãn: {currentAdv.tags.join(", ")}
              </div>
            }
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            onKnow={handleKnow}
            onReview={handleReview}
          />
          <div
            className="flex items-center justify-between mt-lg w-full mx-auto"
            style={{ maxWidth: "400px" }}
          >
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsFlipped(false);
                setTimeout(
                  () =>
                    setCurrentIndex((i) =>
                      i > 0 ? i - 1 : ADVERBS.length - 1,
                    ),
                  150,
                );
              }}
            >
              &larr; Trước
            </button>
            <div className="text-sm font-medium text-muted">
              {currentIndex + 1} / {ADVERBS.length}
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsFlipped(false);
                setTimeout(
                  () => setCurrentIndex((i) => (i + 1) % ADVERBS.length),
                  150,
                );
              }}
            >
              Sau &rarr;
            </button>
          </div>
        </div>
      )}

      {mode === "quiz" && quizState && (
        <div className="quiz-container max-w-md mx-auto card card-body animate-slideUp">
          <div className="text-center mb-xl">
            <div className="text-sm text-muted mb-sm">
              Nghĩa của phó từ này là gì?
            </div>
            <div className="text-6xl font-bold jp text-sakura mt-sm mb-xs">
              {quizState.question.word}
            </div>
            <div className="text-md text-ink-40 mt-xs">
              {quizState.question.reading} ({quizState.question.romaji})
            </div>
          </div>

          <div className="flex-col gap-sm">
            {quizState.options.map((opt) => {
              let btnClass = "btn-secondary";
              if (quizState.selected) {
                if (opt.id === quizState.answer)
                  btnClass = "btn-success";
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
    </div>
  );
}

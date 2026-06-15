import { useState, useMemo, useEffect } from "react";
import { useStore } from "../store/useStore";
import VOCAB from "../data/vocab";
import FlashCard from "../components/ui/FlashCard";

export default function Vocab() {
  const { state, markSeen, markMastered, saveCurrentIndex } = useStore();
  const progress = state.progress.vocab || {
    seen: [],
    mastered: [],
    currentIndex: 0,
  };

  const [mode, setMode] = useState("flashcard");
  const [activeTab, setActiveTab] = useState("soumatome");
  const [currentIndex, setCurrentIndex] = useState(progress.currentIndex || 0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizState, setQuizState] = useState(null);

  const activeVocabList = useMemo(() => {
    if (activeTab === "soumatome")
      return VOCAB.filter((w) => !w.id.startsWith("jlpt"));
    return VOCAB.filter((w) => w.id.startsWith("jlpt"));
  }, [activeTab]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [activeTab]);

  useEffect(() => {
    saveCurrentIndex("vocab", currentIndex);
  }, [currentIndex, saveCurrentIndex]);

  // Flashcard Logic
  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % activeVocabList.length);
    }, 150);
  };

  const handleKnow = () => {
    const word = activeVocabList[currentIndex];
    if (word) {
      markSeen("vocab", word.id);
      markMastered("vocab", word.id);
    }
    handleNext();
  };

  const handleReview = () => {
    const word = activeVocabList[currentIndex];
    if (word) {
      markSeen("vocab", word.id);
    }
    handleNext();
  };

  const currentWord = activeVocabList[currentIndex];

  // Quiz Logic
  const generateQuiz = () => {
    const word =
      activeVocabList[Math.floor(Math.random() * activeVocabList.length)];
    const others = [...activeVocabList]
      .sort(() => 0.5 - Math.random())
      .filter((w) => w.id !== word.id)
      .slice(0, 3);
    const options = [word, ...others].sort(() => 0.5 - Math.random());
    setQuizState({ question: word, options, answer: word.id, selected: null });
  };

  const startQuiz = () => {
    setMode("quiz");
    generateQuiz();
  };

  const handleOptionClick = (id) => {
    if (quizState.selected) return; // already answered
    setQuizState({ ...quizState, selected: id });
    if (id === quizState.answer) {
      markSeen("vocab", quizState.question.id);
      markMastered("vocab", quizState.question.id);
    }
    setTimeout(() => {
      generateQuiz();
    }, 1500);
  };

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h2 className="gradient-text">Từ Vựng N3</h2>
          <p className="text-muted mt-xs font-medium">
            Sổ tay từ vựng & Flashcards
          </p>
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

      <div className="glass-tab-container mb-lg max-w-md mx-auto">
        <button
          className={`glass-tab-btn ${activeTab === "soumatome" ? "active" : ""}`}
          onClick={() => setActiveTab("soumatome")}
        >
          Soumatome (880 Từ)
        </button>
        <button
          className={`glass-tab-btn ${activeTab === "frequent" ? "active" : ""}`}
          onClick={() => setActiveTab("frequent")}
        >
          Hay Thi JLPT (50 Từ)
        </button>
      </div>

      <div className="glass-panel p-md mb-lg text-center hover-float">
        <div className="flex justify-between text-sm mb-sm font-bold">
          <span className="text-muted">
            Tiến độ ({activeTab === "soumatome" ? "Soumatome" : "JLPT N3"})
          </span>
          <span className="text-sakura">
            {
              progress.mastered.filter((id) =>
                activeVocabList.some((w) => w.id === id),
              ).length
            }{" "}
            / {activeVocabList.length}
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{
              width:
                (progress.mastered.filter((id) =>
                  activeVocabList.some((w) => w.id === id),
                ).length /
                  activeVocabList.length) *
                  100 +
                "%",
            }}
          ></div>
        </div>
      </div>

      {mode === "flashcard" && currentWord && (
        <div className="flex-col items-center pulse-glow rounded-xl">
          <FlashCard
            front={currentWord.word}
            backHeader={
              <div className="text-center">
                {currentWord.reading} ({currentWord.romaji})
              </div>
            }
            backBody={
              <div>
                <div className="text-xl font-bold mb-md text-sakura">
                  {currentWord.meaning}
                </div>
                <div className="text-sm bg-sakura-50 p-md rounded-md">
                  <div className="jp mb-xs">{currentWord.example}</div>
                  <div className="text-muted">{currentWord.exMeaning}</div>
                </div>
              </div>
            }
            backFooter={
              <div className="text-xs text-muted text-center">
                Từ loại: {currentWord.pos} | Nhãn: {currentWord.tags.join(", ")}
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
                      i > 0 ? i - 1 : activeVocabList.length - 1,
                    ),
                  150,
                );
              }}
            >
              &larr; Trước
            </button>
            <div className="text-sm font-medium text-muted">
              {currentIndex + 1} / {activeVocabList.length}
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsFlipped(false);
                setTimeout(
                  () =>
                    setCurrentIndex((i) => (i + 1) % activeVocabList.length),
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
              Nghĩa của từ này là gì?
            </div>
            <div className="text-6xl font-bold jp text-sakura mt-sm mb-xs">
              {quizState.question.word}
            </div>
            <div className="text-md text-ink-40 mt-xs blur-reveal">
              {quizState.question.reading}
            </div>
          </div>

          <div className="flex-col gap-sm">
            {quizState.options.map((opt) => {
              let btnClass = "btn-secondary";
              if (quizState.selected) {
                if (opt.id === quizState.answer)
                  btnClass = "btn-success"; // right answer always green
                else if (opt.id === quizState.selected)
                  btnClass = "btn-secondary text-error border-error"; // wrong selected
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

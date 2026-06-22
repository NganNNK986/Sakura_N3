import { useState, useMemo, useEffect } from "react";
import { useStore } from "../store/useStore";
import TULAYS from "../data/reduplication";
import FlashCard from "../components/ui/FlashCard";

export default function Tulays() {
  const { state, markSeen, markMastered, saveCurrentIndex } = useStore();
  const progress = state.progress.tulays || {
    seen: [],
    mastered: [],
    currentIndex: 0,
  };

  const [mode, setMode] = useState("flashcard");
  const [currentIndex, setCurrentIndex] = useState(progress.currentIndex || 0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizState, setQuizState] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredList = useMemo(() => {
    if (activeCategory === "all") return TULAYS;
    return TULAYS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const categories = useMemo(() => {
    const cats = [...new Set(TULAYS.map((item) => item.category))].sort();
    return cats;
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [activeCategory]);

  useEffect(() => {
    saveCurrentIndex("tulays", currentIndex);
  }, [currentIndex, saveCurrentIndex]);

  // Flashcard Logic
  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % filteredList.length);
    }, 150);
  };

  const handleKnow = () => {
    const item = filteredList[currentIndex];
    if (item) {
      markSeen("tulays", item.id);
      markMastered("tulays", item.id);
    }
    handleNext();
  };

  const handleReview = () => {
    const item = filteredList[currentIndex];
    if (item) {
      markSeen("tulays", item.id);
    }
    handleNext();
  };

  const currentItem = filteredList[currentIndex];

  // Quiz Logic
  const generateQuiz = () => {
    const item = filteredList[Math.floor(Math.random() * filteredList.length)];
    const others = [...filteredList]
      .sort(() => 0.5 - Math.random())
      .filter((w) => w.id !== item.id)
      .slice(0, 3);
    const options = [item, ...others].sort(() => 0.5 - Math.random());
    setQuizState({ question: item, options, answer: item.id, selected: null });
  };

  const startQuiz = () => {
    setMode("quiz");
    generateQuiz();
  };

  const handleOptionClick = (id) => {
    if (quizState.selected) return;
    setQuizState({ ...quizState, selected: id });
    if (id === quizState.answer) {
      markSeen("tulays", quizState.question.id);
      markMastered("tulays", quizState.question.id);
    }
    setTimeout(() => {
      generateQuiz();
    }, 1500);
  };

  if (filteredList.length === 0) {
    return (
      <div className="page-container animate-fadeIn">
        <div className="mb-lg">
          <h2 className="gradient-text">Từ Láy Tiếng Nhật</h2>
          <p className="text-muted mt-xs font-medium">
            Onomatopoeia & Reduplicated Words (90+ từ)
          </p>
        </div>
        <div className="glass-panel p-md text-center">
          <p className="text-muted">Không có từ láy trong danh mục này</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h2 className="gradient-text">Từ Láy Tiếng Nhật</h2>
          <p className="text-muted mt-xs font-medium">
            Onomatopoeia & Reduplicated Words
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

      <div className="glass-tab-container mb-lg">
        <button
          className={`glass-tab-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          Tất Cả ({TULAYS.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`glass-tab-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat} ({TULAYS.filter((t) => t.category === cat).length})
          </button>
        ))}
      </div>

      <div className="glass-panel p-md mb-lg text-center hover-float">
        <div className="flex justify-between text-sm mb-sm font-bold">
          <span className="text-muted">Tiến độ</span>
          <span className="text-sakura">
            {progress.mastered.filter((id) =>
              filteredList.some((w) => w.id === id)
            ).length}{" "}
            / {filteredList.length}
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{
              width:
                (progress.mastered.filter((id) =>
                  filteredList.some((w) => w.id === id)
                ).length /
                  filteredList.length) *
                  100 +
                "%",
            }}
          ></div>
        </div>
      </div>

      {mode === "flashcard" && currentItem && (
        <div className="flex-col items-center pulse-glow rounded-xl">
          <FlashCard
            front={currentItem.japanese}
            backHeader={
              <div className="text-center">
                <div className="text-lg font-bold mb-xs">
                  {currentItem.romaji}
                </div>
                <div className="text-sm text-muted">
                  {currentItem.category}
                </div>
              </div>
            }
            backBody={
              <div>
                <div className="text-2xl font-bold mb-md text-sakura">
                  {currentItem.meaning}
                </div>
                <div className="text-sm bg-sakura-50 p-md rounded-md">
                  <div className="jp mb-xs font-medium">{currentItem.example}</div>
                  <div className="text-muted text-xs">{currentItem.exMeaning}</div>
                </div>
              </div>
            }
            backFooter={
              <div className="text-xs text-muted text-center">
                {currentIndex + 1} / {filteredList.length}
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
                    setCurrentIndex((i) => (i - 1 + filteredList.length) % filteredList.length),
                  150
                );
              }}
              disabled={currentIndex === 0}
            >
              ← Quay lại
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsFlipped(false);
                setTimeout(
                  () => setCurrentIndex((i) => (i + 1) % filteredList.length),
                  150
                );
              }}
              disabled={currentIndex === filteredList.length - 1}
            >
              Tiếp →
            </button>
          </div>
        </div>
      )}

      {mode === "quiz" && quizState && (
        <div className="mb-lg">
          <div className="glass-panel p-lg">
            <div className="text-center mb-lg">
              <div className="text-5xl font-bold mb-md text-sakura jp">
                {quizState.question.japanese}
              </div>
              <div className="text-md text-muted mb-sm">
                {quizState.question.romaji}
              </div>
              <div className="text-sm text-muted italic">
                {quizState.question.category}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-md">
              {quizState.options.map((option) => (
                <button
                  key={option.id}
                  className={`quiz-option ${
                    quizState.selected === option.id
                      ? option.id === quizState.answer
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option.id)}
                  disabled={quizState.selected !== null}
                >
                  {option.meaning}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

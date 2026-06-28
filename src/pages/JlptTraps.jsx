import { useState, useMemo } from "react";
import { useStore } from "../store/useStore";
import JLPT_TRAPS, { getAllTrapItems } from "../data/jlptTraps";

const isJapanese = (str) => /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(str);

function formatCellContent(cell, isFirst) {
  if (typeof cell !== "string") return cell;
  
  if (isFirst && isJapanese(cell)) {
    const match = cell.match(/^([^\u3040-\u309F\u30A0-\u30FF\uff00-\uffef()（）\s]+)[（(]([\u3040-\u309F\u30A0-\u30FF\s]+)[）)]$/);
    if (match) {
      return (
        <span className="cell-jp">
          <strong className="font-jp text-base text-sakura-900">{match[1]}</strong>
          <span className="reading text-muted text-xs block font-jp">（{match[2]}）</span>
        </span>
      );
    }
    return <strong className="font-jp text-base text-sakura-900">{cell}</strong>;
  }

  if (cell.startsWith("❌")) {
    return <span className="text-error font-medium">{cell}</span>;
  }
  if (cell.startsWith("⚠️")) {
    return <span className="text-warning font-medium">{cell}</span>;
  }
  if (cell.startsWith("✅")) {
    return <span className="text-success font-medium">{cell}</span>;
  }

  // Format inline items like 「う」 or 「い」
  if (cell.includes("「") && cell.includes("」")) {
    return (
      <span>
        {cell.split(/(「.*?」)/g).map((part, i) => {
          if (part.startsWith("「") && part.endsWith("」")) {
            return (
              <code key={i} className="inline-code bg-sakura-100 text-sakura-700 px-xs py-xxs rounded font-jp">
                {part}
              </code>
            );
          }
          return part;
        })}
      </span>
    );
  }

  return cell;
}

function renderBlock(block, idx) {
  switch (block.type) {
    case "h1":
      return (
        <h3 key={idx} className="trap-h1 mt-xl mb-md pb-xs border-b border-sakura-200 text-sakura-700 font-bold flex items-center gap-xs">
          <span>{block.text}</span>
        </h3>
      );
    case "h2":
      return (
        <h4 key={idx} className="trap-h2 mt-lg mb-sm text-ink-70 font-semibold flex items-center gap-xs">
          <span>{block.text}</span>
        </h4>
      );
    case "h3":
      return (
        <h5 key={idx} className="trap-h3 mt-md mb-xs text-ink font-medium">
          {block.text}
        </h5>
      );
    case "p":
      return (
        <p key={idx} className="trap-p text-muted mb-md leading-relaxed text-sm">
          {block.text.split(/(「.*?」)/g).map((part, i) => {
            if (part.startsWith("「") && part.endsWith("」")) {
              return (
                <code key={i} className="inline-code bg-sakura-100 text-sakura-700 px-xs py-xxs rounded font-jp">
                  {part}
                </code>
              );
            }
            return part;
          })}
        </p>
      );
    case "list":
      return (
        <ul key={idx} className={`trap-list mb-md ${block.ordered ? "list-decimal" : "list-disc"} pl-lg text-sm text-muted`}>
          {block.items.map((item, lidx) => (
            <li key={lidx} className="mb-xs leading-relaxed">
              {item.split(/(「.*?」)/g).map((part, i) => {
                if (part.startsWith("「") && part.endsWith("」")) {
                  return (
                    <code key={i} className="inline-code bg-sakura-100 text-sakura-700 px-xs py-xxs rounded font-jp">
                      {part}
                    </code>
                  );
                }
                return part;
              })}
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div key={idx} className="trap-note card card-sm card-body bg-sakura-50 border border-sakura-200 mb-md p-md rounded-md">
          <span className="text-sm text-sakura-900 leading-relaxed font-medium">
            {block.text.split(/(「.*?」)/g).map((part, i) => {
              if (part.startsWith("「") && part.endsWith("」")) {
                return (
                  <code key={i} className="inline-code bg-sakura-200 text-sakura-700 px-xs py-xxs rounded font-jp">
                    {part}
                  </code>
                );
              }
              return part;
            })}
          </span>
        </div>
      );
    case "table":
      return (
        <div key={idx} className="trap-table-wrap mb-lg">
          <table className="trap-table">
            <thead>
              <tr>
                {block.headers.map((h, hidx) => (
                  <th key={hidx}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ridx) => (
                <tr key={ridx}>
                  {row.map((cell, cidx) => (
                    <td key={cidx}>
                      {formatCellContent(cell, cidx === 0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

function getRandomQuizQuestion(allItems, historySoFar) {
  const availableItems = allItems.filter(
    (item) => !historySoFar.some((h) => h.item.word === item.word)
  );

  const item = availableItems[Math.floor(Math.random() * availableItems.length)] || allItems[Math.floor(Math.random() * allItems.length)];
  
  // Clean and split trap readings for distractors
  const wrongReadings = item.trap
    .split(/[/,]/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && !t.includes("(") && !t.includes("⚠️") && !t.includes("⚠"));
    
  // Collect other words' readings as distractors
  const otherReadings = allItems
    .filter((i) => i.word !== item.word)
    .map((i) => i.reading)
    .filter((r) => r && r !== item.reading)
    .sort(() => 0.5 - Math.random());

  const distractors = [...wrongReadings, ...otherReadings]
    .filter((v, i, a) => a.indexOf(v) === i && v !== item.reading)
    .slice(0, 3);

  const options = [item.reading, ...distractors]
    .sort(() => 0.5 - Math.random());

  return {
    item,
    options,
    answer: item.reading,
  };
}

export default function JlptTraps() {
  const { markMastered } = useStore();
  const [mode, setMode] = useState("study");
  const [activeSection, setActiveSection] = useState("bay-1-1-truong-am-am-on-kun");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Quiz states
  const [quizState, setQuizState] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizHistory, setQuizHistory] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0); // 1 to 10
  const [showScoreCard, setShowScoreCard] = useState(false);

  const allItems = useMemo(() => getAllTrapItems(), []);
  const totalItems = allItems.length;

  // Search filter
  const filteredBlocks = useMemo(() => {
    if (!searchQuery) return null;
    const query = searchQuery.toLowerCase();
    
    // Find blocks containing query
    const results = [];
    JLPT_TRAPS.sections.forEach((section) => {
      section.blocks.forEach((block) => {
        let match = false;
        if (block.text && block.text.toLowerCase().includes(query)) match = true;
        if (block.items && block.items.some((item) => item.toLowerCase().includes(query))) match = true;
        if (block.rows && block.rows.some((row) => row.some((cell) => cell.toLowerCase().includes(query)))) match = true;
        
        if (match) {
          results.push({
            sectionTitle: section.title,
            sectionId: section.id,
            block,
          });
        }
      });
    });
    return results;
  }, [searchQuery]);

  // Generate a quiz question
  const generateQuizQuestion = (currentIndex, scoreSoFar, historySoFar) => {
    if (currentIndex >= 10) {
      setShowScoreCard(true);
      return;
    }

    const nextQuestion = getRandomQuizQuestion(allItems, historySoFar);

    setQuizState({
      ...nextQuestion,
      selected: null,
    });
    setQuizIndex(currentIndex + 1);
  };

  const startQuiz = () => {
    setMode("quiz");
    setQuizScore(0);
    setQuizHistory([]);
    setShowScoreCard(false);
    generateQuizQuestion(0, 0, []);
  };

  const handleOptionClick = (opt) => {
    if (quizState.selected) return;
    
    const isCorrect = opt === quizState.answer;
    const newScore = isCorrect ? quizScore + 1 : quizScore;
    const newHistory = [...quizHistory, { item: quizState.item, correct: isCorrect, selected: opt }];
    
    setQuizScore(newScore);
    setQuizHistory(newHistory);
    setQuizState({ ...quizState, selected: opt });

    if (isCorrect) {
      markMastered("traps", quizState.item.id);
    }

    setTimeout(() => {
      generateQuizQuestion(quizIndex, newScore, newHistory);
    }, 1800);
  };

  const activeSectionData = useMemo(() => {
    return JLPT_TRAPS.sections.find((s) => s.id === activeSection) || JLPT_TRAPS.sections[0];
  }, [activeSection]);

  return (
    <div className="page-container animate-fadeIn">
      {/* Header Panel */}
      <div className="flex items-center justify-between mb-lg flex-wrap gap-sm">
        <div>
          <h2>Bẫy Đọc JLPT N3</h2>
          <p className="text-muted mt-xs">{totalItems} từ trọng tâm · Trích xuất từ đề thi thực tế</p>
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

      {mode === "quiz" ? (
        showScoreCard ? (
          /* Score Card */
          <div className="card card-body quiz-score-card animate-scaleUp">
            <span className="trophy-icon">🏆</span>
            <h3>Hoàn thành bài luyện tập!</h3>
            <p className="score-text">
              Bạn trả lời đúng <strong>{quizScore}</strong> / 10 câu
            </p>
            <p className="xp-text text-success font-medium mb-lg">
              +{quizScore * 5} XP đã được cộng vào tài khoản!
            </p>
            
            <div className="review-list mb-xl text-left">
              <h4 className="mb-sm text-sakura-900 border-b border-sakura-200 pb-xs">Xem lại đáp án:</h4>
              <div className="review-scroll">
                {quizHistory.map((h, i) => (
                  <div key={i} className="review-item flex items-center justify-between py-sm border-b border-sakura-50">
                    <div>
                      <span className="font-jp font-bold text-base text-sakura-900">{h.item.word}</span>
                      <span className="text-muted text-xs ml-sm">({h.item.meaning})</span>
                    </div>
                    <div className="flex items-center gap-sm">
                      <span className="text-xs text-muted">Bẫy: <span className="text-error font-jp">{h.item.trap}</span></span>
                      <span className={`badge ${h.correct ? "badge-green" : "badge-sakura"}`}>
                        {h.correct ? `Đúng: ${h.item.reading}` : `Chọn: ${h.selected}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-md justify-center">
              <button className="btn btn-primary" onClick={startQuiz}>
                Luyện Tập Lại
              </button>
              <button className="btn btn-secondary" onClick={() => setMode("study")}>
                Quay Lại Học
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Question */
          quizState && (
            <div className="card card-body quiz-panel animate-scaleUp">
              <div className="flex justify-between items-center mb-md text-sm text-muted">
                <span>Câu hỏi {quizIndex} / 10</span>
                <span>Đúng: {quizScore}</span>
              </div>
              <div className="quiz-progress-bar-wrap mb-lg">
                <div className="quiz-progress-bar" style={{ width: `${(quizIndex / 10) * 100}%` }}></div>
              </div>
              <p className="text-muted text-sm mb-xs">Chọn cách đọc Hiragana đúng cho từ:</p>
              <div className="quiz-word font-jp mb-xxs">{quizState.item.word}</div>
              <p className="text-muted text-base mb-xl">Ý nghĩa: {quizState.item.meaning}</p>
              
              <div className="quiz-options mb-lg">
                {quizState.options.map((opt) => {
                  const isCorrect = opt === quizState.answer;
                  const isSelected = opt === quizState.selected;
                  let cls = "quiz-opt";
                  if (quizState.selected) {
                    if (isCorrect) cls += " correct animate-pulse";
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
                <div className="quiz-feedback-box animate-slideUp bg-sakura-50 border border-sakura-200 p-md rounded-md text-sm">
                  {quizState.selected === quizState.answer ? (
                    <span className="text-success font-semibold">✓ Chính xác! +5 XP</span>
                  ) : (
                    <span className="text-error font-semibold">✗ Chưa đúng rồi! Đáp án đúng là {quizState.answer}</span>
                  )}
                  {quizState.item.trap && (
                    <p className="mt-xs text-muted">
                      💡 <strong>Bẫy đề thi:</strong> Cảnh giác đọc nhầm thành ❌ <span className="text-error font-jp font-bold">{quizState.item.trap}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        )
      ) : (
        /* Study Mode */
        <>
          {/* Search Bar */}
          <div className="search-wrap mb-lg flex gap-sm items-center card card-sm card-body p-sm">
            <span style={{ fontSize: "1.2rem", paddingLeft: "8px" }}>🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng, chữ Hán, ý nghĩa hoặc bẫy đọc..."
              className="search-input w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm kiếm bẫy đọc"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>

          {searchQuery ? (
            /* Search Results */
            <div className="search-results-panel">
              <h3 className="mb-md">Kết quả tìm kiếm cho: "{searchQuery}"</h3>
              {filteredBlocks.length === 0 ? (
                <p className="text-muted card card-body p-xl text-center">Không tìm thấy nội dung phù hợp. Thử từ khóa khác nhé!</p>
              ) : (
                filteredBlocks.map((res, i) => (
                  <div key={i} className="search-result-card card card-body mb-md">
                    <div className="flex justify-between items-center mb-sm">
                      <span className="badge badge-sakura text-xs">{res.sectionTitle}</span>
                      <button
                        className="text-xs text-sakura-700 font-medium"
                        onClick={() => {
                          setActiveSection(res.sectionId);
                          setSearchQuery("");
                        }}
                      >
                        Đến chương này →
                      </button>
                    </div>
                    <div>{renderBlock(res.block, i)}</div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Standard Sections View */
            <div className="study-layout">
              {/* Horizontal Scrollable Tabs */}
              <div className="tabs-bar mb-lg">
                {JLPT_TRAPS.sections.map((s) => (
                  <button
                    key={s.id}
                    className={`tab-btn ${activeSection === s.id ? "active" : ""}`}
                    onClick={() => setActiveSection(s.id)}
                  >
                    {s.title.replace(/Bẫy \d+(\.\d+)?:\s*/, "")}
                  </button>
                ))}
              </div>

              {/* Active Section Content */}
              <div className="card card-body active-section-card animate-fadeIn">
                <div className="section-header mb-lg">
                  <h2 className="section-title text-sakura-900 font-bold">{activeSectionData.title}</h2>
                </div>
                
                <div className="section-blocks">
                  {activeSectionData.blocks.map((block, bidx) => renderBlock(block, bidx))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Study Tips Card */}
          <div className="card card-body tips-card mt-xl">
            <h3 className="mb-sm text-sakura-900">{JLPT_TRAPS.tips.title}</h3>
            <p className="mb-sm text-muted text-sm">{JLPT_TRAPS.tips.intro}</p>
            <ul className="tips-list mb-md">
              {JLPT_TRAPS.tips.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="text-sm text-muted leading-relaxed">{JLPT_TRAPS.tips.conclusion}</p>
          </div>
        </>
      )}

      <style>{`
        /* Design System Styles */
        .page-container {
          max-width: 900px;
          margin: 0 auto;
          padding-bottom: var(--space-3xl);
        }
        
        /* Study Tabs */
        .tabs-bar {
          display: flex;
          gap: var(--space-sm);
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
          border-bottom: 2px solid var(--sakura-100);
        }
        .tabs-bar::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          white-space: nowrap;
          padding: 8px 16px;
          border: none;
          background: none;
          border-bottom: 3px solid transparent;
          color: var(--ink-40);
          font-weight: 500;
          font-size: 0.9rem;
          transition: all var(--trans-fast);
        }
        .tab-btn:hover {
          color: var(--sakura-700);
          background: var(--sakura-50);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
        }
        .tab-btn.active {
          color: var(--sakura-700);
          border-bottom-color: var(--sakura-500);
          font-weight: 700;
        }

        /* Block Elements */
        .trap-h1 {
          font-size: 1.3rem;
          padding-bottom: 6px;
        }
        .trap-h2 {
          font-size: 1.1rem;
        }
        .trap-h3 {
          font-size: 0.98rem;
        }
        .trap-p {
          font-size: 0.88rem;
        }

        /* Search input styling */
        .search-input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.95rem;
          color: var(--ink);
        }
        .search-clear-btn {
          background: none;
          color: var(--ink-40);
          font-size: 0.9rem;
          padding: 4px;
        }
        .search-clear-btn:hover {
          color: var(--sakura-700);
        }

        /* Tables and formatting */
        .trap-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--sakura-200);
          border-radius: var(--radius-md);
          background: white;
          box-shadow: var(--shadow-sm);
        }
        .trap-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .trap-table th {
          background: var(--sakura-100);
          color: var(--sakura-900);
          font-weight: 600;
          text-align: left;
          padding: 12px var(--space-md);
          border-bottom: 2px solid var(--sakura-200);
        }
        .trap-table td {
          padding: 10px var(--space-md);
          border-bottom: 1px solid var(--sakura-100);
          color: var(--ink-70);
          vertical-align: middle;
        }
        .trap-table tr:last-child td {
          border-bottom: none;
        }
        .trap-table tr:hover td {
          background: var(--sakura-50);
        }
        .cell-jp {
          display: inline-flex;
          flex-direction: column;
        }
        .reading {
          margin-top: 1px;
        }
        .trap-wrong {
          color: var(--error);
          font-weight: 500;
        }

        /* Tips Card */
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
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Quiz Panel */
        .quiz-panel {
          max-width: 520px;
          margin: var(--space-lg) auto;
          padding: var(--space-xl);
          border: 1px solid var(--sakura-200);
          box-shadow: var(--shadow-lg);
        }
        .quiz-progress-bar-wrap {
          width: 100%;
          height: 6px;
          background: var(--pale);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .quiz-progress-bar {
          height: 100%;
          background: var(--sakura-400);
          border-radius: var(--radius-full);
          transition: width 0.3s ease;
        }
        .quiz-word {
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--sakura-700);
          text-align: center;
        }
        .quiz-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
        }
        @media(max-width: 480px) {
          .quiz-options {
            grid-template-columns: 1fr;
            gap: var(--space-sm);
          }
        }
        .quiz-opt {
          padding: 16px;
          border: 2px solid var(--sakura-200);
          border-radius: var(--radius-md);
          background: white;
          font-family: var(--font-jp);
          font-size: 1.05rem;
          color: var(--ink);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--trans-fast);
          box-shadow: var(--shadow-sm);
          text-align: center;
        }
        .quiz-opt:hover:not(:disabled) {
          border-color: var(--sakura-400);
          background: var(--sakura-50);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .quiz-opt.correct {
          border-color: var(--spring-green);
          background: var(--spring-green-light);
          color: var(--spring-green);
          font-weight: 700;
        }
        .quiz-opt.wrong {
          border-color: var(--error);
          background: var(--error-light);
          color: var(--error);
        }
        .quiz-feedback-box {
          text-align: left;
        }

        /* Score Card */
        .quiz-score-card {
          max-width: 540px;
          margin: var(--space-lg) auto;
          text-align: center;
          padding: var(--space-2xl) var(--space-xl);
          border: 1px solid var(--sakura-200);
          box-shadow: var(--shadow-lg);
        }
        .trophy-icon {
          font-size: 3.5rem;
          display: block;
          margin-bottom: var(--space-md);
          animation: float 2s infinite ease-in-out;
        }
        .score-text {
          font-size: 1.25rem;
          color: var(--ink-70);
          margin-top: var(--space-sm);
        }
        .score-text strong {
          font-size: 2rem;
          color: var(--sakura-700);
        }
        .xp-text {
          font-size: 0.95rem;
        }
        .review-scroll {
          max-height: 250px;
          overflow-y: auto;
          padding-right: var(--space-xs);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .font-jp {
          font-family: var(--font-jp);
        }
      `}</style>
    </div>
  );
}

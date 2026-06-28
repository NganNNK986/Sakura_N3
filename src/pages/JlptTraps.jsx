import { useState, useMemo } from "react";
import { useStore } from "../store/useStore";
import JLPT_TRAPS, { getAllTrapItems } from "../data/jlptTraps";

const isJapanese = (str) => /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(str);

function formatText(text) {
  if (typeof text !== "string") return text;
  
  // Split on quotes 「...」
  const parts = text.split(/(「.*?」)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("「") && part.endsWith("」")) {
      return (
        <strong key={idx} className="font-jp text-sakura-700 font-bold" style={{ fontSize: "1.08em" }}>
          {part}
        </strong>
      );
    }
    
    // Bold labels like Chú ý:, Lưu ý:, Mẹo:, Ví dụ:
    const labelRegex = /^(Chú ý:|Lưu ý:|Mẹo:|Ví dụ:)(.*)$/i;
    const labelMatch = part.match(labelRegex);
    if (labelMatch) {
      return (
        <span key={idx}>
          <strong className="text-sakura-900 font-bold">{labelMatch[1]}</strong>
          {labelMatch[2]}
        </span>
      );
    }
    
    return part;
  });
}

function TrapCell({ content }) {
  const [show, setShow] = useState(false);
  
  const formattedContent = useMemo(() => {
    if (typeof content !== "string") return content;
    if (content.startsWith("❌")) {
      const textPart = content.replace(/^❌\s*/, "");
      return (
        <span className="trap-wrong-badge text-strike">
          ❌ <del>{textPart}</del>
        </span>
      );
    }
    if (content.startsWith("⚠️")) {
      const textPart = content.replace(/^⚠️\s*/, "");
      return (
        <span className="trap-warning-badge text-strike">
          ⚠️ <del>{textPart}</del>
        </span>
      );
    }
    return <del>{content}</del>;
  }, [content]);

  return (
    <div 
      className={`trap-cell-interactive ${show ? "revealed" : ""}`}
      onClick={() => setShow(!show)}
      title="Click để ẩn/hiển thị bẫy học tập"
    >
      {show ? (
        formattedContent
      ) : (
        <span className="trap-reveal-placeholder">
          👁️ Xem bẫy thi
        </span>
      )}
    </div>
  );
}

function formatCellContent(cell, isFirst) {
  if (typeof cell !== "string") return cell;
  
  if (isFirst && isJapanese(cell)) {
    const match = cell.match(/^([^\u3040-\u309F\u30A0-\u30FF\uff00-\uffef()（）\s]+)[（(]([\u3040-\u309F\u30A0-\u30FF\s]+)[）)]$/);
    if (match) {
      return (
        <span className="cell-jp">
          <strong className="font-jp text-sakura-900 font-bold" style={{ fontSize: "1.15rem" }}>{match[1]}</strong>
          <span className="correct-reading-badge font-jp">👉 {match[2]}</span>
        </span>
      );
    }
    return <strong className="font-jp text-sakura-900 font-bold" style={{ fontSize: "1.15rem" }}>{cell}</strong>;
  }

  if (cell.startsWith("❌")) {
    return <span className="trap-wrong-badge">{cell}</span>;
  }
  if (cell.startsWith("⚠️")) {
    return <span className="trap-warning-badge">{cell}</span>;
  }
  if (cell.startsWith("✅")) {
    return <span className="trap-success-badge">{cell}</span>;
  }

  return formatText(cell);
}

function renderBlock(block, idx) {
  switch (block.type) {
    case "h1":
      return (
        <h3 key={idx} className="trap-h1 mt-xl mb-md pb-xs border-b border-sakura-200 text-sakura-900 font-bold flex items-center gap-xs">
          <span>{formatText(block.text)}</span>
        </h3>
      );
    case "h2":
      return (
        <h4 key={idx} className="trap-h2 mt-lg mb-sm text-sakura-700 font-bold flex items-center gap-xs">
          <span>{formatText(block.text)}</span>
        </h4>
      );
    case "h3":
      return (
        <h5 key={idx} className="trap-h3 mt-md mb-xs text-ink font-bold">
          {formatText(block.text)}
        </h5>
      );
    case "p":
      return (
        <p key={idx} className="trap-p text-ink-70 mb-md leading-relaxed">
          {formatText(block.text)}
        </p>
      );
    case "list":
      return (
        <ul key={idx} className={`trap-list mb-md ${block.ordered ? "list-decimal" : "list-disc"} pl-lg text-ink-70`}>
          {block.items.map((item, lidx) => (
            <li key={lidx} className="mb-xs leading-relaxed">
              {formatText(item)}
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div key={idx} className="trap-note mb-md">
          {formatText(block.text)}
        </div>
      );
    case "table": {
      const headers = block.headers.map((h) => h.toLowerCase());
      const trapColIdx = headers.findIndex((h) => h.includes("bẫy") || h.includes("nhầm") || h.includes("sai"));
      
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
                      {cidx === trapColIdx ? (
                        <TrapCell content={cell} />
                      ) : (
                        formatCellContent(cell, cidx === 0)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
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
                      💡 <strong>Cảnh giác bẫy:</strong> Không đọc nhầm thành <span className="text-error font-jp font-bold" style={{ textDecoration: "line-through", textDecorationThickness: "2px" }}>❌ {quizState.item.trap}</span>
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
          max-width: 960px;
          margin: 0 auto;
          padding-bottom: var(--space-3xl);
        }
        
        /* Study Tabs */
        .tabs-bar {
          display: flex;
          gap: var(--space-md);
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          padding: 8px 4px var(--space-md) 4px;
          border-bottom: 2px solid var(--sakura-200);
        }
        .tabs-bar::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          white-space: nowrap;
          padding: 10px 20px;
          border: 1px solid var(--sakura-200);
          background: white;
          border-radius: var(--radius-full);
          color: var(--ink-70);
          font-weight: 600;
          font-size: 0.95rem;
          transition: all var(--trans-spring);
          box-shadow: var(--shadow-sm);
        }
        .tab-btn:hover {
          color: var(--sakura-700);
          border-color: var(--sakura-400);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .tab-btn.active {
          color: white;
          background: linear-gradient(135deg, var(--sakura-500), var(--sakura-700));
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(180, 50, 90, 0.2);
        }

        /* Block Elements */
        .active-section-card {
          padding: var(--space-xl) !important;
          background: var(--bg-card);
        }
        .section-header {
          border-bottom: 2px dashed var(--sakura-200);
          padding-bottom: var(--space-md);
          margin-bottom: var(--space-lg);
        }
        .section-title {
          font-size: 1.6rem;
          font-weight: 800;
          background: linear-gradient(120deg, var(--sakura-900), var(--sakura-700));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .trap-h1 {
          font-size: 1.4rem;
          font-weight: 800;
          padding-bottom: 8px;
          color: var(--sakura-800) !important;
        }
        .trap-h2 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-top: var(--space-xl) !important;
          color: var(--sakura-700) !important;
        }
        .trap-h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--ink) !important;
          margin-top: var(--space-lg) !important;
        }
        .trap-p {
          font-size: 1rem;
          color: var(--ink-70);
          line-height: 1.7;
          margin-bottom: var(--space-md);
        }

        /* List Cards styling */
        .trap-list {
          list-style: none;
          padding-left: 0;
        }
        .trap-list li {
          position: relative;
          padding: 14px 16px 14px 40px;
          background: white;
          border-radius: var(--radius-md);
          margin-bottom: var(--space-sm);
          box-shadow: var(--shadow-sm);
          border-left: 4px solid var(--sakura-300);
          transition: all var(--trans-spring);
          font-size: 0.95rem;
          color: var(--ink-70);
          line-height: 1.6;
        }
        .trap-list li:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-md);
          border-left-color: var(--sakura-500);
          background: var(--sakura-50);
        }
        .trap-list li::before {
          content: "🌸";
          position: absolute;
          left: 14px;
          top: 15px;
          font-size: 0.9rem;
          line-height: 1;
        }

        /* Note callout styling */
        .trap-note {
          background: linear-gradient(135deg, var(--sakura-50), rgba(255, 255, 255, 0.9));
          border: 1px solid var(--sakura-200);
          border-left: 5px solid var(--sakura-500);
          padding: var(--space-md) var(--space-lg);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-md);
          font-size: 1rem;
          color: var(--sakura-900);
          line-height: 1.65;
          box-shadow: var(--shadow-sm);
          font-weight: 500;
        }

        /* Search input styling */
        .search-wrap {
          border: 2px solid var(--sakura-100);
          transition: border-color var(--trans-fast);
        }
        .search-wrap:focus-within {
          border-color: var(--sakura-300);
        }
        .search-input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 1rem;
          color: var(--ink);
          font-weight: 500;
        }
        .search-clear-btn {
          background: none;
          color: var(--ink-40);
          font-size: 1rem;
          padding: 6px;
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
          margin-bottom: var(--space-xl);
        }
        .trap-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }
        .trap-table th {
          background: var(--sakura-100);
          color: var(--sakura-900);
          font-weight: 700;
          text-align: left;
          padding: 14px var(--space-md);
          border-bottom: 2px solid var(--sakura-200);
        }
        .trap-table td {
          padding: 14px var(--space-md);
          border-bottom: 1px solid var(--sakura-100);
          color: var(--ink-70);
          vertical-align: middle;
          line-height: 1.6;
        }
        .trap-table tr:last-child td {
          border-bottom: none;
        }
        .trap-table tr:nth-child(even) td {
          background-color: var(--sakura-50) / 10%;
        }
        .trap-table tr:hover td {
          background: var(--sakura-50);
        }
        .cell-jp {
          display: inline-flex;
          flex-direction: column;
        }
        .reading {
          margin-top: 2px;
          font-size: 0.8rem;
          color: var(--ink-40);
        }

        /* Interactive Reveal Trap Cell */
        .trap-cell-interactive {
          display: inline-block;
          cursor: pointer;
        }
        .trap-reveal-placeholder {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          color: var(--ink-40);
          border: 1px dashed var(--sakura-300);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all var(--trans-fast);
        }
        .trap-reveal-placeholder:hover {
          background: var(--sakura-50);
          color: var(--sakura-700);
          border-color: var(--sakura-500);
        }
        .text-strike del {
          text-decoration: line-through;
          opacity: 0.75;
          text-decoration-color: var(--error);
          text-decoration-thickness: 2px;
        }

        /* Correct Reading Badge */
        .correct-reading-badge {
          display: inline-block;
          margin-top: 4px;
          background: var(--spring-green-light);
          color: var(--spring-green);
          border: 1px solid #c8edd7;
          padding: 3px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          font-weight: 700;
        }

        /* Trap Badges */
        .trap-wrong-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--error-light);
          color: var(--error);
          border: 1px solid #fee2e2;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 700;
          font-family: var(--font-jp);
        }
        .trap-warning-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--gold-light);
          color: #b7791f;
          border: 1px solid #fef3c7;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 700;
          font-family: var(--font-jp);
        }
        .trap-success-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--spring-green-light);
          color: var(--spring-green);
          border: 1px solid #c8edd7;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 700;
          font-family: var(--font-jp);
        }

        /* Tips Card */
        .tips-card {
          background: linear-gradient(135deg, var(--sakura-50), white);
          border: 1px solid var(--sakura-200);
          padding: var(--space-xl) !important;
        }
        .tips-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
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
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
        }

        /* Quiz Panel */
        .quiz-panel {
          max-width: 560px;
          margin: var(--space-xl) auto;
          padding: var(--space-2xl);
          border: 1px solid var(--sakura-200);
          box-shadow: var(--shadow-lg);
          background: white;
          border-radius: var(--radius-lg);
        }
        .quiz-progress-bar-wrap {
          width: 100%;
          height: 8px;
          background: var(--pale);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .quiz-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--sakura-400), var(--sakura-500));
          border-radius: var(--radius-full);
          transition: width 0.3s ease;
        }
        .quiz-word {
          font-size: 3.2rem;
          font-weight: 800;
          color: var(--sakura-700);
          text-align: center;
          text-shadow: 0 2px 4px rgba(180, 50, 90, 0.05);
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
          padding: 18px;
          border: 2px solid var(--sakura-200);
          border-radius: var(--radius-md);
          background: white;
          font-family: var(--font-jp);
          font-size: 1.1rem;
          color: var(--ink);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--trans-spring);
          box-shadow: var(--shadow-sm);
          text-align: center;
        }
        .quiz-opt:hover:not(:disabled) {
          border-color: var(--sakura-500);
          background: var(--sakura-50);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .quiz-opt.correct {
          border-color: var(--spring-green);
          background: var(--spring-green-light);
          color: var(--spring-green);
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(91, 173, 122, 0.15);
        }
        .quiz-opt.wrong {
          border-color: var(--error);
          background: var(--error-light);
          color: var(--error);
          box-shadow: 0 4px 10px rgba(224, 82, 82, 0.15);
        }
        .quiz-feedback-box {
          text-align: left;
          font-size: 0.95rem;
          line-height: 1.6;
          border-left: 4px solid var(--sakura-500);
        }

        /* Score Card */
        .quiz-score-card {
          max-width: 580px;
          margin: var(--space-xl) auto;
          text-align: center;
          padding: var(--space-3xl) var(--space-xl);
          border: 1px solid var(--sakura-200);
          box-shadow: var(--shadow-lg);
          background: white;
          border-radius: var(--radius-lg);
        }
        .trophy-icon {
          font-size: 4rem;
          display: block;
          margin-bottom: var(--space-md);
          animation: float 2.5s infinite ease-in-out;
        }
        .score-text {
          font-size: 1.4rem;
          color: var(--ink-70);
          margin-top: var(--space-sm);
        }
        .score-text strong {
          font-size: 2.4rem;
          color: var(--sakura-700);
        }
        .xp-text {
          font-size: 1.05rem;
        }
        .review-scroll {
          max-height: 280px;
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

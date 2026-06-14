import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import MOCKTEST from '../data/mocktest';

export default function MockTest() {
  const navigate = useNavigate();
  const { setLastTestResult } = useStore();
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MOCKTEST.totalTime * 60);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  // All questions flattened
  const allQuestions = MOCKTEST.sections.flatMap(s => s.questions.map(q => ({...q, sectionId: s.id})));

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && started) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const handleStart = () => {
    if (confirm('Bắt đầu làm bài thi? Thời gian: 100 phút. (Không bao gồm bài Nghe)')) {
      setStarted(true);
    }
  };

  const handleSelect = (qId, optIdx) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    const results = {
      date: Date.now(),
      score: 0,
      total: allQuestions.length,
      sections: {},
      weaknesses: {}
    };

    allQuestions.forEach(q => {
      if (!results.sections[q.sectionId]) results.sections[q.sectionId] = { correct: 0, total: 0 };
      results.sections[q.sectionId].total++;
      
      const isCorrect = answers[q.id] === q.answer;
      if (isCorrect) {
        results.score++;
        results.sections[q.sectionId].correct++;
      } else {
        q.tags.forEach(tag => {
          results.weaknesses[tag] = (results.weaknesses[tag] || 0) + 1;
        });
      }
    });

    // Scale score to 120 (since max score without listening is usually 120)
    results.scaledScore = Math.round((results.score / results.total) * 120);
    
    setLastTestResult(results);
    navigate('/results');
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!started) {
    return (
      <div className="page-container animate-fadeIn flex flex-col items-center justify-center text-center" style={{minHeight:'60vh'}}>
        <div className="text-6xl mb-md">📝</div>
        <h2 className="mb-sm">Thi Thử JLPT N3</h2>
        <p className="text-muted mb-lg max-w-md mx-auto">
          Bài thi mô phỏng JLPT N3 thực tế. 
          Bao gồm phần Từ vựng, Chữ Hán, Ngữ pháp và Đọc hiểu. 
          <strong> Không bao gồm phần Nghe (Choukai) theo yêu cầu.</strong>
        </p>
        
        <div className="card card-body text-left mb-xl max-w-md mx-auto w-full">
          <div className="font-bold mb-sm text-sakura">Cấu trúc đề thi:</div>
          <ul className="pl-md mb-md m-0">
            {MOCKTEST.sections.map(s => (
              <li key={s.id} className="mb-xs">{s.name} ({s.questions.length} câu)</li>
            ))}
          </ul>
          <div className="flex justify-between items-center pt-sm border-t border-pale">
            <span className="font-medium">Tổng thời gian:</span>
            <span className="font-bold text-lg">{MOCKTEST.totalTime} Phút</span>
          </div>
        </div>

        <button className="btn btn-primary btn-lg" onClick={handleStart}>
          ▶️ BẮT ĐẦU THI
        </button>
      </div>
    );
  }

  return (
    <div className="page-container animate-fadeIn relative">
      <div className="mock-header flex items-center justify-between card card-body mb-lg sticky top-0" style={{zIndex:10, padding:'12px 24px'}}>
        <div className="font-bold">Thi Thử N3</div>
        <div className="timer font-mono text-xl font-bold" style={{color: timeLeft < 300 ? 'var(--error)' : 'var(--ink)'}}>
          ⏱️ {formatTime(timeLeft)}
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowConfirm(true)}>Nộp Bài</button>
      </div>

      <div className="flex-col gap-xl">
        {MOCKTEST.sections.map((section, sIdx) => (
          <div key={section.id} className="section-container">
            <h3 className="section-title text-2xl mb-md border-b-2 border-sakura-200 pb-sm text-sakura-700">
              Phần {sIdx + 1}: {section.name}
            </h3>
            <div className="flex-col gap-lg">
              {section.questions.map((q, qIdx) => (
                <div key={q.id} className="question-card card card-body">
                  <div className="q-number badge badge-sakura mb-sm inline-block">Câu {qIdx + 1}</div>
                  {q.question.split('\n').map((line, i) => (
                    <p key={i} className={`jp mb-sm ${line.startsWith('「') ? 'pl-md border-l-4 border-sakura-200 bg-sakura-50 p-sm' : 'font-medium text-lg'}`}>{line}</p>
                  ))}
                  <div className="options-grid mt-md">
                    {q.options.map((opt, oIdx) => (
                      <label 
                        key={oIdx} 
                        className={`option-label ${answers[q.id] === oIdx ? 'selected' : ''}`}
                      >
                        <input 
                          type="radio" 
                          name={q.id} 
                          checked={answers[q.id] === oIdx}
                          onChange={() => handleSelect(q.id, oIdx)}
                          className="mr-sm hidden"
                        />
                        <div className="opt-circle">{oIdx + 1}</div>
                        <div className="opt-text jp">{opt}</div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-xl mb-xl">
        <button className="btn btn-primary btn-lg" onClick={() => setShowConfirm(true)}>Nộp Bài</button>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box text-center">
            <h3 className="mb-sm">Bạn muốn nộp bài?</h3>
            <p className="mb-lg">Đã làm: {Object.keys(answers).length} / {allQuestions.length} câu</p>
            <div className="flex gap-md">
              <button className="btn btn-secondary flex-1" onClick={() => setShowConfirm(false)}>Quay lại làm tiếp</button>
              <button className="btn btn-primary flex-1" onClick={handleSubmit}>Chắc chắn nộp</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .options-grid { display:flex; flex-direction:column; gap:var(--space-sm); }
        .option-label {
          display:flex; align-items:center; padding:var(--space-sm) var(--space-md);
          border:1px solid var(--pale); border-radius:var(--radius-md);
          cursor:pointer; transition:all 0.2s; background:var(--bg-card);
        }
        .option-label:hover { border-color:var(--sakura-300); background:var(--sakura-50); }
        .option-label.selected { border-color:var(--sakura-500); background:var(--sakura-100); box-shadow:var(--shadow-sm); }
        .opt-circle { width:24px; height:24px; border-radius:50%; background:var(--bg-body); border:1px solid var(--pale); display:flex; align-items:center; justify-content:center; margin-right:var(--space-md); font-size:0.8rem; font-weight:bold; }
        .option-label.selected .opt-circle { background:var(--sakura-500); color:white; border-color:var(--sakura-500); }
        .opt-text { flex:1; font-size:1.1rem; }
      `}</style>
    </div>
  );
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import RadarChart from '../components/ui/RadarChart';
import MOCKTEST from '../data/mocktest';

export default function Results() {
  const navigate = useNavigate();
  const { state } = useStore();
  const result = state.lastTestResult;

  useEffect(() => {
    if (!result) {
      navigate('/dashboard');
    }
  }, [result, navigate]);

  if (!result) return null;

  const isPass = result.scaledScore >= 95;

  // Prepare data for Radar Chart
  // We need 3 main axes: Vocab/Kanji, Grammar, Reading
  // We map sectionId to axes. MOCKTEST sections: vocab, grammar. 
  // Let's create dummy axes for radar based on what we have, or parse tags.
  // We'll calculate accuracy for each section.
  const getSectionScore = (id) => {
    const s = result.sections[id];
    return s ? Math.round((s.correct / s.total) * 100) : 0;
  };

  const radarData = [
    { label: 'Từ Vựng/Kanji', value: getSectionScore('vocab') },
    { label: 'Ngữ Pháp', value: getSectionScore('grammar') },
    { label: 'Đọc Hiểu', value: getSectionScore('grammar') } // just reuse grammar score for visual since they are combined in mock data
  ];

  // Weaknesses
  const sortedWeaknesses = Object.entries(result.weaknesses)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5) // top 5
    .map(([tag]) => {
      // Map tags to readable strings
      const tagMap = {
        daily: 'Từ vựng hằng ngày',
        feeling: 'Từ vựng cảm xúc',
        society: 'Từ vựng xã hội',
        work: 'Từ vựng công việc',
        study: 'Từ vựng học tập',
        grammar: 'Cấu trúc ngữ pháp cơ bản',
        conditional: 'Câu điều kiện',
        time: 'Thời gian / Hoàn thành',
        reading: 'Đọc hiểu suy luận',
        keigo: 'Kính ngữ'
      };
      return tagMap[tag] || tag;
    });

  return (
    <div className="page-container animate-slideUp">
      <div className="text-center mb-xl pt-lg">
        <div style={{fontSize: '5rem', marginBottom: '16px'}}>
          {isPass ? 'Đậu' : 'Trượt'}
        </div>
        <h2 className="text-4xl mb-sm" style={{color: isPass ? 'var(--spring-green)' : 'var(--error)'}}>
          {isPass ? 'Chúc Mừng! Bạn Đã Đậu!' : 'Cố Gắng Lên Nào!'}
        </h2>
        <p className="text-xl text-muted">Điểm số của bạn: <strong>{result.scaledScore} / 120</strong></p>
        <p className="text-sm text-ink-40 mt-xs">(Tỉ lệ đúng thực tế: {result.score}/{result.total})</p>
      </div>

      <div className="grid-2col gap-lg mb-xl">
        <div className="card card-body flex flex-col items-center justify-center">
          <h3 className="mb-md">Phân Tích Năng Lực</h3>
          <RadarChart data={radarData} size={280} />
          <div className="w-full mt-lg">
            {MOCKTEST.sections.map(s => {
              const secRes = result.sections[s.id] || {correct:0, total:0};
              const pct = secRes.total > 0 ? Math.round((secRes.correct / secRes.total) * 100) : 0;
              return (
                <div key={s.id} className="mb-sm">
                  <div className="flex justify-between text-sm mb-xs">
                    <span>{s.name}</span>
                    <span className="font-bold">{pct}%</span>
                  </div>
                  <div className="progress-bar-track" style={{height:'6px'}}>
                    <div className="progress-bar-fill" style={{width: pct + '%', background: pct >= 80 ? 'var(--spring-green)' : pct >= 50 ? 'var(--sakura-500)' : 'var(--error)'}}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card card-body">
          <h3 className="mb-md">Điểm Yếu Cần Khắc Phục</h3>
          {sortedWeaknesses.length > 0 ? (
            <ul className="weakness-list">
              {sortedWeaknesses.map((w, i) => (
                <li key={i} className="weakness-item">
                   {w}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted p-lg">
              Tuyệt vời! Bạn không có điểm yếu nào nổi bật trong bài thi này.
            </div>
          )}

          <div className="mt-xl bg-sakura-50 p-md rounded-md">
            <div className="font-bold text-sakura mb-sm">Mascot Gợi ý:</div>
            <p className="text-sm m-0" style={{lineHeight: 1.6}}>
              {isPass 
                ? "Kết quả rất tốt! Bạn đã sẵn sàng cho kỳ thi thực tế. Hãy tiếp tục ôn luyện để giữ vững phong độ nhé! 🌸" 
                : "Đừng buồn nhé! Hãy xem lại phần 'Điểm Yếu Cần Khắc Phục' và luyện tập thêm các chủ đề đó trong phần Thẻ Ghi Nhớ. Cố lên! 💪"}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
          Về Bảng Điều Khiển
        </button>
      </div>

      <style>{`
        .grid-2col { display: grid; grid-template-columns: 1fr; }
        @media(min-width: 768px) { .grid-2col { grid-template-columns: 1fr 1fr; } }
        .weakness-list { list-style: none; padding: 0; margin: 0; }
        .weakness-item { padding: var(--space-sm) 0; border-bottom: 1px dashed var(--pale); display: flex; align-items: center; font-weight: 500; }
        .weakness-item:last-child { border-bottom: none; }
      `}</style>
    </div>
  );
}

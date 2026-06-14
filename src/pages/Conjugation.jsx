import { useState } from 'react';
import { useStore } from '../store/useStore';
import CONJUGATION from '../data/conjugation';
import Modal from '../components/ui/Modal';

export default function Conjugation() {
  const { state, markMastered } = useStore();
  const [selectedVerb, setSelectedVerb] = useState(null);

  const progress = state.progress.conjugation || { seen: [], mastered: [] };
  const isMastered = (id) => progress.mastered.includes(id);

  const handleMaster = (v) => {
    markMastered('conjugation', v.id);
    setSelectedVerb(null);
  };

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h2>Chia Động Từ</h2>
          <p className="text-muted mt-xs">Ôn tập các thể chia động từ quan trọng</p>
        </div>
      </div>

      <div className="card card-body mb-lg text-center">
        <div className="flex justify-between text-sm mb-sm font-medium">
          <span className="text-muted">Tiến độ</span>
          <span className="text-sakura">{progress.mastered.length} / {CONJUGATION.verbs.length} ({Math.round(progress.mastered.length/CONJUGATION.verbs.length*100)}%)</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: (progress.mastered.length/CONJUGATION.verbs.length)*100 + '%' }}></div>
        </div>
      </div>

      <div className="grid-2col gap-md">
        {CONJUGATION.verbs.map(v => (
          <div 
            key={v.id} 
            className={`card card-body card-hover flex justify-between items-center cursor-pointer ${isMastered(v.id) ? 'bg-spring-light border-spring' : ''}`}
            onClick={() => setSelectedVerb(v)}
          >
            <div>
              <div className="text-2xl font-bold jp text-sakura mb-xs">{v.dict}</div>
              <div className="text-sm text-muted">{v.meaning}</div>
              <div className="text-xs bg-pale px-sm py-xs rounded-full inline-block mt-xs">{v.group}</div>
            </div>
            <div className="text-2xl">
              {isMastered(v.id) ? 'Đã thuộc' : 'Chi tiết'}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedVerb} onClose={() => setSelectedVerb(null)} title="Bảng Chia Động Từ">
        {selectedVerb && (
          <div>
            <div className="text-center mb-lg">
              <h3 className="text-4xl font-bold jp text-sakura">{selectedVerb.dict}</h3>
              <div className="text-lg font-medium">{selectedVerb.meaning}</div>
              <div className="text-sm text-muted mt-xs">{selectedVerb.group}</div>
            </div>

            <div className="conjugation-table mb-lg">
              {CONJUGATION.forms.map((formName, i) => (
                <div key={i} className="conj-row">
                  <div className="conj-label">
                    <div className="font-bold">{formName}</div>
                    <div className="text-xs text-muted font-normal">{CONJUGATION.formDescriptions[i]}</div>
                  </div>
                  <div className="conj-value jp text-lg font-medium text-ink">
                    {selectedVerb.forms[i]}
                  </div>
                </div>
              ))}
            </div>

            <button 
              className={`btn w-full justify-center ${isMastered(selectedVerb.id) ? 'btn-success' : 'btn-primary'}`}
              onClick={() => handleMaster(selectedVerb)}
            >
              {isMastered(selectedVerb.id) ? 'Đã thuộc Đã Thuộc' : 'Đánh dấu Đã Thuộc (+5 XP)'}
            </button>
          </div>
        )}
      </Modal>

      <style>{`
        .grid-2col { display: grid; grid-template-columns: 1fr; }
        @media(min-width: 768px) { .grid-2col { grid-template-columns: 1fr 1fr; } }
        .bg-spring-light { background: var(--spring-green-light); }
        .border-spring { border-color: var(--spring-green); }
        .conjugation-table { border: 1px solid var(--pale); border-radius: var(--radius-md); overflow: hidden; }
        .conj-row { display: flex; border-bottom: 1px solid var(--pale); }
        .conj-row:last-child { border-bottom: none; }
        .conj-row:nth-child(even) { background: var(--bg-body); }
        .conj-label { flex: 1; padding: var(--space-sm) var(--space-md); border-right: 1px solid var(--pale); background: rgba(0,0,0,0.02); }
        .conj-value { flex: 1; padding: var(--space-sm) var(--space-md); display: flex; align-items: center; }
      `}</style>
    </div>
  );
}

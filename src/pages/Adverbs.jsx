import { useState } from 'react';
import { useStore } from '../store/useStore';
import ADVERBS from '../data/adverbs';
import FlashCard from '../components/ui/FlashCard';

export default function Adverbs() {
  const { state, markSeen, markMastered } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const progress = state.progress.adverbs || { seen: [], mastered: [] };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % ADVERBS.length);
    }, 150);
  };

  const handleKnow = () => {
    const adv = ADVERBS[currentIndex];
    markSeen('adverbs', adv.id);
    markMastered('adverbs', adv.id);
    handleNext();
  };

  const handleReview = () => {
    const adv = ADVERBS[currentIndex];
    markSeen('adverbs', adv.id);
    handleNext();
  };

  const currentAdv = ADVERBS[currentIndex];

  return (
    <div className="page-container animate-fadeIn">
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h2>Phó Từ (Fukushi)</h2>
          <p className="text-muted mt-xs">30 phó từ N3 thường gặp nhất</p>
        </div>
      </div>

      <div className="card card-body mb-lg text-center">
        <div className="flex justify-between text-sm mb-sm font-medium">
          <span className="text-muted">Tiến độ Phó Từ</span>
          <span className="text-sakura">{progress.mastered.length} / {ADVERBS.length} ({Math.round(progress.mastered.length/ADVERBS.length*100)}%)</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: (progress.mastered.length/ADVERBS.length)*100 + '%' }}></div>
        </div>
      </div>

      {currentAdv && (
        <div className="flex-col items-center">
          <FlashCard
            front={currentAdv.word}
            backHeader={<div className="text-center">{currentAdv.reading} ({currentAdv.romaji})</div>}
            backBody={
              <div>
                <div className="text-xl font-bold mb-md text-sakura">{currentAdv.meaning}</div>
                <div className="text-sm bg-sakura-50 p-md rounded-md">
                  <div className="jp mb-xs font-bold">{currentAdv.example}</div>
                  <div className="text-muted">{currentAdv.exMeaning}</div>
                </div>
              </div>
            }
            backFooter={<div className="text-xs text-muted text-center">Nhãn: {currentAdv.tags.join(', ')}</div>}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            onKnow={handleKnow}
            onReview={handleReview}
          />
          <div className="text-sm text-muted mt-lg text-center">
            {currentIndex + 1} / {ADVERBS.length}
          </div>
        </div>
      )}
    </div>
  );
}

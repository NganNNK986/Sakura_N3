import { useState, useEffect } from 'react';

export default function FlashCard({ front, backHeader, backBody, backFooter, isFlipped, setIsFlipped, onKnow, onReview }) {
  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="flashcard-front flex items-center justify-center">
          <div className="text-3xl font-bold jp">{front}</div>
          <div className="click-hint text-xs text-muted mt-lg">Click để lật thẻ 🎴</div>
        </div>
        <div className="flashcard-back flex-col justify-between">
          <div className="back-header">{backHeader}</div>
          <div className="back-body flex-1 flex items-center justify-center text-center">
            {backBody}
          </div>
          <div className="back-footer">
            {backFooter}
            <div className="flex gap-md mt-md" onClick={(e) => e.stopPropagation()}>
              <button className="btn btn-secondary flex-1 justify-center" onClick={onReview}>
                🔄 Ôn lại
              </button>
              <button className="btn btn-primary flex-1 justify-center" onClick={onKnow}>
                ✅ Đã thuộc
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flashcard-container {
          perspective: 1000px;
          width: 100%;
          max-width: 400px;
          height: 300px;
          margin: 0 auto;
        }
        .flashcard {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 0.6s var(--trans-spring);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .flashcard.flipped { transform: rotateY(180deg); }
        .flashcard-front, .flashcard-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background: var(--bg-card);
          border: 2px solid var(--sakura-200);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          box-shadow: var(--shadow-md);
        }
        .flashcard-front {
          display: flex;
          flex-direction: column;
        }
        .flashcard-back {
          transform: rotateY(180deg);
          display: flex;
        }
        .click-hint { position: absolute; bottom: 20px; animation: pulse 2s infinite; }
        .back-header { font-weight: 700; color: var(--sakura-700); border-bottom: 1px solid var(--pale); padding-bottom: 8px; margin-bottom: 8px; }
      `}</style>
    </div>
  );
}

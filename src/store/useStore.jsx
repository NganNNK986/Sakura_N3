import { createContext, useContext, useState, useCallback } from 'react';

const StoreContext = createContext(null);

const DEFAULT_STATE = {
  profile: null,
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  progress: {
    vocab: { seen: [], mastered: [] },
    kanji: { seen: [], mastered: [] },
    grammar: { seen: [], mastered: [] },
    conjugation: { seen: [], mastered: [] },
    keigo: { seen: [], mastered: [] },
    adverbs: { seen: [], mastered: [] },
  },
  testHistory: [],
  lastTestResult: null,
};

function load() {
  try {
    const raw = localStorage.getItem('sakura_n3_store');
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE };
  } catch { return { ...DEFAULT_STATE }; }
}

function save(state) {
  try { localStorage.setItem('sakura_n3_store', JSON.stringify(state)); } catch {}
}

export function StoreProvider({ children }) {
  const [state, setStateRaw] = useState(load);

  const setState = useCallback((updater) => {
    setStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      save(next);
      return next;
    });
  }, []);

  const addXP = useCallback((amount) => {
    setState(prev => ({ ...prev, xp: prev.xp + amount }));
  }, [setState]);

  const markSeen = useCallback((module, id) => {
    setState(prev => {
      const mod = prev.progress[module];
      if (!mod || mod.seen.includes(id)) return prev;
      return { ...prev, progress: { ...prev.progress, [module]: { ...mod, seen: [...mod.seen, id] } } };
    });
  }, [setState]);

  const markMastered = useCallback((module, id) => {
    setState(prev => {
      const mod = prev.progress[module];
      if (!mod) return prev;
      return {
        ...prev,
        xp: prev.xp + 5,
        progress: {
          ...prev.progress,
          [module]: {
            seen: mod.seen.includes(id) ? mod.seen : [...mod.seen, id],
            mastered: mod.mastered.includes(id) ? mod.mastered : [...mod.mastered, id],
          },
        },
      };
    });
  }, [setState]);

  const saveTestResult = useCallback((result) => {
    setState(prev => ({
      ...prev,
      lastTestResult: result,
      testHistory: [result, ...prev.testHistory].slice(0, 10),
    }));
  }, [setState]);

  const updateStreak = useCallback(() => {
    setState(prev => {
      const today = new Date().toDateString();
      if (prev.lastStudyDate === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const streak = prev.lastStudyDate === yesterday ? prev.streak + 1 : 1;
      return { ...prev, streak, lastStudyDate: today };
    });
  }, [setState]);

  const setProfile = useCallback((profile) => {
    setState(prev => ({ ...prev, profile }));
  }, [setState]);

  const saveCurrentIndex = useCallback((module, index) => {
    setState(prev => {
      const mod = prev.progress[module] || { seen: [], mastered: [] };
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [module]: { ...mod, currentIndex: index },
        },
      };
    });
  }, [setState]);

  return (
    <StoreContext.Provider value={{ state, setState, addXP, markSeen, markMastered, saveTestResult, updateStreak, setProfile, saveCurrentIndex }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be inside StoreProvider');
  return ctx;
}

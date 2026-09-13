'use client';

import { useEffect, useReducer } from 'react';

export type Phase = 'boot' | 'login' | 'desktop';

export type GameState = {
  saveVersion: 1;
  phase: Phase;
  chapter: number;
  evidenceIds: string[];
  eventFlags: Record<string, boolean>;
  unlockedApps: string[];
  chapter1Complete: boolean;
};

type Action =
  | { type: 'SET_PHASE'; phase: Phase }
  | { type: 'ADD_EVIDENCE'; id: string }
  | { type: 'SET_FLAG'; key: string; value?: boolean }
  | { type: 'UNLOCK_APP'; id: string }
  | { type: 'COMPLETE_CHAPTER_1' }
  | { type: 'RESET' };

export const SAVE_KEY = 'nullhome_save_v1';

export const initialGameState: GameState = {
  saveVersion: 1,
  phase: 'boot',
  chapter: 1,
  evidenceIds: [],
  eventFlags: {},
  unlockedApps: ['files','mail','messenger','photos','news','notes','recycle','mirai'],
  chapter1Complete: false,
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_PHASE': return { ...state, phase: action.phase };
    case 'ADD_EVIDENCE': return state.evidenceIds.includes(action.id) ? state : { ...state, evidenceIds: [...state.evidenceIds, action.id] };
    case 'SET_FLAG': return { ...state, eventFlags: { ...state.eventFlags, [action.key]: action.value ?? true } };
    case 'UNLOCK_APP': return state.unlockedApps.includes(action.id) ? state : { ...state, unlockedApps: [...state.unlockedApps, action.id] };
    case 'COMPLETE_CHAPTER_1': return { ...state, chapter1Complete: true, eventFlags: { ...state.eventFlags, chapter1Complete: true } };
    case 'RESET': return initialGameState;
  }
}

function loadState(): GameState {
  if (typeof window === 'undefined') return initialGameState;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return initialGameState;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    if (parsed.saveVersion !== 1) return initialGameState;
    return { ...initialGameState, ...parsed, eventFlags: parsed.eventFlags ?? {}, evidenceIds: parsed.evidenceIds ?? [], unlockedApps: parsed.unlockedApps ?? initialGameState.unlockedApps };
  } catch {
    return initialGameState;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialGameState, loadState);
  useEffect(() => {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch { /* storage may be unavailable */ }
  }, [state]);
  return { state, dispatch };
}

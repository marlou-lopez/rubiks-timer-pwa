import { createContext, useCallback, useContext, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Puzzle, Session } from '../lib/db';

type SessionContext = {
  selectedPuzzle: Puzzle;
  selectedSession: Session | null;
  onPuzzleSelect: (puzzle: Puzzle) => void;
  onSessionSelect: (session: Session) => void;
};

type SessionProviderProps = {
  children: React.ReactNode;
};

const SessionContext = createContext<SessionContext | undefined>(undefined);

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [selectedPuzzle, setSelectedPuzzle] = useLocalStorageState<Puzzle>('puzzleType', {
    defaultValue: {
      name: '3x3x3',
      value: '333',
    },
  });

  const [selectedSession, setSelectedSession] = useLocalStorageState<Session | null>('session', {
    defaultValue: {
      id: 2,
      name: 'default session (3x3x3)',
      puzzleType: '333',
      isDefault: true,
      date: Date.now(),
    },
  });

  const onPuzzleSelect = useCallback(
    (puzzle: Puzzle) => {
      if (selectedPuzzle.value !== puzzle.value) {
        setSelectedPuzzle(puzzle);
        setSelectedSession(null);
      }
    },
    [selectedPuzzle.value, setSelectedPuzzle, setSelectedSession],
  );

  const onSessionSelect = useCallback(
    (session: Session) => {
      setSelectedSession(session);
    },
    [setSelectedSession],
  );

  return (
    <SessionContext.Provider
      value={{
        onPuzzleSelect,
        onSessionSelect,
        selectedPuzzle,
        selectedSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export { SessionProvider, useSession };

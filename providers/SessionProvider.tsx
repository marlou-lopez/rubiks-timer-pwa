import { createContext, useCallback, useContext, useState } from 'react';
import { Puzzle } from '../components/Timer/TimerHeader';
import { Session } from '../lib/db';

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
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle>({
    name: '3x3x3',
    value: '333',
  });

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const onPuzzleSelect = useCallback(
    (puzzle: Puzzle) => {
      if (selectedPuzzle.value !== puzzle.value) {
        setSelectedPuzzle(puzzle);
        setSelectedSession(null);
      }
    },
    [selectedPuzzle],
  );

  const onSessionSelect = useCallback((session: Session) => {
    setSelectedSession(session);
  }, []);

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

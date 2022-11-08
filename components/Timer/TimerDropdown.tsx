import { useQuery } from 'react-query';
import { db, Session } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';
import PuzzleDropdown from '../Dropdowns/PuzzleDropdown';
import SessionDropdown from '../Dropdowns/SessionDropdown';

const TimerDropdown = () => {
  const { selectedPuzzle, selectedSession, onPuzzleSelect, onSessionSelect } = useSession();
  const { data: sessions } = useQuery(
    ['sessions', selectedPuzzle.value],
    () =>
      db.sessions
        .where({
          puzzleType: selectedPuzzle.value,
        })
        .toArray(),
    {
      onSuccess: (data) => {
        if (!selectedSession) {
          const defaultSession = data.find(
            (d) => d.isDefault && d.puzzleType === selectedPuzzle.value,
          );
          onSessionSelect(defaultSession!);
        }
      },
    },
  );

  const handleSessionSelect = (session: Session) => {
    if (session !== null) {
      onSessionSelect(session);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 ">
        <PuzzleDropdown value={selectedPuzzle} onChange={onPuzzleSelect} />
        <SessionDropdown
          value={selectedSession}
          onChange={handleSessionSelect}
          options={sessions}
        />
      </div>
    </>
  );
};

export default TimerDropdown;

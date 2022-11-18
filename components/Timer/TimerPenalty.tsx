import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { db, Solve } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';

type TimerPenaltyProps = {
  solve: Solve;
};
const TimerPenalty: React.FC<TimerPenaltyProps> = ({ solve }) => {
  const queryClient = useQueryClient();
  const { selectedSession } = useSession();

  const { mutate: updateSolve } = useMutation({
    mutationFn: (solve: Solve) => {
      const { time, penalty, id } = solve;
      return db.solves.update(id!, {
        time,
        penalty,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['solves', selectedSession?.id] });
    },
  });

  const [isPlusTwo, setIsPlusTwo] = useState(false);
  const [isDNF, setIsDNF] = useState(false);

  const handlePlusTwo = () => {
    setIsPlusTwo(!isPlusTwo);
    if (isPlusTwo) {
      updateSolve({
        ...solve,
        time: solve.time - 2000,
        penalty: null,
      });
    } else {
      updateSolve({
        ...solve,
        time: solve.time + 2000,
        penalty: '+2',
      });
    }
  };

  const handleDNF = () => {
    setIsDNF(!isDNF);
    if (isDNF) {
      updateSolve({
        ...solve,
        penalty: null,
      });
    } else {
      updateSolve({
        ...solve,
        penalty: 'DNF',
      });
    }
  };

  return (
    <div className="flex items-center gap-4 p-2">
      <button
        type="button"
        disabled={isDNF}
        onTouchStart={(event) => {
          event.stopPropagation();
          if (!isDNF) {
            handlePlusTwo();
          }
        }}
        onClick={handlePlusTwo}
        className={`
              w-16 rounded-md border border-gray-400 p-1 font-semibold
              disabled:bg-black/20 disabled:text-black/50
              disabled:dark:bg-white/20 disabled:dark:text-white/50
              ${isPlusTwo ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
      >
        +2
      </button>
      <button
        type="button"
        disabled={isPlusTwo}
        onTouchStart={(event) => {
          event.stopPropagation();
          if (!isPlusTwo) {
            handleDNF();
          }
        }}
        onClick={handleDNF}
        className={`
              w-16 rounded-md border border-gray-400 p-1 font-semibold
              disabled:bg-black/20 disabled:text-black/50
              disabled:dark:bg-white/20 disabled:dark:text-white/50
              ${isDNF ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
      >
        DNF
      </button>
    </div>
  );
};

export default TimerPenalty;

import { useState } from 'react';
import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';

const TimerPenalty = () => {
  const { selectedSession } = useSession();
  const { data, refetch } = useQuery(
    ['solves', selectedSession?.id],
    () =>
      db.solves
        .where({
          sessionId: selectedSession?.id,
        })
        .toArray(),
    {
      enabled: !!selectedSession,
      select: (data) => [...data].reverse(),
    },
  );

  const solves = data ?? [];
  const [isPlusTwo, setIsPlusTwo] = useState(false);
  const [isDNF, setIsDNF] = useState(false);

  const handlePlusTwo = async () => {
    setIsPlusTwo(!isPlusTwo);
    const latestSolve = solves[0];
    if (isPlusTwo) {
      await db.solves.update(latestSolve.id!, {
        time: latestSolve.time - 2000,
        penalty: null,
      });
    } else {
      await db.solves.update(latestSolve.id!, {
        time: latestSolve.time + 2000,
        penalty: '+2',
      });
    }
    refetch();
  };

  const handleDNF = async () => {
    setIsDNF(!isDNF);
    const latestSolve = solves[0];
    if (isDNF) {
      await db.solves.update(latestSolve.id!, {
        penalty: null,
      });
    } else {
      await db.solves.update(latestSolve.id!, {
        penalty: 'DNF',
      });
    }
    refetch();
  };

  return (
    <div className="flex items-center gap-4 p-2">
      <button
        type="button"
        disabled={isDNF}
        onTouchStart={async (event) => {
          event.stopPropagation();
          handlePlusTwo();
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
        onTouchStart={async (event) => {
          event.stopPropagation();
          handleDNF();
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

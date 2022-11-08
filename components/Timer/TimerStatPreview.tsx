import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';
import { getLatestAverageFromTimeStamps, formatTime } from './timerUtils';

const TimerStatPreview = () => {
  const { selectedSession } = useSession();
  const { data } = useQuery(
    ['solves', selectedSession?.id],
    () =>
      db.solves
        .where({
          sessionId: selectedSession?.id,
        })
        .toArray(),
    {
      enabled: !!selectedSession,
      select: (data) => [...data].reverse().map((d) => d.time),
    },
  );

  const solves = data ?? [];

  const averageOfFive = getLatestAverageFromTimeStamps(solves, 5);

  const averageOfTwelve = getLatestAverageFromTimeStamps(solves, 12);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h2 className="text-2xl font-light sm:text-3xl md:text-5xl">
        Ao5: {averageOfFive > 0 ? formatTime(averageOfFive) : '-'}
      </h2>
      <h2 className="text-2xl font-light sm:text-3xl md:text-5xl">
        Ao12: {averageOfTwelve > 0 ? formatTime(averageOfTwelve) : '-'}
      </h2>
    </div>
  );
};

export default React.memo(TimerStatPreview);

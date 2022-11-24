import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';
import { formatTime, getLatestAverage } from './timerUtils';

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
      select: (data) => [...data].reverse(),
    },
  );

  const solves = data ?? [];

  const averageOfFive = getLatestAverage(solves, 5);

  const averageOfTwelve = getLatestAverage(solves, 12);

  return (
    <div className="flex flex-col items-center justify-center py-2 mobile-ls:py-1">
      <h2 className="text-2xl font-light sm:text-3xl lg:text-5xl mobile-ls:text-2xl">
        Ao5: {averageOfFive > 0 ? formatTime(averageOfFive) : isNaN(averageOfFive) ? 'DNF' : '-'}
      </h2>
      <h2 className="text-2xl font-light sm:text-3xl lg:text-5xl mobile-ls:text-2xl">
        Ao12:{' '}
        {averageOfTwelve > 0 ? formatTime(averageOfTwelve) : isNaN(averageOfTwelve) ? 'DNF' : '-'}
      </h2>
    </div>
  );
};

export default React.memo(TimerStatPreview);

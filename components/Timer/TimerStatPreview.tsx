import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import { getLatestAverageFromTimeStamps, formatTime } from './timerUtils';

const TimerStatPreview = () => {
  const { data } = useQuery(['solves'], () => db.solves.toArray(), {
    select: (data) => data.map((d) => d.time),
  });

  const solves = data ?? [];

  let averageOfFive = 0;
  let averageOfTwelve = 0;
  if (solves.length >= 5) {
    averageOfFive = getLatestAverageFromTimeStamps(solves);
  }

  if (solves.length >= 12) {
    averageOfTwelve = getLatestAverageFromTimeStamps(solves);
  }

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

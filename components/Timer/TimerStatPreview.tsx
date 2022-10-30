import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import { getLatestAverageFromTimeStamps, formatTime } from './timerUtils';

const TimerStatPreview = () => {
  const { data } = useQuery(['solves'], () => db.solves.toArray());
  const solves = useMemo(() => data ?? [], [data]);

  const averageOfFive = useMemo(() => {
    if (solves.length >= 5) {
      const result = getLatestAverageFromTimeStamps(
        solves.map((t) => t.time),
        5,
      );
      return result;
    }
    return 0;
  }, [solves]);

  const averageOfTwelve = useMemo(() => {
    if (solves.length >= 12) {
      const result = getLatestAverageFromTimeStamps(
        solves.map((t) => t.time),
        12,
      );
      return result;
    }
    return 0;
  }, [solves]);

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

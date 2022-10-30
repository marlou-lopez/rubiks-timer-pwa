import { useLiveQuery } from 'dexie-react-hooks';
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
        5
      );
      return result;
    }
    return 0;
  }, [solves]);

  const averageOfTwelve = useMemo(() => {
    if (solves.length >= 12) {
      const result = getLatestAverageFromTimeStamps(
        solves.map((t) => t.time),
        12
      );
      return result;
    }
    return 0;
  }, [solves]);

  return (
    <div className="flex justify-center flex-col items-center py-2">
      <h2 className="md:text-5xl sm:text-3xl text-2xl font-light">
        Ao5: {averageOfFive > 0 ? formatTime(averageOfFive) : '-'}
      </h2>
      <h2 className="md:text-5xl sm:text-3xl text-2xl font-light">
        Ao12: {averageOfTwelve > 0 ? formatTime(averageOfTwelve) : '-'}
      </h2>
    </div>
  );
};

export default React.memo(TimerStatPreview);
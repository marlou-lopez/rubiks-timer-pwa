import { useMemo } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Solve } from '../../../lib/db';
import { formatTime, getLatestAverage } from '../../Timer/timerUtils';
import { AVERAGE_OF } from '../StatsOverview/StatsOverview';

type StatsGraphProps = {
  solves: Solve[];
};

const StatsGraph: React.FC<StatsGraphProps> = ({ solves }) => {
  const solveTimeStamps = useMemo(() => {
    const reversedSolves = [...solves].reverse();
    return reversedSolves.map((solve, index) => {
      let ao5 = null;
      let ao12 = null;
      if (index + 1 >= AVERAGE_OF.FIVE) {
        const average = getLatestAverage(
          reversedSolves.slice(index + 1 - AVERAGE_OF.FIVE, index + 1),
        );
        ao5 = !isNaN(average) ? average : null;
      }

      if (index + 1 >= AVERAGE_OF.TWELVE) {
        const average = getLatestAverage(
          reversedSolves.slice(index + 1 - AVERAGE_OF.TWELVE, index + 1),
        );
        ao12 = !isNaN(average) ? average : null;
      }
      return {
        single: solve.penalty !== 'DNF' ? solve.time : null,
        // single: solve.penalty !== 'DNF' ? formatTime(solve.time) : null,
        ao5,
        ao12,
      };
    });
  }, [solves]);

  return (
    <div className="flex-grow text-black dark:text-white">
      <h1 className="mb-1 text-lg font-bold">Time Trend</h1>
      {solves.length > 1 ? (
        <ResponsiveContainer width={'100%'} height={150}>
          <LineChart width={300} data={solveTimeStamps}>
            <YAxis
              domain={[0, 'dataMax + 2000']}
              tickFormatter={(value) => formatTime(value, { showMs: false }) + 's'}
              hide
              // axisLine={false}
              // tickLine={false}
            />
            <Line type={'monotone'} dataKey="single" dot={false} strokeWidth={4} />
            <Line type={'monotone'} dataKey="ao5" stroke="#82ca9d" dot={false} strokeWidth={2} />
            <Line type={'monotone'} dataKey="ao12" stroke="#8884d8" dot={false} strokeWidth={2} />
            <Legend />
            <Tooltip
              formatter={(value, name) => {
                return [formatTime(value as number) + 's', name];
              }}
              labelFormatter={() => ''}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="font-semibold text-gray-500">Not enough data.</div>
      )}
    </div>
  );
};

export default StatsGraph;

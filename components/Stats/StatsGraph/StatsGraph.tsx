import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Solve } from '../../../lib/db';
import { formatTime, getAverages, getLatestAverageFromTimeStamps } from '../../Timer/timerUtils';
import { AVERAGE_OF } from '../StatsOverview/StatsOverview';

type StatsGraphProps = {
  solves: Solve[];
};

const StatsGraph: React.FC<StatsGraphProps> = ({ solves }) => {
  const reversedSolves = [...solves].reverse();
  const solveTimeStamps = reversedSolves.map((solve, index) => {
    let ao5 = null;
    let ao12 = null;
    if (index + 1 >= AVERAGE_OF.FIVE) {
      ao5 = formatTime(
        getLatestAverageFromTimeStamps(
          reversedSolves.slice(index + 1 - AVERAGE_OF.FIVE, index + 1).map((s) => s.time),
        ),
      );
    }

    if (index + 1 >= AVERAGE_OF.TWELVE) {
      ao12 = formatTime(
        getLatestAverageFromTimeStamps(
          reversedSolves.slice(index + 1 - AVERAGE_OF.TWELVE, index + 1).map((s) => s.time),
        ),
      );
    }
    return {
      single: formatTime(solve.time),
      ao5,
      ao12,
    };
  });

  return (
    <div className="flex-grow text-black dark:text-white">
      <h1 className="font-bold">Time Trend</h1>
      <ResponsiveContainer width={'100%'} height={150}>
        <LineChart width={300} height={150} data={solveTimeStamps}>
          <Line type={'monotone'} dataKey="single" dot={false} strokeWidth={3} />
          <Line type={'monotone'} dataKey="ao5" stroke="#82ca9d" dot={false} strokeWidth={2} />
          <Line type={'monotone'} dataKey="ao12" stroke="#8884d8" dot={false} strokeWidth={2} />
          <Legend />
          <Tooltip labelFormatter={() => ''} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsGraph;

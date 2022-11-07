import { Solve } from '../../../lib/db';
import {
  AverageType,
  formatTime,
  getAverages,
  getLatestAverageFromTimeStamps,
  getMeanFromTimeStamps,
  getStandardDeviation,
} from '../../Timer/timerUtils';

type StatsOverviewProps = {
  solves: Solve[];
};

type StatTileProps = {
  stat: string;
  value: string;
};

export const AVERAGE_OF = {
  FIVE: 5,
  TWELVE: 12,
  FIFTY: 50,
  ONE_HUNDRED: 100,
  FIVE_HUNDRED: 500,
  ONE_THOUSAND: 1000,
} as const;

const StatTile: React.FC<StatTileProps> = ({ stat, value }) => {
  return (
    <div className="flex flex-col rounded-md bg-black text-white dark:bg-white dark:text-black">
      <p className="p-1 text-xs font-semibold">{stat}</p>
      <h3 className="px-4 pb-1 font-bold">{value}</h3>
    </div>
  );
};

const StatsOverview: React.FC<StatsOverviewProps> = ({ solves }) => {
  const solveTimeStamps = solves.map((solve) => solve.time);
  const sortedSolve = [...solves].sort((a, b) => a.time - b.time);

  const personalBest = sortedSolve.length > 2 ? sortedSolve[0] : null;
  const worstSingle = sortedSolve.length > 2 ? sortedSolve[sortedSolve.length - 1] : null;

  const overAllMean = getMeanFromTimeStamps(solveTimeStamps);

  const standardDeviation = getStandardDeviation(solveTimeStamps);

  return (
    <div className="flex flex-col gap-2 text-black dark:text-white">
      <div>
        <h1 className="mb-1 font-bold">Current</h1>
        <div className="flex gap-3">
          {Object.values(AVERAGE_OF).map((averageOf) => {
            const average = getLatestAverageFromTimeStamps(solveTimeStamps, averageOf);
            if (average === 0) return;
            return (
              <div key={averageOf}>
                <StatTile stat={`ao${averageOf}`} value={formatTime(average)} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold">Session Statistics</h1>
        <div>
          <h2 className="mb-1 text-sm font-semibold">Best</h2>
          <div className="flex gap-3">
            {personalBest && (
              <div>
                <StatTile stat="single" value={formatTime(personalBest.time)} />
              </div>
            )}
            {Object.values(AVERAGE_OF).map((averageOf) => {
              const average = getAverages(solves, averageOf);
              if (average === null) return;
              return (
                <div key={averageOf}>
                  <StatTile stat={`ao${averageOf}`} value={formatTime(average.best.time)} />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="mb-1 text-sm font-semibold">Worst</h2>
          <div className="flex gap-3">
            {worstSingle && (
              <div>
                <StatTile stat="single" value={formatTime(worstSingle.time)} />
              </div>
            )}
            {Object.values(AVERAGE_OF).map((averageOf) => {
              const average = getAverages(solves, averageOf);
              if (average === null) return;
              return (
                <div key={averageOf}>
                  <StatTile stat={`ao${averageOf}`} value={formatTime(average.worst.time)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold">Standard Deviation</h2>
        <span>{formatTime(standardDeviation)}</span>
      </div>
    </div>
  );
};

export default StatsOverview;

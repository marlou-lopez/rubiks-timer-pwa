import { Solve } from '../../lib/db';

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export const getTimePropertiesFromTimeStamp = (timestamp: number): Time => {
  const milliseconds = Math.floor((timestamp % 1000) / 10);
  const seconds = Math.floor((timestamp / 1000) % 60);
  const minutes = Math.floor((timestamp / (1000 * 60)) % 60);
  const hours = Math.floor((timestamp / (1000 * 60 * 60)) % 24);
  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};

type FormatTimeOptions = {
  showMs?: boolean;
};

export const formatTime = (
  timestamp: number,
  { showMs = true }: FormatTimeOptions = {},
): string => {
  const { hours, minutes, seconds, milliseconds } = getTimePropertiesFromTimeStamp(timestamp);

  const h = hours >= 1 ? hours.toString() : null;
  const m = minutes >= 1 ? minutes.toString().padStart(2, '0') : null;
  const s = minutes >= 1 ? seconds.toString().padStart(2, '0') : seconds.toString();
  const ms = milliseconds.toString().padStart(2, '0');

  let timeString = `${s}`;

  if (showMs) {
    timeString = `${s}.${ms}`;
  }

  if (m) {
    timeString = `${m}:${timeString}`;
    if (h) {
      timeString = `${h}:${timeString}`;
    }
  }
  return timeString;
};

export const getMeanFromTimeStamps = (timestamps: number[]) => {
  return timestamps.reduce((acc, curr) => acc + curr, 0) / timestamps.length;
};

/**
 * Gets the latest average of the timestamps starting from the number indicated by averageOf
 * Excludes 5% of the best and worst times
 * @param timestamps array of timestamps
 * @param averageOf number of timestaps to get the average of
 * @returns timestamps average
 */
export const getLatestAverageFromTimeStamps = (
  timestamps: number[],
  averageOf: number = timestamps.length,
): number => {
  if (timestamps.length < averageOf) return 0;
  const noOfTimesToBeRemoved = Math.ceil(averageOf * 0.05);
  const timesToCalculate = timestamps
    .slice(0, averageOf)
    .sort((a, b) => a - b)
    .slice(noOfTimesToBeRemoved, -noOfTimesToBeRemoved);

  return getMeanFromTimeStamps(timesToCalculate);
};

export const getLatestAverage = (solves: Solve[], averageOf: number = solves.length): number => {
  if (solves.length < averageOf) return 0;
  const noOfTimesToBeRemoved = Math.ceil(averageOf * 0.05);
  let timesToCalculate = solves.slice(0, averageOf).sort((a, b) => a.time - b.time);
  const dnfs = timesToCalculate.filter((solve) => solve.penalty === 'DNF');
  // If there are more than two DNFs, average is auto DNF
  if (dnfs.length > 1) {
    return NaN;
  }
  if (dnfs.length === 1) {
    timesToCalculate = [...timesToCalculate.filter((solve) => solve.penalty !== 'DNF'), dnfs[0]];
  }
  timesToCalculate = timesToCalculate.slice(noOfTimesToBeRemoved, -noOfTimesToBeRemoved);

  return getMeanFromTimeStamps(timesToCalculate.map((t) => t.time));
};

type Average = {
  solves: Solve[];
  time: number;
};

export type AverageType = {
  best: Average;
  worst: Average;
};

export const getAverages = (solves: Solve[], averageOf: number) => {
  if (solves.length < averageOf) return null;

  let averages: Average[] = [];

  for (let i = 0, j = averageOf; i <= solves.length - averageOf; i++, j++) {
    const solvesToAverage = solves.slice(i, j);

    const average = getLatestAverage(solvesToAverage);
    averages.push({
      solves: solvesToAverage,
      time: average,
    });
  }

  const filterDNFs = averages.filter((average) => !isNaN(average.time));
  const sortedAverages = filterDNFs.sort((a, b) => a.time - b.time);
  return {
    best: sortedAverages[0],
    worst: sortedAverages[sortedAverages.length - 1],
  };
};

export const getStandardDeviation = (timestamps: number[]) => {
  if (timestamps.length === 0) return 0;
  const overAllMean = getMeanFromTimeStamps(timestamps);
  return Math.sqrt(
    timestamps.map((time) => Math.pow(time - overAllMean, 2)).reduce((a, b) => a + b, 0) /
      (timestamps.length - 1),
  );
};

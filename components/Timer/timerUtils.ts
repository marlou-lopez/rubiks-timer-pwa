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
  averageOf: number | null = timestamps.length,
): number => {
  if (averageOf === null) {
    return getMeanFromTimeStamps(timestamps);
  }
  const noOfTimesToBeRemoved = Math.ceil(averageOf * 0.05);
  const timesToCalculate = timestamps
    .slice(-averageOf)
    .sort((a, b) => a - b)
    .slice(noOfTimesToBeRemoved, -noOfTimesToBeRemoved);

  return getMeanFromTimeStamps(timesToCalculate);
};

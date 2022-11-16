import { useReducer, useRef, useState } from 'react';
import useTestLongPress from '../../hooks/useTestLongPress';
import TimerConfigPreview from './TimerConfigPreview';
import { StopwatchReducer, StopwatchState } from './timerReducer';
import { formatTime } from './timerUtils';

export const HOLD_DURATION = [0, 300, 550, 1000] as const;
export type HOLD_DURATION_TYPE = typeof HOLD_DURATION[number];

export type TimerOptions = {
  multiPhase?: number;
  enableInspection?: boolean;
  holdDuration?: HOLD_DURATION_TYPE;
  showTimerConfigPreview?: boolean;
};

type TimerProps = {
  onStop?: (timerState: Pick<StopwatchState, 'currentTime' | 'splitTimes'>) => void;
  onStart?: () => Promise<void>;
  options?: TimerOptions;
  header?: React.ReactNode;
  statPreview?: React.ReactNode;
  actions?: React.ReactNode;
};

const Timer: React.FC<TimerProps> = ({
  options,
  onStart,
  onStop,
  header,
  statPreview,
  actions,
}) => {
  const [state, dispatch] = useReducer(StopwatchReducer, {
    running: false,
    currentTime: 0,
    lastTime: 0,
    splitTimes: [],
  });

  const DEFAULT_INSPECTION_TIME = 15000;

  const [swInspectionInterval, setSwInspectionInterval] = useState<NodeJS.Timeout | null>(null);
  const [swInterval, setSwInterval] = useState<NodeJS.Timeout | null>(null);
  const [isKeyPress, setIsKeyPress] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);

  const [inspectionTime, setInspectionTime] = useState(DEFAULT_INSPECTION_TIME);
  const [isInspectionTimeRunning, setIsInspectionTimeRunning] = useState(false);

  const resetTimers = () => {
    dispatch({ type: 'reset' });
    setInspectionTime(DEFAULT_INSPECTION_TIME);
  };

  const longPressEvent = useTestLongPress({
    delay: options?.holdDuration,
    pressHandlers: {
      onHold: () => {
        if (!isInspectionTimeRunning && !state.running) {
          resetTimers();
        }
        setIsLongPress(true);
      },
      onTap: () => {
        if (!isKeyPress) {
          setIsKeyPress(true);
          if (options?.holdDuration === 0) {
            if (!isInspectionTimeRunning && !state.running) {
              resetTimers();
            }
            setIsLongPress(true);
          }
          if (state.currentTime > 0 && state.running) {
            setIsKeyPress(false);
            if (options?.multiPhase) {
              dispatch({ type: 'split' });
              if (state.splitTimes.length === options.multiPhase - 1) {
                dispatch({ type: 'stop' });
                onStop && onStop(state);
                if (swInterval) {
                  clearInterval(swInterval);
                  setSwInterval(null);
                }
              }
            } else {
              dispatch({ type: 'stop' });
              onStop && onStop(state);
              if (swInterval) {
                clearInterval(swInterval);
                setSwInterval(null);
              }
            }
          }
        }
      },
      onRelease: () => {
        if (isKeyPress) {
          setIsKeyPress(false);
          if (isLongPress) {
            setIsLongPress(false);
            if (options?.enableInspection) {
              if (isInspectionTimeRunning) {
                setIsInspectionTimeRunning(false);
                dispatch({ type: 'start' });
                setSwInterval(
                  setInterval(() => {
                    dispatch({ type: 'tick' });
                  }, 1),
                );
                if (swInspectionInterval) {
                  clearInterval(swInspectionInterval);
                  setSwInspectionInterval(null);
                }
              } else {
                setIsInspectionTimeRunning(true);
                setSwInspectionInterval(
                  setInterval(() => {
                    setInspectionTime((prev) => {
                      const newTime = prev - 1000;
                      if (newTime === 8000) {
                        // Accessing audio directly to avoid delay issue
                        new Audio('/assets/voice/8seconds.mp3').play();
                      }
                      if (newTime === 3000) {
                        new Audio('/assets/voice/12seconds.mp3').play();
                      }
                      return newTime;
                    });
                  }, 1000),
                );
              }
            } else {
              dispatch({ type: 'start' });
              setSwInterval(
                setInterval(() => {
                  dispatch({ type: 'tick' });
                }, 1),
              );
            }
          }
        }
      },
    },
  });

  const isTimerReady = isLongPress && isKeyPress;
  const isTimerPressed = isKeyPress && !isLongPress && !state.running;

  return (
    <div className="relative flex flex-grow">
      {!isInspectionTimeRunning && !state.running && header}
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="flex flex-col items-center justify-center">
          {options?.showTimerConfigPreview && !isInspectionTimeRunning && !state.running && (
            <TimerConfigPreview {...options} />
          )}
          {isInspectionTimeRunning ? (
            <div>
              <p>Inspect</p>
              <h1 className="text-7xl font-semibold text-black dark:text-white md:text-9xl">
                {formatTime(inspectionTime, { showMs: false })}
              </h1>
            </div>
          ) : (
            <h1 className="mb-2 text-7xl font-semibold text-black dark:text-white md:text-9xl">
              {formatTime(state.currentTime, { showMs: !state.running })}
            </h1>
          )}
          {!isInspectionTimeRunning && !state.running && state.currentTime > 0 && actions}
          {!isInspectionTimeRunning && !state.running && statPreview}
          {state.currentTime > 0 && Boolean(options?.multiPhase) && (
            <div className="mt-4 flex flex-col gap-1">
              {state.splitTimes.map((p, i, arr) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <p className="text-xl md:text-2xl">{i + 1}:</p>
                  <p className="text-right text-xl md:text-2xl">{`${i > 0 ? '+' : ''}${formatTime(
                    p - (arr[i - 1] ?? 0),
                    {
                      showMs: true,
                    },
                  )}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        {...longPressEvent}
        className={`flex h-full 
         w-full touch-none select-none flex-col items-center justify-center
         ${
           isTimerReady
             ? 'bg-green-400 dark:bg-green-500'
             : isTimerPressed
             ? 'bg-red-400 dark:bg-red-500'
             : 'bg-white dark:bg-black'
         }
         ${isInspectionTimeRunning || state.running ? 'z-10' : ''}
         `}
        tabIndex={0}
      ></div>
    </div>
  );
};

export default Timer;

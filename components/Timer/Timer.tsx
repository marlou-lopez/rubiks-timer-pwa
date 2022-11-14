import { useReducer, useState } from 'react';
import useTestLongPress from '../../hooks/useTestLongPress';
import { StopwatchReducer, StopwatchState } from './timerReducer';
import { formatTime } from './timerUtils';

type TimerOptions = {
  multiPhase?: number;
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

  const [swInterval, setSwInterval] = useState<NodeJS.Timeout | null>(null);
  const [isKeyPress, setIsKeyPress] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);

  const longPressEvent = useTestLongPress({
    pressHandlers: {
      onHold: () => {
        dispatch({ type: 'reset' });
        setIsLongPress(true);
      },
      onTap: () => {
        if (!isKeyPress) {
          setIsKeyPress(true);
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
            dispatch({ type: 'start' });
            setSwInterval(
              setInterval(() => {
                dispatch({ type: 'tick' });
              }, 1),
            );
          }
        }
      },
    },
  });

  const isTimerReady = isLongPress && isKeyPress;
  const isTimerPressed = isKeyPress && !isLongPress && !state.running;

  return (
    <>
      {!state.running && header}
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
         `}
        tabIndex={0}
      >
        <h1 className="text-7xl font-semibold text-black dark:text-white md:text-9xl">
          {formatTime(state.currentTime, { showMs: !state.running })}
        </h1>
        {!state.running && state.currentTime > 0 && actions}
        {!state.running && statPreview}
        <div className="flex flex-col gap-2">
          {state.splitTimes.map((p, i, arr) => (
            <p key={i}>{`${i > 0 ? '+' : ''}${formatTime(p - (arr[i - 1] ?? 0), {
              showMs: true,
            })}`}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Timer;

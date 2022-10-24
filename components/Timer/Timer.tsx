import { useMemo, useReducer, useState } from 'react';
import { useQueryClient } from 'react-query';
import useTestLongPress from '../../hooks/useTestLongPress';
import TimerHeader from './TimerHeader';
import { StopwatchReducer } from './timerReducer';
import { formatTime, getLatestAverageFromTimeStamps } from './timerUtils';

const Timer = () => {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(StopwatchReducer, {
    running: false,
    currentTime: 0,
    lastTime: 0,
  });
  const [swInterval, setSwInterval] = useState<NodeJS.Timeout | null>(null);
  const [isKeyPress, setIsKeyPress] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  // To be move to persistent storage
  const [times, setTimes] = useState<number[]>([]);

  // Temporary: To disable context menu for testing hold event
  // useEffect(() => {
  //   window.addEventListener(
  //     'contextmenu',
  //     (event) => {
  //       event?.preventDefault();
  //     },
  //     true
  //   );
  // }, []);
  const longPressEvent = useTestLongPress({
    pressHandlers: {
      onHold: () => {
        dispatch({ type: 'reset' });
        setIsLongPress(true);
      },
      onTap: async () => {
        setIsKeyPress(true);
        if (state.currentTime > 0 && state.running) {
          setIsKeyPress(false);
          dispatch({ type: 'stop' });
          setTimes([...times, state.currentTime]);
          await queryClient.refetchQueries(['scramble']);
          if (swInterval) {
            clearInterval(swInterval);
            setSwInterval(null);
          }
        }
      },
      onRelease: () => {
        setIsKeyPress(false);
        if (isLongPress) {
          setIsLongPress(false);
          dispatch({ type: 'start' });
          setSwInterval(
            setInterval(() => {
              dispatch({ type: 'tick' });
            }, 1)
          );
        }
      },
    },
  });

  let bg;

  if (isLongPress && isKeyPress) {
    bg = 'bg-green-400';
  } else if (isKeyPress && !isLongPress && !state.running) {
    bg = 'bg-red-400';
  } else {
    bg = 'bg-gray-50';
  }

  const averageOfFive = useMemo(() => {
    if (times.length >= 5) {
      const result = getLatestAverageFromTimeStamps(times, 5);
      return result;
    }
    return 0;
  }, [times]);

  const averageOfTwelve = useMemo(() => {
    if (times.length >= 12) {
      const result = getLatestAverageFromTimeStamps(times, 12);
      return result;
    }
    return 0;
  }, [times]);

  return (
    <main className="flex flex-col justify-center flex-grow">
      {!state.running && <TimerHeader />}
      <div
        {...longPressEvent}
        className={`h-full w-full 
         flex items-center justify-center flex-col touch-none select-none
         ${bg}
         `}
        tabIndex={0}
      >
        <h1 className="md:text-9xl text-7xl font-semibold">
          {formatTime(state.currentTime, { showMs: !state.running })}
        </h1>
        {!state.running && (
          <h2 className="md:text-7xl text-3xl font-light">
            Ao5: {averageOfFive > 0 ? formatTime(averageOfFive) : '-'}
          </h2>
        )}
        {!state.running && (
          <h2 className="md:text-7xl text-3xl font-light">
            Ao12: {averageOfTwelve > 0 ? formatTime(averageOfTwelve) : '-'}
          </h2>
        )}
      </div>
    </main>
  );
};

export default Timer;

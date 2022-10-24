import { useReducer, useState } from 'react';
import { useQueryClient } from 'react-query';
import useTestLongPress from '../../hooks/useTestLongPress';
import TimerHeader from './TimerHeader';
import { StopwatchReducer } from './timerReducer';

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

  const time = (t: number) => {
    const date = new Date(t);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milli = date.getMilliseconds();
    return {
      minutes,
      seconds,
      milli,
    };
  };

  let bg;

  if (isLongPress && isKeyPress) {
    bg = 'bg-green-400';
  } else if (isKeyPress && !isLongPress && !state.running) {
    bg = 'bg-red-400';
  } else {
    bg = 'bg-gray-50';
  }
  return (
    <main className="flex flex-col justify-center flex-grow">
      {!state.running && <TimerHeader />}
      <div
        {...longPressEvent}
        className={`h-full w-full md:text-9xl 
         flex items-center justify-center text-7xl font-semibold touch-none select-none
         ${bg}
         `}
        tabIndex={0}
      >
        {time(state.currentTime).minutes >= 1
          ? `${time(state.currentTime).minutes.toString().padStart(2, '0')}:`
          : null}
        {time(state.currentTime).seconds.toString()}
        {!state.running &&
          `.${time(state.currentTime).milli.toString().padStart(2, '0')}`}
      </div>
    </main>
  );
};

export default Timer;

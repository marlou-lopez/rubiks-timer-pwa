import dynamic from 'next/dynamic';
import { useReducer, useState } from 'react';
import { useQueryClient } from 'react-query';
import useTestLongPress from '../../hooks/useTestLongPress';
import { db } from '../../lib/db';
import TimerHeader from './TimerHeader';
import { StopwatchReducer } from './timerReducer';
import TimerStatPreview from './TimerStatPreview';
import { formatTime } from './timerUtils';

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
  // const [solves, setSolves] = useState<Solve[]>([]);

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
          const currentScramble = queryClient.getQueryData<string>([
            'scramble',
          ]);
          await db.solves.add({
            time: state.currentTime,
            scramble: currentScramble!,
          });
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
        {!state.running && <TimerStatPreview />}
      </div>
    </main>
  );
};

export default dynamic(() => Promise.resolve(Timer), { ssr: false });

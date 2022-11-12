import { useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import useTestLongPress from '../../hooks/useTestLongPress';
import { db, Solve } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';
import TimerHeader from './TimerHeader';
import TimerPenalty from './TimerPenalty';
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
  const { selectedPuzzle, selectedSession } = useSession();

  const [swInterval, setSwInterval] = useState<NodeJS.Timeout | null>(null);
  const [isKeyPress, setIsKeyPress] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);

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

          const currentSolves =
            queryClient.getQueryData<Solve[]>(['solves', selectedSession?.id]) ?? [];
          if (currentSolves?.length > 0) {
            const times = currentSolves.map((c) => c.time);
            const bestTime = Math.min(...times);
            if (state.currentTime < bestTime) {
              toast('New record single!', {
                icon: '🎉',
              });
            }
          }
          const currentScramble = queryClient.getQueryData<string>([
            'scramble',
            selectedPuzzle.value,
          ]);
          await db.solves.add({
            time: state.currentTime,
            scramble: currentScramble!,
            date: Date.now(),
            puzzleType: selectedPuzzle.value,
            sessionId: selectedSession?.id,
            penalty: null,
          });
          await queryClient.refetchQueries(['scramble']);
          await queryClient.refetchQueries(['solves']);
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
            }, 1),
          );
        }
      },
    },
  });

  const isTimerReady = isLongPress && isKeyPress;
  const isTimerPressed = isKeyPress && !isLongPress && !state.running;

  return (
    <main className="relative flex flex-grow flex-col justify-center">
      {!state.running && <TimerHeader />}
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
         ${state.running ? 'z-10' : ''}
         `}
        tabIndex={0}
      >
        <h1 className="text-7xl font-semibold text-black dark:text-white md:text-9xl">
          {formatTime(state.currentTime, { showMs: !state.running })}
        </h1>
        {!state.running && state.currentTime > 0 && <TimerPenalty />}
        {!state.running && <TimerStatPreview />}
        {!state.running && (
          <p className="absolute bottom-1/4 hidden text-lg text-gray-500 lg:block">
            Hold Space to start the timer.
          </p>
        )}
      </div>
    </main>
  );
};

export default Timer;

import type { NextPage } from 'next';
import { randomScrambleForEvent } from 'cubing/scramble';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import useLongPress from '../hooks/useLongPress';

const fetchScramble = async () => {
  const scramble = await randomScrambleForEvent('333');

  return scramble;
};

const Header = () => {
  const { data: scramble, isLoading } = useQuery(['scramble'], fetchScramble);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <header className="py-8 px-4 font-bold text-slate-800 border-b flex items-center justify-center text-center">
      {scramble?.toString()}
    </header>
  );
};

interface StopwatchState {
  running: boolean;
  currentTime: number;
  lastTime: number;
}
type StopwatchActions =
  | { type: 'stop' }
  | { type: 'start' }
  | { type: 'reset' }
  | { type: 'tick' };

export function StopwatchReducer(
  state: StopwatchState,
  action: StopwatchActions
): StopwatchState {
  switch (action.type) {
    case 'reset':
      return { running: false, currentTime: 0, lastTime: 0 };
    case 'start':
      return { ...state, running: true, lastTime: Date.now() };
    case 'stop':
      return { ...state, running: false };
    case 'tick':
      if (!state.running) return state;
      return {
        ...state,
        currentTime: state.currentTime + (Date.now() - state.lastTime),
        lastTime: Date.now(),
      };
  }
}

const Timer = () => {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(StopwatchReducer, {
    running: false,
    currentTime: 0,
    lastTime: 0,
  });
  const [swInterval, setSwInterval] = useState<NodeJS.Timeout | null>(null);
  const [isKeyPress, setIsKeyPress] = useState(false);
  const [isTimerStopped, setIsTimerStopped] = useState(true);
  // const callback = useCallback((event) => {
  //   setIsKeyPress(true);
  //   dispatch({ type: 'reset' });
  // }, []);
  // const bind = useLongPress(callback, {
  //   onStart: (event) => console.log('Press started'),
  //   onFinish: (event) => {
  //     dispatch({ type: 'start' });
  //     setIsKeyPress(false);
  //     setIsTimerStopped(false);
  //     setSwInterval(
  //       setInterval(() => {
  //         dispatch({ type: 'tick' });
  //       }, 1)
  //     );
  //   },
  //   onCancel: (event, { reason }) => console.log('Press cancelled: ', reason),
  //   // onMove: (event) => console.log('Detected mouse or touch movement'),
  //   filterEvents: (event) => true, // All events can potentially trigger long press
  //   threshold: 500,
  //   captureEvent: true,
  //   cancelOnMovement: false,
  // });

  const longPressEvent = useLongPress({
    onLongPress: (e) => {
      setIsKeyPress(true);
      dispatch({ type: 'reset' });
    },
    onUp: () => {
      dispatch({ type: 'start' });
      setIsKeyPress(false);
      setIsTimerStopped(false);
      setSwInterval(
        setInterval(() => {
          dispatch({ type: 'tick' });
        }, 1)
      );
    },
    onClick: async () => {
      if (state.currentTime > 0) {
        dispatch({ type: 'stop' });
        setIsTimerStopped(true);
        await queryClient.refetchQueries(['scramble']);
        if (swInterval) {
          clearInterval(swInterval);
          setSwInterval(null);
        }
      }
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
  return (
    <main className="flex flex-grow items-center justify-center">
      <div
        {...longPressEvent}
        // type={'button'}
        className="h-full w-full md:text-9xl flex items-center justify-center text-6xl font-semibold touch-none select-none"
        tabIndex={0}
      >
        {time(state.currentTime).minutes >= 1
          ? `${time(state.currentTime).minutes.toString().padStart(2, '0')}:`
          : null}
        {time(state.currentTime).seconds.toString()}
        {isTimerStopped &&
          `.${time(state.currentTime).milli.toString().padStart(2, '0')}`}
      </div>
    </main>
  );
};

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 flex flex-col h-screen w-screen">
      <Header />
      <Timer />
      <div>footer</div>
    </div>
  );
};

export default Home;

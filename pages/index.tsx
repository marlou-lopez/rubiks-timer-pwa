import type { NextPage } from 'next';
import { randomScrambleForEvent } from 'cubing/scramble';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useQuery, useQueryClient } from 'react-query';
import useLongPress from '../hooks/useLongPress';
import useTestLongPress from '../hooks/useTestLongPress';

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
  const [isLongPress, setIsLongPress] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

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
        console.log('onHold');
        dispatch({ type: 'reset' });
        setIsLongPress(true);
      },
      onTap: async () => {
        console.log('onTap');
        setIsKeyPress(true);
        if (state.currentTime > 0 && state.running) {
          console.log('onTap - if');
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
        console.log('onRelease');
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

  const onLongTouch = () => {
    dispatch({ type: 'reset' });
  };

  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === ' ') {
        if (event.type === 'keydown') {
          console.log('keytddoawdoaw');
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
          if (timeout.current === null) {
            timeout.current = setTimeout(() => {
              timeout.current = null;
              onLongTouch();
              setIsLongPress(true);
            }, 500);
          }
        }
      }
    },
    [state.currentTime, state.running, swInterval, queryClient]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === ' ') {
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
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
      }
    },
    [isLongPress]
  );

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      event.target.addEventListener(
        'touchend',
        (e) => e.cancelable && event.preventDefault(),
        {
          passive: false,
        }
      );

      setIsKeyPress(true);
      timeout.current = setTimeout(() => {
        timeout.current = null;
        onLongTouch();
        setIsLongPress(true);
      }, 500);
    },
    []
  );

  const handleTouchEnd = useCallback(
    async (event: React.TouchEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.target.removeEventListener('touchend', (e) => e.preventDefault());
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
      if (state.currentTime > 0 && state.running) {
        dispatch({ type: 'stop' });
        await queryClient.refetchQueries(['scramble']);
        if (swInterval) {
          clearInterval(swInterval);
          setSwInterval(null);
        }
      }
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    },
    [isLongPress, state.currentTime, state.running, swInterval, queryClient]
  );

  let bg;

  if (isLongPress && isKeyPress) {
    bg = 'bg-green-400';
  } else if (isKeyPress && !isLongPress && !state.running) {
    bg = 'bg-red-400';
  } else {
    bg = 'bg-gray-50';
  }
  return (
    <main className="flex flex-grow items-center justify-center">
      <div
        {...longPressEvent}
        // onKeyDown={handleKeyDown}
        // onKeyUp={handleKeyUp}
        // onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchEnd}
        // onTouchMove={(event) => {
        //   if (timeout.current) {
        //     clearTimeout(timeout.current);
        //   }
        // }}
        // type={'button'}
        className={`h-full w-full md:text-9xl 
         flex items-center justify-center text-6xl font-semibold touch-none select-none
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

import { TwistyPlayer } from 'cubing/twisty';
import { Alg } from 'cubing/alg';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from '@heroicons/react/20/solid';
type AlgPlayerProps = {
  algorithm: string;
};

export enum Direction {
  Forwards = 1,
  Paused = 0,
  Backwards = -1,
}

export enum BoundaryType {
  Move = 'move',
  EntireTimeline = 'entire-timeline',
}

const AlgPlayer: React.FC<AlgPlayerProps> = ({ algorithm }) => {
  const playerRef = useRef(
    new TwistyPlayer({
      puzzle: '3x3x3',
      hintFacelets: 'none',
      controlPanel: 'none',
      background: 'none',
      // experimentalStickering: 'PLL',
      experimentalSetupAlg: 'z2 y2', // To place yellow on top
      experimentalSetupAnchor: 'end',
      alg: new Alg(algorithm).toString(),
    }),
  );
  useEffect(() => {
    const element = document.getElementById('player');
    const playerRefCopy = playerRef;
    playerRef.current.style.width = '100%';
    playerRef.current.style.height = '100%';
    if (element && element.childElementCount < 1) {
      element.appendChild(playerRefCopy.current);
    }

    return () => {
      if (element && element.childElementCount < 1) {
        element.removeChild(playerRefCopy.current);
      }
    };
  }, []);

  return (
    <div className="flex h-full flex-grow flex-col">
      <div
        className="flex w-full flex-grow items-center justify-between rounded-md border border-black dark:border-white"
        id="player"
      />
      <div className="flex items-center justify-between py-2">
        <div className="flex gap-4">
          <button
            className="flex items-center gap-1 rounded-lg border bg-black px-3 py-1"
            onClick={() => {
              playerRef.current.controller.animationController.play({
                direction: Direction.Backwards,
                untilBoundary: BoundaryType.Move,
              });
            }}
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </button>
          <button
            className="flex items-center gap-1 rounded-lg border bg-black px-3 py-1"
            onClick={() => {
              playerRef.current.controller.animationController.play({
                direction: Direction.Forwards,
                untilBoundary: BoundaryType.Move,
              });
            }}
          >
            <ChevronRightIcon className="h-8 w-8" />
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              playerRef.current.jumpToStart();
            }}
            className="flex items-center rounded-lg border bg-black px-3 py-1"
          >
            <ArrowPathIcon className="h-8 w-8" />
          </button>
          <button
            onClick={() => {
              playerRef.current.play();
            }}
            className="flex items-center rounded-lg border bg-black px-3 py-1"
          >
            <PlayIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgPlayer;

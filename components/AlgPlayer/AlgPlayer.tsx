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
  // const player = useMemo(() => {
  //   const p = new TwistyPlayer({
  //     puzzle: '3x3x3',
  //     hintFacelets: 'none',
  //     controlPanel: 'none',
  //     background: 'none',
  //     // experimentalStickering: 'PLL',
  //     experimentalSetupAlg: 'z2 y2', // To place yellow on top
  //     experimentalSetupAnchor: 'end',
  //     alg: new Alg(algorithm).toString(),
  //   });
  //   return p;
  // }, [algorithm]);

  // useEffect(() => {
  //   const element = document.getElementById('player');
  //   if (element) {
  //     if (element.childElementCount > 1) {
  //       const child = element.firstChild;
  //       element.removeChild(child!);
  //     }
  //     element.appendChild(player);
  //   }
  // }, [player]);
  useEffect(() => {
    const element = document.getElementById('player');
    const playerRefCopy = playerRef;
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
    <div>
      <div className="flex justify-center " id="player" />
      <div className="flex items-center justify-between py-2">
        <div className="flex gap-4">
          <button
            className="flex items-center gap-1 rounded-lg border bg-black px-3 py-1"
            onClick={() => {
              // player.controller.animationController.play({
              //   direction: Direction.Backwards,
              //   untilBoundary: BoundaryType.Move,
              // });
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
              // player.controller.animationController.play({
              //   direction: Direction.Forwards,
              //   untilBoundary: BoundaryType.Move,
              // });
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
              // player.jumpToStart();
              playerRef.current.jumpToStart();
            }}
            className="flex items-center rounded-lg border bg-black px-3 py-1"
          >
            <ArrowPathIcon className="h-8 w-8" />
          </button>
          <button
            onClick={() => {
              // player.play();
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

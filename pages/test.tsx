import { TwistyPlayer } from 'cubing/twisty';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';

const CASE_ONE = "R U' R' U2 y' R' U' R";

const Test = () => {
  // const player = useMemo(() => {
  //   const p = new TwistyPlayer({
  //     puzzle: '3x3x3',
  //     hintFacelets: 'none',
  //     background: 'none',
  //     experimentalSetupAnchor: 'end',
  //     // experimentalSetupAlg: selectedAlg,
  //     alg: CASE_ONE,
  //     experimentalStickering: 'F2L',
  //   });
  //   return p;
  // }, []);
  // useEffect(() => {
  //   const element = document.getElementById('player');
  //   if (element) {
  //     element.appendChild(player);
  //   }
  // }, [player]);

  return (
    <>
      {/* <div id="player" className="flex justify-center" />;
      <button
        className="py-2 px-4 rounded-md bg-pink-500 text-white mt-2"
        onClick={() => {
          player.play();
        }}
      >
        Play
      </button>
      <button
        className="py-2 px-4 rounded-md bg-pink-500 text-white mt-2"
        onClick={() => {
          player.jumpToStart();
        }}
      >
        Reset
      </button>
      <Link href={'/solves'}>
        <a>Go back</a>
      </Link> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(Test), { ssr: false });

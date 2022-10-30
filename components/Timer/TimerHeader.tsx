import { randomScrambleForEvent } from 'cubing/scramble';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

const fetchScramble = async () => {
  const scramble = await randomScrambleForEvent('333');

  return scramble.toString();
};

const TimerHeader = () => {
  const {
    data: scramble,
    isLoading,
    refetch,
  } = useQuery(['scramble'], fetchScramble);

  return (
    <header className="fixed w-full top-0 text-black dark:text-white py-8 px-4 font-semibold flex items-center justify-center text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
      {!isLoading ? (
        <button
          //  Add tooltip component(?)
          title="Click to generate new scramble."
          onClick={() => refetch()}
          type={'button'}
        >
          {scramble}
        </button>
      ) : (
        <p>Generating Scramble...</p>
      )}
    </header>
  );
};

export default React.memo(TimerHeader);

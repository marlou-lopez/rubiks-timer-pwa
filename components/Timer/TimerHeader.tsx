import { randomScrambleForEvent } from 'cubing/scramble';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

const fetchScramble = async () => {
  const scramble = await randomScrambleForEvent('333');

  return scramble.toString();
};

const TimerHeader = () => {
  const { data: scramble, isLoading } = useQuery(['scramble'], fetchScramble);

  console.log(scramble);
  return (
    <>
      <header className="py-8 px-4 font-semibold text-slate-800 flex items-center justify-center text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
        {!isLoading ? scramble : <p>Generating Scramble...</p>}
      </header>
      <section className="flex border-b flex-grow">
        <Link href={'/solves'}>
          <a className="bg-gray-900 text-white p-3 font-semibold text-center w-1/2">
            Solves
          </a>
        </Link>
        <Link href={'/stats'}>
          <a className="bg-gray-900 text-white p-3 font-semibold w-1/2 text-center pointer-events-none">
            Statistics (TBD)
          </a>
        </Link>
      </section>
    </>
  );
};

export default React.memo(TimerHeader);

import { randomScrambleForEvent } from 'cubing/scramble';
import React from 'react';
import { useQuery } from 'react-query';

const fetchScramble = async () => {
  const scramble = await randomScrambleForEvent('333');

  return scramble;
};

const TimerHeader = () => {
  const { data: scramble, isLoading } = useQuery(['scramble'], fetchScramble);

  return (
    <header className="py-8 px-4 font-semibold text-slate-800 border-b flex items-center justify-center text-center md:text-lg">
      {!isLoading ? scramble?.toString() : <p>Generating Scramble...</p>}
    </header>
  );
};

export default React.memo(TimerHeader);

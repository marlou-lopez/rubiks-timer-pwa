import { Menu } from '@headlessui/react';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';
import { randomScrambleForEvent } from 'cubing/scramble';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import { setDebug } from 'cubing/search';

setDebug({
  forceStringWorker: true,
});

const fetchScramble = async () => {
  try {
    const scramble = await randomScrambleForEvent('333');

    return scramble.toString();
  } catch (error) {
    console.error(error);
  }
};

const TimerMenu = () => {
  return (
    <Menu>
      <Menu.Button>
        <Cog6ToothIcon className="h-5 w-5" />
      </Menu.Button>
      <Menu.Items>
        <Menu.Item>
          <Link href={'/about'}>About</Link>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

const TimerHeader = () => {
  const {
    data: scramble,
    isLoading,
    refetch,
  } = useQuery(['scramble'], fetchScramble, {
    refetchOnMount: false,
  });

  console.log('TimerHeader');
  return (
    <header className="fixed top-0 flex w-full flex-col items-center justify-center gap-2 py-6 px-4 text-center text-lg font-semibold text-black dark:text-white sm:text-xl md:text-2xl lg:text-3xl">
      <div>
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
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">Generating Scramble...</p>
        )}
      </div>
    </header>
  );
};

export default React.memo(TimerHeader);

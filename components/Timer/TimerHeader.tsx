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
  } = useQuery(['scramble'], fetchScramble);

  return (
    <header className="fixed w-full top-0 text-black dark:text-white py-6 px-4 font-semibold flex flex-col gap-2 items-center justify-center text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
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
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Generating Scramble...
          </p>
        )}
      </div>
    </header>
  );
};

export default React.memo(TimerHeader);

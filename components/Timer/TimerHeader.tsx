import { Listbox, Menu } from '@headlessui/react';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';
import { randomScrambleForEvent } from 'cubing/scramble';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import { setDebug } from 'cubing/search';
import { db, PuzzleType, Session } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';

setDebug({
  forceStringWorker: true,
});

const fetchScramble = async (puzzleType: PuzzleType) => {
  try {
    const scramble = await randomScrambleForEvent(puzzleType);

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

export type Puzzle = {
  name: string;
  value: PuzzleType;
};

const PUZZLES: Puzzle[] = [
  {
    name: '2x2x2',
    value: '222',
  },
  {
    name: '3x3x3',
    value: '333',
  },
  {
    name: '4x4x4',
    value: '444',
  },
];

const TimerDropdown = () => {
  const { selectedPuzzle, selectedSession, onPuzzleSelect, onSessionSelect } = useSession();
  console.log('selectedPuzzle: ', selectedPuzzle);
  const { data: sessions } = useQuery(
    ['sessions', selectedPuzzle.value],
    () =>
      db.sessions
        .where({
          puzzleType: selectedPuzzle.value,
        })
        .toArray(),
    {
      onSuccess: (data) => {
        console.log('onSuccess');
        if (!selectedSession) {
          const defaultSession = data.find(
            (d) => d.isDefault && d.puzzleType === selectedPuzzle.value,
          );
          onSessionSelect(defaultSession!);
        }
      },
    },
  );

  return (
    <div className="flex w-60 items-center gap-2 ">
      <Listbox value={selectedPuzzle} onChange={onPuzzleSelect}>
        <div className="relative">
          <Listbox.Button className="relative w-full rounded-md bg-black px-3 py-1 text-sm text-white dark:bg-white dark:text-black">
            {selectedPuzzle.name}
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black text-sm text-white dark:bg-white dark:text-black">
            {PUZZLES.map((option, index) => {
              return (
                <Listbox.Option
                  key={index}
                  value={option}
                  className={({ active }) => {
                    return `relative cursor-default select-none py-1
                    ${active ? 'bg-white/25 dark:bg-black/5' : ''}
                    `;
                  }}
                >
                  {({ selected }) => (
                    <span className={`${selected ? 'font-bold' : ''}`}>{option.name}</span>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
      <Listbox value={selectedSession} onChange={onSessionSelect}>
        <div className="relative flex-grow">
          <Listbox.Button className="relative w-full rounded-md bg-black px-3 py-1 text-sm text-white dark:bg-white dark:text-black">
            {selectedSession?.name}
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black text-sm text-white dark:bg-white dark:text-black">
            {(sessions ?? []).map((option, index) => {
              return (
                <Listbox.Option
                  key={index}
                  value={option}
                  className={({ active }) => {
                    return `relative cursor-default select-none py-1 px-2 text-left
                    ${active ? 'bg-white/25 dark:bg-black/5' : ''}
                    `;
                  }}
                >
                  {option.name}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

const TimerHeader = () => {
  const { selectedPuzzle } = useSession();
  const {
    data: scramble,
    isLoading,
    refetch,
  } = useQuery(['scramble', selectedPuzzle.value], () => fetchScramble(selectedPuzzle.value), {
    refetchOnMount: false,
  });

  return (
    <header className="fixed top-0 flex w-full flex-col items-center justify-center gap-6 p-4 text-center text-lg font-semibold text-black dark:text-white sm:text-xl md:text-2xl lg:text-3xl">
      <div className="flex w-full items-center justify-between">
        <TimerDropdown />
        <TimerMenu />
      </div>
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

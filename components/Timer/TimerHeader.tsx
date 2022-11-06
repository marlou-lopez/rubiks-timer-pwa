import { Listbox, Menu } from '@headlessui/react';
import { Cog6ToothIcon, FolderIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { randomScrambleForEvent } from 'cubing/scramble';
import Link, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, forwardRef, useState } from 'react';
import { useQuery } from 'react-query';
import { setDebug } from 'cubing/search';
import { db, PuzzleType, Session } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';
import TimerDropdown from './TimerDropdown';
import TimerDialog from './TimerDialog';

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

const RefForwardedLink = forwardRef<
  // React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  HTMLAnchorElement,
  LinkProps & { children: React.ReactNode; className?: string }
>(function RefForwardedLink(props, ref) {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

const TimerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Menu as={'div'} className="relative text-left">
        <Menu.Button type="button" className="flex items-center">
          <Cog6ToothIcon className="h-5 w-5" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md bg-black p-1 text-sm text-white dark:bg-white dark:text-black">
          <Menu.Item>
            {({ active }) => (
              <RefForwardedLink
                href={'/about'}
                className={`inline-flex w-full items-center gap-1 rounded-md px-2 py-1
              ${active ? 'bg-white/25 dark:bg-black/5' : ''}`}
              >
                <InformationCircleIcon className="h-4 w-4" />
                <span>About {active}</span>
              </RefForwardedLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setIsOpen(true)}
                className={`inline-flex w-full items-center gap-1 rounded-md px-2 py-1
              ${active ? 'bg-white/25 dark:bg-black/5' : ''}
            `}
              >
                <FolderIcon className="h-4 w-4" />
                <span>Manage Session</span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <TimerDialog isOpen={isOpen} closeDialog={() => setIsOpen(false)} />
    </>
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
    <header className="fixed top-0 flex w-full flex-col items-center justify-center gap-5 p-4 text-center text-lg font-semibold text-black dark:text-white sm:text-xl md:text-2xl lg:text-3xl">
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

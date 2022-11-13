import { Listbox, Menu } from '@headlessui/react';
import {
  Cog6ToothIcon,
  FolderIcon,
  InformationCircleIcon,
  WrenchIcon,
} from '@heroicons/react/20/solid';
import { randomScrambleForEvent } from 'cubing/scramble';
import Link, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, forwardRef, useState } from 'react';
import { useQuery } from 'react-query';
import { setDebug } from 'cubing/search';
import { db, PuzzleType, Session } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';
import SessionSelector from './SessionSelector';
import SessionDialog from '../Dialogs/SessionDialog';
import ConfigDialog from '../Dialogs/ConfigDialog';

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
  const [timerDialogOpen, setTimerDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  return (
    <>
      <Menu as={'div'} className="relative text-left">
        <Menu.Button type="button" className="flex items-center">
          <Cog6ToothIcon className="h-5 w-5" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md bg-black p-1 text-sm text-white dark:bg-white dark:text-black">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setTimerDialogOpen(true)}
                className={`inline-flex w-full items-center gap-1 rounded-md p-2
              ${active ? 'bg-white/25 dark:bg-black/5' : ''}
            `}
              >
                <FolderIcon className="h-4 w-4" />
                <span>Manage Sessions</span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setConfigDialogOpen(true)}
                className={`inline-flex w-full items-center gap-1 rounded-md p-2
              ${active ? 'bg-white/25 dark:bg-black/5' : ''}
            `}
              >
                <WrenchIcon className="h-4 w-4" />
                <span>Config</span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <RefForwardedLink
                href={'/about'}
                className={`inline-flex w-full items-center gap-1 rounded-md p-2
              ${active ? 'bg-white/25 dark:bg-black/5' : ''}`}
              >
                <InformationCircleIcon className="h-4 w-4" />
                <span>About</span>
              </RefForwardedLink>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <SessionDialog isOpen={timerDialogOpen} closeDialog={() => setTimerDialogOpen(false)} />
      <ConfigDialog isOpen={configDialogOpen} closeDialog={() => setConfigDialogOpen(false)} />
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
        <SessionSelector />
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

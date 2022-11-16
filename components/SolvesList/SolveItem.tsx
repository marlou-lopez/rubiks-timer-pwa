import { Menu } from '@headlessui/react';
import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { db, Solve } from '../../lib/db';
import SolveDialog from '../Dialogs/SolveDialog';
import { formatTime } from '../Timer/timerUtils';

const SolveItemMenu = (solve: Solve) => {
  const { scramble, id } = solve;
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const handleDelete = async (id: number) => {
    await db.solves.where({ id }).delete();
    await queryClient.refetchQueries(['solves']);
  };

  const handleCopy = async () => {
    if (!navigator?.clipboard) {
      // Add toast?
      console.warn('Clipboard not supported');
      return;
    }
    try {
      await navigator.clipboard.writeText(scramble);
    } catch (error) {
      console.warn('Something went wrong');
    }
  };

  return (
    <>
      <Menu as={'div'} className="relative">
        <Menu.Button className="flex items-center">
          <ChevronDownIcon className="h-5 w-5 text-black dark:text-white" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 flex w-44 flex-col rounded-sm border bg-white dark:bg-black">
          <Menu.Item
            as={'button'}
            onClick={() => setOpenDialog(true)}
            className="flex items-center gap-2 py-2 px-4 text-black dark:text-white"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            <span>View Solve</span>
          </Menu.Item>
          <Menu.Item
            as={'button'}
            onClick={handleCopy}
            className="flex items-center gap-2 py-2 px-4 text-black dark:text-white"
          >
            <ClipboardDocumentListIcon className="h-4 w-4" />
            <span>Copy scramble</span>
          </Menu.Item>
          <Menu.Item
            as={'button'}
            onClick={() => handleDelete(id!)}
            className="flex items-center gap-2 py-2 px-4 text-black dark:text-white"
          >
            <TrashIcon className="h-4 w-4" />
            <span>Delete</span>
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <SolveDialog solve={solve} open={openDialog} closeDialog={() => setOpenDialog(false)} />
    </>
  );
};

const SolveItem: React.FC<Solve> = (solve) => {
  const isDNF = solve.penalty === 'DNF';
  const isPlusTwo = solve.penalty === '+2';
  return (
    <>
      <div
        className={`relative flex items-center justify-between hover:bg-gray-200/50 hover:dark:bg-gray-500/25
        ${
          isDNF
            ? ' bg-gray-300 text-black/60 hover:bg-gray-300 dark:bg-gray-700 dark:text-white/50 hover:dark:bg-gray-700'
            : ''
        }
      `}
      >
        <span
          className={`text-xl font-bold text-black dark:text-white
          ${isDNF ? 'text-black/60 dark:text-white/50' : ''}
        `}
        >
          {`${formatTime(solve.time)}${isPlusTwo ? '+' : ''}`}
        </span>
        {isDNF && <span>DNF</span>}
        <SolveItemMenu {...solve} />
      </div>
    </>
  );
};

export default SolveItem;

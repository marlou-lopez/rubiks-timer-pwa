import { Menu } from '@headlessui/react';
import {
  ChevronDownIcon,
  ClipboardDocumentListIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { db, Solve } from '../../lib/db';
import { formatTime } from '../Timer/timerUtils';

const SolveItemMenu = ({ scramble, id }: Solve) => {
  const handleDelete = async (id: number) => {
    await db.solves.where({ id }).delete();
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
    <Menu as={'div'} className="relative">
      <Menu.Button className="flex items-center">
        <ChevronDownIcon className="h-5 w-5 text-black dark:text-white" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 w-44 flex flex-col bg-white dark:bg-black z-10 border rounded-sm">
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
  );
};

const SolveItem: React.FC<Solve> = (solve) => {
  return (
    <>
      <div className="flex justify-between items-center hover:dark:bg-gray-500/25 hover:bg-gray-200/50">
        <span className="font-bold text-xl text-black dark:text-white">
          {formatTime(solve.time)}
        </span>
        <SolveItemMenu {...solve} />
      </div>
    </>
  );
};

export default SolveItem;

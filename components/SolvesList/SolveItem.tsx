import { Menu } from '@headlessui/react';
import { ChevronDownIcon, ClipboardDocumentListIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useQueryClient } from 'react-query';
import { db, Solve } from '../../lib/db';
import { formatTime } from '../Timer/timerUtils';

const SolveItemMenu = ({ scramble, id }: Solve) => {
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
    <Menu as={'div'} className="relative">
      <Menu.Button className="flex items-center">
        <ChevronDownIcon className="h-5 w-5 text-black dark:text-white" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-10 flex w-44 flex-col rounded-sm border bg-white dark:bg-black">
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
      <div className="flex items-center justify-between hover:bg-gray-200/50 hover:dark:bg-gray-500/25">
        <span className="text-xl font-bold text-black dark:text-white">
          {formatTime(solve.time)}
        </span>
        <SolveItemMenu {...solve} />
      </div>
    </>
  );
};

export default SolveItem;

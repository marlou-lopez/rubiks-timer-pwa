import { ClipboardDocumentListIcon, ClipboardIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PUZZLES, Solve } from '../../../lib/db';
import { formatTime } from '../../Timer/timerUtils';
import AppDialog from '../AppDialog';

type DialogProps = {
  open: boolean;
  closeDialog: () => void;
  solve: Solve;
};

const SolveDialogTitle = (solve: Solve) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center text-xl font-bold leading-6 text-gray-900">
        Solve ID: {solve.id}
      </h3>
      {/* <span className="rounded-full bg-black px-2 text-sm font-semibold text-white">
        {PUZZLES.find((p) => p.value === solve.puzzleType)?.name}
      </span> */}
      <div className="text-sm font-semibold">
        {new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(
          solve.date,
        )}
      </div>
    </div>
  );
};
const SolveDialog: React.FC<DialogProps> = ({ solve, open, closeDialog }) => {
  // Duplicate, maybe make this into hook
  const handleCopy = async () => {
    if (!navigator?.clipboard) {
      // Add toast?
      console.warn('Clipboard not supported');
      return;
    }
    try {
      await toast.promise(navigator.clipboard.writeText(solve.scramble), {
        success: 'Scramble copied',
        loading: 'Copying...',
        error: 'Something went wrong',
      });
    } catch (error) {
      console.warn('Something went wrong');
    }
  };

  return (
    <AppDialog open={open} onClose={closeDialog} title={<SolveDialogTitle {...solve} />}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center p-3">
          <h1 className="text-4xl">{formatTime(solve.time)}</h1>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex justify-end">
            <button onClick={handleCopy} className="flex items-center gap-1 text-sm font-semibold ">
              <span>Click to copy</span>
              <ClipboardDocumentListIcon className="h-3 w-3" />
            </button>
          </div>
          <div
            onClick={handleCopy}
            className="flex w-full cursor-pointer items-center gap-2 border p-2"
          >
            <span className="text-center font-mono">{solve.scramble}</span>
          </div>
        </div>
      </div>
    </AppDialog>
  );
};

export default SolveDialog;

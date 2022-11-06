import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { db, Puzzle } from '../../lib/db';
import AppDialog from '../AppDialog';

type AddSessionDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  puzzleType: Puzzle['value'];
};

const AddSessionDialog: React.FC<AddSessionDialogProps> = ({ isOpen, closeDialog, puzzleType }) => {
  const queryClient = useQueryClient();
  const [sessionName, setSessionName] = useState('');

  const addSession = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    event.preventDefault();
    setSessionName('');
    await toast.promise(
      db.sessions.add({
        name: sessionName,
        puzzleType,
        isDefault: false,
      }),
      {
        loading: 'Adding session...',
        error: 'Something went wrong',
        success: 'New session added!',
      },
    );
    await queryClient.refetchQueries(['sessions', puzzleType]);
  };

  return (
    <AppDialog open={isOpen} onClose={closeDialog} title="Add Session">
      <form onSubmit={addSession} className="mt-2">
        <input
          type={'text'}
          value={sessionName}
          onChange={(event) => setSessionName(event.target.value)}
          // ref={inputRef}
          id="session-name"
          placeholder="Enter session name"
          className="w-full rounded-md border-2 bg-gray-50 p-2 text-black"
        />
        <div className="mt-4 flex justify-end">
          <button
            type={'submit'}
            className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white "
            onClick={async (event) => {
              await addSession(event);
              closeDialog();
            }}
          >
            Add
          </button>
        </div>
      </form>
    </AppDialog>
  );
};

export default AddSessionDialog;

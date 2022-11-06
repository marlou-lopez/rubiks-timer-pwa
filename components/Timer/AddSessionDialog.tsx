import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { db, Puzzle, Session } from '../../lib/db';
import AppDialog from '../AppDialog';

// TODO: Refactor to handle add/edit more efficiently
type AddSessionDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  puzzleType: Puzzle['value'];
  isEdit?: boolean;
  session?: Session | null;
};

const AddSessionDialog: React.FC<AddSessionDialogProps> = ({
  isOpen,
  closeDialog,
  puzzleType,
  isEdit,
  session,
}) => {
  const queryClient = useQueryClient();
  const [sessionName, setSessionName] = useState(session ? session.name : '');
  console.log('sfasd: ', session);
  console.log('iadlog: ', sessionName);
  const addSession = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    event.preventDefault();
    setSessionName('');
    if (!isEdit) {
      await toast.promise(
        db.sessions.add({
          name: sessionName,
          puzzleType,
          isDefault: false,
          date: Date.now(),
        }),
        {
          loading: 'Adding session...',
          error: 'Something went wrong',
          success: 'New session added!',
        },
      );
    } else {
      await toast.promise(
        db.sessions.update(session?.id!, {
          name: sessionName,
        }),
        {
          loading: 'Editing session...',
          error: 'Something went wrong',
          success: 'Session edited!',
        },
      );
    }
    await queryClient.refetchQueries(['sessions', puzzleType]);
  };

  return (
    <AppDialog open={isOpen} onClose={closeDialog} title={isEdit ? 'Edit Session' : 'Add Session'}>
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
            {isEdit ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
    </AppDialog>
  );
};

export default AddSessionDialog;

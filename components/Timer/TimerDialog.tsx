import { LockClosedIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { FixedSizeList } from 'react-window';
import { db, Puzzle, Session } from '../../lib/db';
import AppDialog from '../AppDialog';
import PuzzleDropdown from '../Dropdowns/PuzzleDropdown';
import AddSessionDialog from './AddSessionDialog';

type TimerDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
};

const TimerDialog: React.FC<TimerDialogProps> = ({ isOpen, closeDialog }) => {
  const queryClient = useQueryClient();
  const [puzzle, setPuzzle] = useState<Puzzle>({
    name: '3x3x3',
    value: '333',
  });

  const { data: sessions, isLoading } = useQuery(['sessions', puzzle.value], () =>
    db.sessions
      .where({
        puzzleType: puzzle.value,
      })
      .toArray(),
  );

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditOpenDialog] = useState(false);

  const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);

  return (
    <>
      <AppDialog open={isOpen} onClose={closeDialog} title="Manage Sessions">
        <div className="mt-2 flex h-[400px] flex-grow flex-col">
          <div className="font-semibold">
            <PuzzleDropdown value={puzzle} onChange={(puzzle) => setPuzzle(puzzle)} />
          </div>
          <div className="flex-grow">
            <div className="flex justify-end py-1">
              <button onClick={() => setAddDialogOpen(true)} className="flex items-center gap-1 ">
                <PlusIcon className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
            {isLoading ? (
              <div className="flex h-[200px] items-center justify-center">
                <p>Fetching sessions</p>
              </div>
            ) : (
              <FixedSizeList
                className="scrollbar-thin scrollbar-track-black/10 scrollbar-thumb-black scrollbar-track-rounded-md scrollbar-thumb-rounded-md "
                height={280}
                width="100%"
                itemCount={(sessions ?? []).length}
                itemData={sessions ?? []}
                itemSize={40}
                innerElementType="ul"
              >
                {({ data, index, style }) => (
                  <li
                    className={`flex items-center justify-between ${
                      data[index].isDefault ? 'text-gray-400' : ''
                    }`}
                    key={data[index].id}
                    style={style}
                  >
                    {data[index].name}
                    <div className="flex items-center gap-2">
                      {data[index].isDefault ? (
                        <LockClosedIcon className="h-4 w-4" />
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditOpenDialog(true);
                              setSessionToEdit(data[index]);
                            }}
                            title="Edit"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            title="Delete"
                            onClick={async () => {
                              await db.sessions.delete(data[index].id!);
                              await queryClient.refetchQueries([
                                'sessions',
                                data[index].puzzleType,
                              ]);
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                )}
              </FixedSizeList>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white "
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </div>
      </AppDialog>
      <AddSessionDialog
        puzzleType={puzzle.value}
        isOpen={addDialogOpen}
        closeDialog={() => setAddDialogOpen(false)}
      />
      {/* TODO: Fix transition */}
      {sessionToEdit && (
        <AddSessionDialog
          isOpen={editDialogOpen}
          closeDialog={() => {
            setSessionToEdit(null);
            setEditOpenDialog(false);
          }}
          puzzleType={sessionToEdit ? sessionToEdit.puzzleType : puzzle.value}
          isEdit={true}
          session={sessionToEdit}
        />
      )}
    </>
  );
};

export default TimerDialog;

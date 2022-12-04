import { useState } from 'react';
import toast from 'react-hot-toast';
import AppDialog from '../Dialogs/AppDialog';

type ListHeaderProps = {
  handleDeleteAll: () => Promise<void>;
  solveCount: number;
};

const ListHeader: React.FC<ListHeaderProps> = ({ solveCount, handleDeleteAll }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return (
    <section className="w-full bg-white dark:bg-black">
      <div className="mx-auto flex w-full max-w-sm items-center justify-between py-2 md:max-w-2xl">
        <h2 className="font-semibold">Count: {solveCount}</h2>
        {solveCount > 0 && (
          <button
            type="button"
            onClick={() => setDeleteDialogOpen(true)}
            className="text-xs font-semibold uppercase text-black dark:text-white"
          >
            Delete All
          </button>
        )}
      </div>
      <AppDialog
        title="Delete all solves?"
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <p>Are you sure you want to delete all solves?</p>
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium "
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white "
            onClick={async () => {
              toast.promise(handleDeleteAll(), {
                error: 'Something went wrong',
                loading: 'Deleting all solves...',
                success: 'All solves were deleted successfully.',
              });
              setDeleteDialogOpen(false);
            }}
          >
            Yes
          </button>
        </div>
      </AppDialog>
    </section>
  );
};

export default ListHeader;

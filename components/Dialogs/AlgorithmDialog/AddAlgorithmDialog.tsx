import React, { useState } from 'react';
import AppDialog from '../AppDialog';
import { Alg } from 'cubing/alg';
import toast from 'react-hot-toast';
import { Case, db } from '../../../lib/db';
import { useMutation, useQueryClient } from 'react-query';

type AddAlgoDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  algCase: Case;
};

const AddAlgorithmDialog: React.FC<AddAlgoDialogProps> = ({ isOpen, closeDialog, algCase }) => {
  const queryClient = useQueryClient();
  const { mutate: updateCase } = useMutation({
    mutationFn: (algCase: Case) => {
      return db.cases.put(algCase);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alg_case', algCase.slug] });
    },
  });
  const [algo, setAlgo] = useState('');

  const addAlgo = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    event.preventDefault();
    try {
      const algFromString = Alg.fromString(algo);

      const algToString = new Alg(algFromString).toString();

      updateCase({
        ...algCase,
        algorithms: [...algCase.algorithms, algToString],
      });

      setAlgo('');
    } catch (error) {
      toast.error('Not a valid algorithm');
    }
  };
  return (
    <AppDialog open={isOpen} onClose={closeDialog} title="Add algorithm">
      <form onSubmit={addAlgo} className="mt-2">
        <input
          type={'text'}
          value={algo}
          onChange={(event) => setAlgo(event.target.value)}
          id="session-name"
          placeholder="Enter Algorithm"
          className="w-full rounded-md border-2 bg-white p-2 text-black"
        />
        <div className="mt-4 flex justify-end">
          <button
            type={'submit'}
            className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white "
            onClick={(event) => {
              addAlgo(event);
              closeDialog();
            }}
          >
            Add
            {/* {isEdit ? 'Edit' : 'Add'} */}
          </button>
        </div>
      </form>
    </AppDialog>
  );
};

export default AddAlgorithmDialog;

import { Transition, Dialog } from '@headlessui/react';
import { PlusCircleIcon, PlusSmallIcon } from '@heroicons/react/20/solid';
import { Fragment, useRef, useState } from 'react';

type TimerDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
};
const TimerDialog: React.FC<TimerDialogProps> = ({ isOpen, closeDialog }) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const handleClose = () => {
    // setOpen(false)
    closeDialog();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        initialFocus={inputRef}
        // as="div"
        className="relative z-10"
        onClose={closeDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex items-center text-lg font-medium leading-6 text-gray-900"
                >
                  <PlusSmallIcon className="h-6 w-6" />
                  Add Session
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type={'text'}
                    ref={inputRef}
                    id="session-name"
                    placeholder="Enter session name"
                    className="w-full rounded-md border-2 bg-gray-50 p-2 text-black"
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium "
                    onClick={closeDialog}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TimerDialog;

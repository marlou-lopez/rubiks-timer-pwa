import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

type AppDialogProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  initialFocusRef?: any;
};

const AppDialog: React.FC<AppDialogProps> = ({
  children,
  title,
  onClose,
  open,
  initialFocusRef = null,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        open={open}
        initialFocus={initialFocusRef}
        className="relative z-10"
        onClose={onClose}
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
              <Dialog.Panel className=" w-full max-w-md transform rounded-lg bg-white p-6 text-left align-middle text-black shadow-xl transition-all">
                {/* <div className="flex justify-end">
                  <button onClick={onClose}>
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </div> */}
                <Dialog.Title
                  as="h3"
                  className="flex items-center text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2 flex flex-grow flex-col" ref={initialFocusRef}>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AppDialog;

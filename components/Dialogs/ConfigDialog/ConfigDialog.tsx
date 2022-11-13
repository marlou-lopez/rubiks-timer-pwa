import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useTheme } from 'next-themes';
import AppDialog from '../AppDialog';

type ConfigDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
};

type ListOption = {
  label: string;
  value: string;
};
const themes: ListOption[] = [
  {
    label: 'System',
    value: 'system',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'Light',
    value: 'light',
  },
];

const ConfigDialog: React.FC<ConfigDialogProps> = ({ isOpen, closeDialog }) => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <AppDialog open={isOpen} onClose={closeDialog} title="Config">
        <div>
          <div className="flex items-center gap-2">
            <span>Theme:</span>
            <Listbox value={theme} onChange={(value) => setTheme(value)}>
              <div className="relative z-20">
                <Listbox.Button className="relative flex items-center justify-between gap-1 rounded-md border bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
                  <span>{theme}</span>
                  <ChevronUpDownIcon className="h-3 w-3" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 overflow-auto rounded-md border bg-black p-1 px-2 py-1 text-sm text-white shadow-md dark:bg-white dark:text-black">
                  {themes.map((theme, index) => (
                    <Listbox.Option
                      key={index}
                      value={theme.value}
                      className={({ active }) => {
                        return `relative cursor-default select-none rounded-md p-1
                    ${active ? 'bg-white/25 dark:bg-black/5' : ''}
                    `;
                      }}
                    >
                      {theme.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
      </AppDialog>
    </>
  );
};

export default ConfigDialog;

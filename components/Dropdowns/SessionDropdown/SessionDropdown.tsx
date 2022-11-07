import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Session } from '../../../lib/db';

type SessionDropdownProps = {
  value: Session | null;
  onChange: (session: Session) => void;
  options?: Session[];
};

const SessionDropdown: React.FC<SessionDropdownProps> = ({ value, onChange, options }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative flex-grow">
        <Listbox.Button className="relative flex w-48 items-center justify-between gap-1 rounded-md border bg-black px-3 py-1 text-sm text-white dark:bg-white dark:text-black">
          <span>{value?.name ?? '-'}</span>
          <ChevronUpDownIcon className="h-3 w-3" />
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black p-1 text-sm text-white dark:bg-white dark:text-black">
          {(options ?? []).map((option, index) => {
            return (
              <Listbox.Option
                key={index}
                value={option}
                className={({ active }) => {
                  return `relative cursor-default select-none rounded-md p-2 text-left
                    ${active ? 'bg-white/25 dark:bg-black/5' : ''}
                    `;
                }}
              >
                {option.name}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default SessionDropdown;

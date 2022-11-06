import { Listbox } from '@headlessui/react';
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
        <Listbox.Button className="relative w-full rounded-md bg-black px-3 py-1 text-sm text-white dark:bg-white dark:text-black">
          {value?.name ?? '-'}
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black text-sm text-white dark:bg-white dark:text-black">
          {(options ?? []).map((option, index) => {
            return (
              <Listbox.Option
                key={index}
                value={option}
                className={({ active }) => {
                  return `relative cursor-default select-none py-1 px-2 text-left
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

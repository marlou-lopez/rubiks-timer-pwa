import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Puzzle, PUZZLES } from '../../../lib/db';

type PuzzleDropdownProps = {
  value: Puzzle;
  onChange: (puzzle: Puzzle) => void;
};
const PuzzleDropdown: React.FC<PuzzleDropdownProps> = ({ value, onChange }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative flex h-8 w-full items-center justify-between gap-1 rounded-md border bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
          <span>{value.name}</span>
          <ChevronUpDownIcon className="h-3 w-3" />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-black p-1 px-2 py-1 text-sm text-white shadow-md dark:bg-white dark:text-black">
          {PUZZLES.map((option, index) => {
            return (
              <Listbox.Option
                key={index}
                value={option}
                className={({ active }) => {
                  return `relative cursor-default select-none rounded-md p-1
                    ${active ? 'bg-white/25 dark:bg-black/5' : ''}
                    `;
                }}
              >
                {({ selected }) => (
                  <span className={`${selected ? 'font-bold' : ''}`}>{option.name}</span>
                )}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default PuzzleDropdown;

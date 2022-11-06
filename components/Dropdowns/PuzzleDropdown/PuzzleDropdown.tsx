import { Listbox } from '@headlessui/react';
import { Puzzle, PUZZLES } from '../../../lib/db';

type PuzzleDropdownProps = {
  value: Puzzle;
  onChange: (puzzle: Puzzle) => void;
};
const PuzzleDropdown: React.FC<PuzzleDropdownProps> = ({ value, onChange }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full rounded-md bg-black px-3 py-1 text-sm text-white dark:bg-white dark:text-black">
          {value.name}
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black text-sm text-white dark:bg-white dark:text-black">
          {PUZZLES.map((option, index) => {
            return (
              <Listbox.Option
                key={index}
                value={option}
                className={({ active }) => {
                  return `relative cursor-default select-none py-1
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

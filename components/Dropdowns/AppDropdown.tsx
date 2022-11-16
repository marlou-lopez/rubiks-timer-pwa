import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';

type AppDropdownProps<T> = {
  value?: T | null;
  options: readonly T[];
  onChange: (value: T) => void;
  label?: React.ReactNode;
  /**
   * This only applies to wrapper
   */
  className?: React.ComponentProps<'div'>['className'];
  displayFormatter: (value?: T | null) => React.ReactNode;
  adaptTheme?: boolean;
};

const AppDropdown = <T,>(props: AppDropdownProps<T>) => {
  const { onChange, adaptTheme = true, options, value, label, className, displayFormatter } = props;

  return (
    <Listbox value={value} onChange={onChange}>
      {label && <Listbox.Label>{label}</Listbox.Label>}
      <div className={`relative ${className ?? ''}`}>
        <Listbox.Button
          className={`flex w-full items-center justify-between gap-4 rounded-md border py-2 pr-2 pl-3 text-sm font-semibold
         ${adaptTheme ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black'}
        `}
        >
          <span className="truncate font-semibold">
            {displayFormatter && displayFormatter(value)}
          </span>
          <ChevronUpDownIcon className="h-3 w-3" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`absolute z-10  mt-1 w-full  overflow-auto rounded-md border py-1 text-sm shadow-md
         ${adaptTheme ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black'}
           `}
          >
            {options.map((option, index) => {
              return (
                <Listbox.Option
                  key={index}
                  value={option}
                  className={({ active }) => {
                    return `relative cursor-default select-none truncate py-1 px-3 text-left
                    ${
                      active ? `${adaptTheme ? 'bg-white/25 dark:bg-black/10' : 'bg-black/10'}` : ''
                    }
                    `;
                  }}
                >
                  {({ selected }) => (
                    <span className={`${selected ? 'font-semibold' : 'font-normal'}`}>
                      {displayFormatter && displayFormatter(option)}
                    </span>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default AppDropdown;

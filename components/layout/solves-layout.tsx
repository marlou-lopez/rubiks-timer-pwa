import React from 'react';
import { useSession } from '../../providers/SessionProvider';

const SolvesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedSession } = useSession();
  return (
    <>
      <header>
        <div className="flex items-center justify-between gap-2 px-6 pt-4 pb-2">
          <h1 className="text-3xl font-bold text-black dark:text-white">Solves</h1>
          <h3 className="rounded-full bg-gray-300 px-2 text-sm font-semibold text-gray-600 dark:bg-gray-500 dark:text-gray-200 md:text-base">
            {selectedSession?.name}
          </h3>
        </div>
      </header>
      {children}
    </>
  );
};

export default SolvesLayout;

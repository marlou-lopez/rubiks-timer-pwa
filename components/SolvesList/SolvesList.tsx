import { XMarkIcon } from '@heroicons/react/20/solid';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../lib/db';
import { formatTime } from '../Timer/timerUtils';
import SolveItem from './SolveItem';

const SolvesList = () => {
  const solves = useLiveQuery(() => db.solves.reverse().toArray());

  const handleDeleteAll = async () => {
    await db.solves.clear();
  };

  if (!solves) return null;

  const isSolvesEmpty = solves.length === 0;

  return (
    <>
      <header className="fixed top-0 w-full bg-white dark:bg-black z-10">
        <div className="px-6 py-4 flex items-center gap-2">
          <h1 className="font-bold text-3xl text-black dark:text-white">
            Solves
          </h1>
        </div>
        {!isSolvesEmpty && (
          <div className="py-2 px-6 w-full max-w-sm md:max-w-2xl mx-auto flex justify-end">
            <button
              type="button"
              onClick={handleDeleteAll}
              className="uppercase text-black dark:text-white font-semibold text-xs"
            >
              Delete All
            </button>
          </div>
        )}
      </header>
      <main className="px-6 py-2 mt-28 max-w-sm md:max-w-2xl w-full mx-auto flex flex-col">
        {!isSolvesEmpty ? (
          <ul className="flex flex-col gap-2">
            {solves.map((solve) => {
              return (
                <li key={solve.id}>
                  <SolveItem {...solve} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex justify-center h-full items-center flex-grow font-semibold text-gray-500">
            <h1>No recorded solves yet.</h1>
          </div>
        )}
      </main>
    </>
  );
};

export default SolvesList;

import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import SolveItem from './SolveItem';

const SolvesList = () => {
  const { data, refetch } = useQuery(['solves'], () => db.solves.reverse().toArray());

  const solves = data ?? [];
  const handleDeleteAll = async () => {
    await db.solves.clear();
    await refetch();
  };

  const isSolvesEmpty = solves.length === 0;

  return (
    <>
      <header className="fixed top-0 z-10 w-full bg-white dark:bg-black">
        <div className="flex items-center gap-2 px-6 py-4">
          <h1 className="text-3xl font-bold text-black dark:text-white">Solves</h1>
        </div>
        {!isSolvesEmpty && (
          <div className="mx-auto flex w-full max-w-sm justify-end py-2 px-6 md:max-w-2xl">
            <button
              type="button"
              onClick={handleDeleteAll}
              className="text-xs font-semibold uppercase text-black dark:text-white"
            >
              Delete All
            </button>
          </div>
        )}
      </header>
      <main className="mx-auto mt-28 flex w-full max-w-sm flex-col px-6 py-2 md:max-w-2xl">
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
          <div className="flex h-full flex-grow items-center justify-center font-semibold text-gray-500">
            <h1>No recorded solves yet.</h1>
          </div>
        )}
      </main>
    </>
  );
};

export default SolvesList;

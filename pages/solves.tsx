import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useLiveQuery } from 'dexie-react-hooks';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { formatTime } from '../components/Timer/timerUtils';
import { db } from '../lib/db';
const Solves = () => {
  const solves = useLiveQuery(() => db.solves.toArray());

  const handleDelete = async (id: number) => {
    await db.solves.where({ id }).delete();
  };

  const handleDeleteAll = async () => {
    await db.solves.clear();
  };

  if (!solves) return null;

  const isSolvesEmpty = solves.length === 0;

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* TODO: Make the header fixed. */}
      <header className="py-6 px-4 flex items-center gap-2">
        <Link href={'/'} className="flex items-center">
          <ArrowLeftIcon className="h-6 w-6 text-center" />
        </Link>
        <h1 className="font-bold text-3xl">Solves</h1>
      </header>
      <main className="px-4 py-2 flex-grow">
        {!isSolvesEmpty && (
          <div className="mb-2 py-1 flex justify-end">
            <button
              onClick={handleDeleteAll}
              className="uppercase text-gray-600 font-semibold text-xs"
            >
              Delete All
            </button>
          </div>
        )}
        {!isSolvesEmpty ? (
          <ul>
            {solves.map((solve) => {
              return (
                <li
                  key={solve.id}
                  className="border rounded-md p-3 flex flex-col gap-1 mb-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xl">
                      {formatTime(solve.time)}
                    </span>
                    <button onClick={() => handleDelete(solve.id!)}>
                      <XMarkIcon className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <span className="font-semibold text-xs text-gray-400">
                    {solve.scramble}
                  </span>
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
    </div>
  );
};

// IndexedDB is only available on the browser
// NextJS by default renders the page in a node process, whic IndexedDB is not available in by default
// (per my understainding)
export default dynamic(() => Promise.resolve(Solves), { ssr: false });

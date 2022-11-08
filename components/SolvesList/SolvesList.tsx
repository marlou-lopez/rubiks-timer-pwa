import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import { isBrowser } from 'react-device-detect';
import { useSession } from '../../providers/SessionProvider';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import ListPanel from './ListPanel';
import StatsPanel from './StatsPanel';

const SolvesList = () => {
  const { selectedSession } = useSession();
  const { data, refetch, isLoading } = useQuery(
    ['solves', selectedSession?.id],
    () =>
      db.solves
        .where({
          sessionId: selectedSession?.id,
        })
        .toArray(),
    {
      enabled: !!selectedSession,
      select: (data) => [...data].reverse(),
    },
  );
  const solves = data ?? [];
  const handleDeleteAll = async () => {
    await db.solves.clear();
    await refetch();
  };

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
      <main className="w-full">
        {!isBrowser ? (
          <section className="pb-20">
            <Tab.Group>
              <Tab.List className="flex">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`box-border flex w-full flex-col items-center gap-1 py-1 text-lg font-bold
                `}
                    >
                      List
                      {selected && <div className="w-1/2 rounded-full border-b-4 border-white" />}
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`box-border flex w-full flex-col items-center gap-1 py-1 text-lg font-bold
                `}
                    >
                      Stats
                      {selected && <div className="w-1/2 rounded-full border-b-4 border-white" />}
                    </button>
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <ListPanel
                    handleDeleteAll={handleDeleteAll}
                    solves={solves}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <StatsPanel solves={solves} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </section>
        ) : (
          <>
            <StatsPanel solves={solves} />
            <ListPanel handleDeleteAll={handleDeleteAll} solves={solves} isLoading={isLoading} />
          </>
        )}
      </main>
    </>
  );
};

export default SolvesList;

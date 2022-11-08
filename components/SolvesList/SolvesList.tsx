import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import { useSession } from '../../providers/SessionProvider';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import AppLoading from '../AppLoading';

const MainPanel = dynamic(() => import('./MainPanel'), { suspense: true });

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

      <Suspense fallback={<AppLoading />}>
        <MainPanel handleDeleteAll={handleDeleteAll} solves={solves} isLoading={isLoading} />
      </Suspense>
    </>
  );
};

export default SolvesList;

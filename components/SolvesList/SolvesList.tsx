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
    <Suspense fallback={<AppLoading />}>
      <MainPanel handleDeleteAll={handleDeleteAll} solves={solves} isLoading={isLoading} />
    </Suspense>
  );
};

export default SolvesList;

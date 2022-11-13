import dynamic from 'next/dynamic';
import React from 'react';
import { useQuery } from 'react-query';
import AppLoading from '../components/AppLoading';
import PrimaryLayout from '../components/layout/layout';
import SolvesLayout from '../components/layout/solves-layout';
import { db } from '../lib/db';
import { useSession } from '../providers/SessionProvider';
import { NextPageWithLayout } from './_app';

// We have different ui to render depending on the device, so we're going
// client-side render this component since device info is not available on the server.
const MainPanel = dynamic(() => import('../components/SolvesList/MainPanel'), {
  ssr: false,
  loading: AppLoading,
});

const Solves: NextPageWithLayout = () => {
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

  return <MainPanel handleDeleteAll={handleDeleteAll} solves={solves} isLoading={isLoading} />;
};

// Notes does not work when dynamically exporting the page
Solves.getLayout = function getLayout(page) {
  return (
    <PrimaryLayout>
      <SolvesLayout>{page}</SolvesLayout>
    </PrimaryLayout>
  );
};

export default Solves;

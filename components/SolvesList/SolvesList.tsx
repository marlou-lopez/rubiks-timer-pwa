import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import SolveItem from './SolveItem';
import { FixedSizeList } from 'react-window';
import SolvesListHeader from './SolvesListHeader';
import ListLoading from './ListLoading';
import { isBrowser } from 'react-device-detect';
import StatsGraph from '../Stats/StatsGraph';
import StatsOverview from '../Stats/StatsOverview';
import { useSession } from '../../providers/SessionProvider';

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

  const isSolvesEmpty = solves.length === 0;
  return (
    <>
      <header>
        <div className="flex items-center justify-between gap-2 px-6 py-4">
          <h1 className="text-3xl font-bold text-black dark:text-white">Solves</h1>
          <h3 className="rounded-full bg-gray-300 px-2 text-sm font-semibold text-gray-600 dark:bg-gray-500 dark:text-gray-200 md:text-base">
            {selectedSession?.name}
          </h3>
        </div>
      </header>
      <section className="mx-auto flex w-full max-w-sm flex-col gap-2 px-6 md:max-w-2xl">
        <StatsOverview solves={solves} />
        <StatsGraph solves={solves} />
      </section>
      <main className="mx-auto flex w-full max-w-sm flex-col px-6 py-2 md:max-w-2xl">
        <SolvesListHeader solveCount={solves.length} handleDeleteAll={handleDeleteAll} />
        {isLoading ? (
          <ListLoading />
        ) : !isSolvesEmpty ? (
          <FixedSizeList
            className="scrollbar-thin scrollbar-track-black/10 scrollbar-thumb-black scrollbar-track-rounded-md scrollbar-thumb-rounded-md dark:scrollbar-track-white/25 dark:scrollbar-thumb-white"
            height={isBrowser ? 196 : 140}
            width="100%"
            itemCount={solves.length}
            itemData={solves}
            itemSize={28}
            innerElementType="ul"
          >
            {({ data, index, style }) => (
              <li key={data[index].id} style={style}>
                <SolveItem {...data[index]} />
              </li>
            )}
          </FixedSizeList>
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

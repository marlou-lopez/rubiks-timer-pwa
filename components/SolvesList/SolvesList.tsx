import { useQuery } from 'react-query';
import { db } from '../../lib/db';
import SolveItem from './SolveItem';
import { FixedSizeList } from 'react-window';
import SolvesListHeader from './SolvesListHeader';
import ListLoading from './ListLoading';
import StatsOverview from '../Stats/StatsOverview/StatsOverview';
import StatsGraph from '../Stats/StatsGraph/StatsGraph';
import { isBrowser, isMobile } from 'react-device-detect';

const SolvesList = () => {
  const { data, refetch, isLoading } = useQuery(['solves'], () => db.solves.toArray(), {
    select: (data) => [...data].reverse(),
  });
  const solves = data ?? [];
  const handleDeleteAll = async () => {
    await db.solves.clear();
    await refetch();
  };

  const isSolvesEmpty = solves.length === 0;
  return (
    <>
      <header>
        <div className="flex items-center gap-2 px-6 py-4">
          <h1 className="text-3xl font-bold text-black dark:text-white">Solves</h1>
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
            height={isBrowser ? 224 : 140}
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

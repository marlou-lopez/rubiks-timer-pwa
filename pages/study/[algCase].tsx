import { limitShift } from '@floating-ui/react-dom';
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import AlgPlayer from '../../components/AlgPlayer';
import AppLoading from '../../components/AppLoading';
import { db } from '../../lib/db';

const AlgCase = () => {
  const router = useRouter();
  const algCase = router.query.algCase;

  const { data, isLoading } = useQuery(
    ['alg_case', algCase],
    () =>
      db.cases.get({
        slug: algCase,
      }),
    {
      enabled: !!algCase,
    },
  );

  if (!data && isLoading) return <AppLoading />;

  if (!data) return <p>Not found.</p>;

  return (
    <div>
      <header>
        <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <button title="back" onClick={() => router.back()}>
              <ChevronLeftIcon className="h-6 w-6 text-black dark:text-white" />
            </button>
            <h1 className="text-3xl font-bold text-black dark:text-white">{data.name}</h1>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-2 p-4">
        <section className="rounded-md ">
          <AlgPlayer algorithm={data.algorithms[0]} />
        </section>
        <section className="text-black dark:text-white">
          <h3 className="text-xl font-semibold">Algorithms</h3>
          <div>
            <div className="mb-1 flex justify-end">
              <button className="flex items-center gap-1">
                <PlusIcon className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
            <ul>
              {data.algorithms.map((alg) => (
                <li
                  key={alg}
                  className="flex items-center justify-between rounded-md bg-white p-2 text-black shadow-md"
                >
                  <span className="font-semibold">{alg}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AlgCase;

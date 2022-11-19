import { limitShift } from '@floating-ui/react-dom';
import { RadioGroup } from '@headlessui/react';
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import AlgPlayer from '../../components/AlgPlayer';
import AppLoading from '../../components/AppLoading';
import AddAlgorithmDialog from '../../components/Dialogs/AlgorithmDialog';
import { db } from '../../lib/db';

const AlgCase = () => {
  const router = useRouter();
  const algCase = router.query.algCase;
  const algSet = router.query.algSet || 'f2l';

  const [addAlgoDialogOpen, setAddAlgoDialogOpen] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState('');

  const { data, isLoading } = useQuery(
    ['alg_case', algCase],
    () =>
      db.cases.get({
        slug: algCase,
      }),
    {
      enabled: !!algCase,
      onSuccess: (data) => {
        setSelectedAlgo(data?.algorithms[0]);
      },
    },
  );

  if (!data) return <p>No</p>;
  if (isLoading)
    return (
      <div className="h-screen">
        <AppLoading />
      </div>
    );

  return (
    <div>
      <header>
        <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <Link href={`/study?algSet=${algSet}`}>
              <a>
                <ChevronLeftIcon className="h-6 w-6 text-black dark:text-white" />
              </a>
            </Link>
            <h1 className="text-3xl font-bold text-black dark:text-white">{data?.name ?? '-'}</h1>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-2 p-4">
        <section className="rounded-md ">
          {data && <AlgPlayer key={selectedAlgo} algorithm={selectedAlgo} />}
        </section>
        <section className="text-black dark:text-white">
          <h3 className="text-xl font-semibold">Algorithms</h3>
          {data ? (
            <div>
              <div className="mb-1 flex justify-end">
                <button
                  onClick={() => setAddAlgoDialogOpen(true)}
                  className="flex items-center gap-1"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
              <RadioGroup
                defaultValue={data.algorithms[0]}
                onChange={(value: string) => setSelectedAlgo(value)}
              >
                <div className="space-y-2">
                  {data.algorithms.map((alg) => (
                    <RadioGroup.Option
                      value={alg}
                      key={alg}
                      className="flex items-center justify-between rounded-md bg-white p-2 text-black shadow-md"
                    >
                      {({ checked }) => (
                        <>
                          <span className="font-semibold">{alg}</span>
                          {checked && <span>Currently Viewing</span>}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              {/* <ul>
                {data.algorithms.map((alg) => (
                  <li
                    key={alg}
                    className="flex items-center justify-between rounded-md bg-white p-2 text-black shadow-md"
                  >
                    <span className="font-semibold">{alg}</span>
                  </li>
                ))}
              </ul> */}
            </div>
          ) : (
            <p>Algorithm not existing.</p>
          )}
        </section>
      </main>
      <AddAlgorithmDialog
        algCase={data}
        isOpen={addAlgoDialogOpen}
        closeDialog={() => setAddAlgoDialogOpen(false)}
      />
    </div>
  );
};

export default AlgCase;

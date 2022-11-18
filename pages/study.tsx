import { StarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import AppLoading from '../components/AppLoading';
import AppDropdown from '../components/Dropdowns/AppDropdown';
import PrimaryLayout from '../components/layout/layout';
import StudyLayout from '../components/layout/study-layout';
import { db } from '../lib/db';
import { NextPageWithLayout } from './_app';

const ALGO_SET = [
  {
    label: 'First Two Layers (F2L)',
    value: 'f2l',
  },
  {
    label: 'Orient Last Layer (OLL)',
    value: 'oll',
  },
  {
    label: 'Permutate Last Layer (PLL)',
    value: 'pll',
  },
];

type ImageCardProps = {
  src: string;
  name: string;
};

const ImageCard: React.FC<ImageCardProps> = ({ src, name }) => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-white px-4 py-2 text-black shadow-lg">
      <div className="flex flex-grow items-center justify-center">
        <Image height={100} width={100} src={src} alt={name} />
      </div>
      <div className="mt-1 flex items-center justify-between">
        <p className="font-semibold">{name}</p>
        <button>
          <StarIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
const Study: NextPageWithLayout = () => {
  const [algoSet, setAlgoSet] = useState({
    label: 'First Two Layers (F2L)',
    value: 'f2l',
  });
  const { data: algCases, isLoading } = useQuery(
    ['algs_sets', algoSet],
    () =>
      db.cases
        .where({
          algSet: algoSet.value,
        })
        .toArray(),
    {
      enabled: !!algoSet,
    },
  );

  if (isLoading) return <AppLoading />;

  if (!algCases) return <p>Empty</p>;

  console.log(algCases);
  return (
    <div className="px-6">
      <AppDropdown
        onChange={setAlgoSet}
        value={algoSet}
        options={ALGO_SET}
        displayFormatter={(value) => value?.label}
        className="mb-4"
      />
      <div className="grid h-[700px] grid-cols-2 gap-2 overflow-auto pb-20 scrollbar-track-black/10 scrollbar-thumb-black scrollbar-track-rounded-md scrollbar-thumb-rounded-md dark:scrollbar-track-white/25 dark:scrollbar-thumb-white sm:grid-cols-3 md:grid-cols-5 md:pr-4 md:scrollbar-thin lg:grid-cols-6 xl:grid-cols-8">
        {algCases.map((alg_case) => (
          <ImageCard src={alg_case.imageSrc} name={alg_case.name} key={alg_case.id} />
        ))}
      </div>
    </div>
  );
};

Study.getLayout = function getLayout(page) {
  return (
    <PrimaryLayout>
      <StudyLayout>{page}</StudyLayout>
    </PrimaryLayout>
  );
};

export default Study;

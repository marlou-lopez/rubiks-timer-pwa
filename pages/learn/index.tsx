import Link from 'next/link';
import PrimaryLayout from '../../components/layout/layout';
import LearnTabLayout from '../../components/layout/learn-tab';
import { NextPageWithLayout } from '../_app';

type Puzzle = {
  name: string;
  defaultPath: string;
};

const puzzles: Puzzle[] = [
  {
    name: '2x2',
    defaultPath: '',
  },
];

const Card = ({ puzzle }: { puzzle: string }) => {
  return (
    <div className="border py-4 px-2 flex items-center justify-center">
      {puzzle}
    </div>
  );
};

const Learn: NextPageWithLayout = () => {
  return (
    <>
      <header className="p-4 w-full">
        <h1 className="font-bold text-3xl">Learn</h1>
      </header>
      <main className="p-4 flex-grow">
        <ul className="flex flex-col gap-2">
          {puzzles.map((puzzle) => {
            return (
              <li key={puzzle}>
                <Link href={`/learn/${puzzle}`}>
                  <a>
                    <Card puzzle={puzzle} />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

Learn.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Learn;

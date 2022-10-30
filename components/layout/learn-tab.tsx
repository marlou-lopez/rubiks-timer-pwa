import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const tabs = ['f2l', 'oll', 'pll'];
const LearnTabLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const currentPath = router.query.puzzle;
  console.log(currentPath);
  return (
    <>
      <header className="w-full px-4 py-6">
        <h1 className="text-3xl font-bold">{}</h1>
      </header>
      <nav className="flex w-full">
        {tabs.map((tab, index) => {
          return (
            <Link href={`/learn/${tab}`} key={index}>
              <a
                className={`flex-grow bg-gray-900 p-3 text-center font-semibold uppercase text-white
                  ${currentPath === tab ? 'border-b-4 border-b-gray-50' : ''}
                `}
              >
                {tab}
              </a>
            </Link>
          );
        })}
      </nav>
      <main>{children}</main>
    </>
  );
};

export default LearnTabLayout;

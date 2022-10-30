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
      <header className="px-4 py-6 w-full">
        <h1 className="font-bold text-3xl">{}</h1>
      </header>
      <nav className="w-full flex">
        {tabs.map((tab, index) => {
          return (
            <Link href={`/learn/${tab}`} key={index}>
              <a
                className={`bg-gray-900 text-white p-3 font-semibold text-center flex-grow uppercase
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

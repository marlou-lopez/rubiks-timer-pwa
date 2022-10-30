import { ClockIcon, AcademicCapIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const PrimaryLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-screen">
      {children}
      <div className="flex w-full justify-around items-center fixed bottom-4">
        <Link href={'/solves'}>
          <a className="text-white dark:text-black dark:bg-white bg-black font-semibold w-24 flex items-center justify-center rounded-full py-2">
            Solves
          </a>
        </Link>
        <Link href={'/'}>
          <a className="font-semibold flex items-center justify-center ">
            <ClockIcon className="text-black dark:text-white h-9 w-9" />
          </a>
        </Link>
        <Link href={'/algorithms'}>
          <a className="text-white dark:text-black dark:bg-white bg-black font-semibold w-24 flex items-center justify-center rounded-full py-2">
            Study
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PrimaryLayout;

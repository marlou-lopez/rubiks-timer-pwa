import {
  ClockIcon,
  AcademicCapIcon,
  ListBulletIcon,
  BookmarkIcon,
  BookOpenIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const PrimaryLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="flex flex-col h-screen w-full">
      {children}
      <div className="flex w-full justify-around items-center fixed bottom-4">
        <Link href={'/solves'}>
          <a
            title="Solves"
            className="relative text-white dark:text-black dark:bg-white bg-black font-semibold w-28 gap-2 flex items-center justify-center rounded-full py-2"
          >
            <ListBulletIcon className="black h-4 w-4" />
            <span>Solves</span>
            {currentPath === '/solves' && (
              <div className="absolute rounded-full bg-black dark:bg-white -top-2 w-1/2 h-1" />
            )}
          </a>
        </Link>
        <Link href={'/'}>
          <a
            title="Timer"
            className="relative font-semibold flex items-center justify-center"
          >
            <ClockIcon className="text-black dark:text-white h-9 w-9" />
            {currentPath === '/' && (
              <div className="absolute rounded-full bg-black dark:bg-white -top-2 w-1/2 h-1" />
            )}
          </a>
        </Link>
        <Link href={'/study'}>
          <a
            title="Study"
            className="relative text-white dark:text-black dark:bg-white bg-black font-semibold w-28 flex items-center justify-center gap-2 rounded-full py-2"
          >
            <BookOpenIcon className="text-white dark:text-black h-4 w-4" />
            <span>Study</span>
            {currentPath === '/study' && (
              <div className="absolute rounded-full bg-black dark:bg-white -top-2 w-1/2 h-1" />
            )}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PrimaryLayout;

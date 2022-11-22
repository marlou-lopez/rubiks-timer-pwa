import {
  ClockIcon,
  AcademicCapIcon,
  ListBulletIcon,
  BookmarkIcon,
  BookOpenIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';

const PrimaryLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="flex h-screen w-full flex-col">
      {children}
      <div className="fixed bottom-0 flex w-full items-center justify-around py-4">
        <Link href={'/solves'}>
          <a
            title="Solves"
            className="relative flex w-28 items-center justify-center gap-2 rounded-full bg-black py-2 font-semibold text-white dark:bg-white dark:text-black"
          >
            <ListBulletIcon className="black h-4 w-4" />
            <span>Solves</span>
            {currentPath === '/solves' && (
              <div className="absolute -top-2 h-1 w-1/2 rounded-full bg-black dark:bg-white" />
            )}
          </a>
        </Link>
        <Link href={'/'}>
          <a title="Timer" className="relative flex w-28 items-center justify-center font-semibold">
            <ClockIcon className="h-9 w-9 rounded-full border-transparent bg-white text-black dark:bg-black dark:text-white" />
            {currentPath === '/' && (
              <div className="absolute -top-2 h-1 w-1/4 rounded-full bg-black dark:bg-white" />
            )}
          </a>
        </Link>
        <Link href={'/study'}>
          <a
            title="Study"
            className="relative flex w-28 items-center justify-center gap-2 rounded-full bg-black py-2 font-semibold text-white dark:bg-white dark:text-black"
          >
            <BookOpenIcon className="h-4 w-4 text-white dark:text-black" />
            <span>Study</span>
            {currentPath === '/study' && (
              <div className="absolute -top-2 h-1 w-1/2 rounded-full bg-black dark:bg-white" />
            )}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PrimaryLayout;

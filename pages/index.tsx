import { AcademicCapIcon, ClockIcon } from '@heroicons/react/20/solid';
import type { NextPage } from 'next';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React from 'react';
import PrimaryLayout from '../components/layout/layout';
import Timer from '../components/Timer';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <>
      <Timer />
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;

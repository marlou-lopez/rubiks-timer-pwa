import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import AppLoading from '../components/AppLoading';
import PrimaryLayout from '../components/layout/layout';
import { NextPageWithLayout } from './_app';

const Timer = dynamic(() => import('../components/Timer'), { ssr: false, suspense: true });

const Home: NextPageWithLayout = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <Timer />
    </Suspense>
  );
};

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;

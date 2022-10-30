import dynamic from 'next/dynamic';
import React from 'react';
import PrimaryLayout from '../components/layout/layout';
import { NextPageWithLayout } from './_app';

const Timer = dynamic(() => import('../components/Timer'), { ssr: false });

const Home: NextPageWithLayout = () => {
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

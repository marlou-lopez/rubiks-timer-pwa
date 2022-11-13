import React from 'react';
import PrimaryLayout from '../components/layout/layout';
import Timer from '../components/Timer';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return <Timer />;
};

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;

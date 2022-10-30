import dynamic from 'next/dynamic';
import React from 'react';
import PrimaryLayout from '../components/layout/layout';
import { NextPageWithLayout } from './_app';

// IndexedDB is only available on the browser
// NextJS by default renders the page in a node process, which IndexedDB is not available in by default
// (per my understanding)
const SolvesList = dynamic(() => import('../components/SolvesList'), {
  ssr: false,
});

const Solves: NextPageWithLayout = () => {
  return (
    <>
      <SolvesList />
    </>
  );
};

// Notes does not work when dynamically exporting the page
Solves.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Solves;

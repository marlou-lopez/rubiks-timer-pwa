import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import AppLoading from '../components/AppLoading';
import PrimaryLayout from '../components/layout/layout';
import { NextPageWithLayout } from './_app';

// IndexedDB is only available on the browser
// NextJS by default renders the page in a node process, which IndexedDB is not available in by default
// (per my understanding)
const SolvesList = dynamic(() => import('../components/SolvesList'), {
  ssr: false,
  // suspense: true,
});

const Solves: NextPageWithLayout = () => {
  return (
    <SolvesList />
    // Suspense causes hydration mismatch error when I added a functionality
    // where we render different ui depending on device using isBrowser
    // <Suspense fallback={<AppLoading />}>
    //   <SolvesList />
    // </Suspense>
  );
};

// Notes does not work when dynamically exporting the page
Solves.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Solves;

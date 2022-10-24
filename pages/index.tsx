import type { NextPage } from 'next';
import { randomScrambleForEvent } from 'cubing/scramble';
import React from 'react';
import { useQuery } from 'react-query';
import Timer from '../components/Timer';

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 flex flex-col h-screen w-screen">
      <Timer />
    </div>
  );
};

export default Home;

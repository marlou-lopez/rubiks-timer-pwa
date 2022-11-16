import React from 'react';
import toast from 'react-hot-toast';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import PrimaryLayout from '../components/layout/layout';
import Timer from '../components/Timer';
import TimerHeader from '../components/Timer/TimerHeader';
import TimerPenalty from '../components/Timer/TimerPenalty';
import TimerStatPreview from '../components/Timer/TimerStatPreview';
import { db, Solve } from '../lib/db';
import { useConfig } from '../providers/ConfigProvider';
import { useSession } from '../providers/SessionProvider';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const { selectedPuzzle, selectedSession } = useSession();
  const { showTimerConfigPreview, enableInspection, holdDuration, multiPhase } = useConfig();
  const { data: solves } = useQuery(
    ['solves', selectedSession?.id],
    () =>
      db.solves
        .where({
          sessionId: selectedSession?.id,
        })
        .toArray(),
    {
      enabled: !!selectedSession,
      select: (data) => [...data].reverse(),
    },
  );

  const { mutate: addSolve } = useMutation({
    mutationFn: (solve: Solve) => {
      return db.solves.add(solve);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scramble', selectedSession?.puzzleType] });
      queryClient.invalidateQueries({ queryKey: ['solves', selectedSession?.id] });
    },
  });

  return (
    <Timer
      options={{
        enableInspection,
        multiPhase,
        holdDuration,
        showTimerConfigPreview,
      }}
      onStop={function handleOnStop({ currentTime }) {
        if (solves) {
          const mappedSolves = solves.map((solve) => solve.time);
          const bestTime = Math.min(...mappedSolves);
          if (currentTime < bestTime) {
            toast('New record single!', {
              icon: '🎉',
            });
          }
        }

        const currentScramble = queryClient.getQueryData<string>([
          'scramble',
          selectedPuzzle.value,
        ]);

        addSolve({
          time: currentTime,
          scramble: currentScramble!,
          date: Date.now(),
          puzzleType: selectedPuzzle.value,
          sessionId: selectedSession?.id,
          penalty: null,
        });
      }}
      // header={<TimerHeader />}
      actions={<TimerPenalty solve={(solves ?? [])[0]} />}
      statPreview={<TimerStatPreview />}
    />
  );
};

Home.getLayout = function getLayout(page) {
  return (
    <PrimaryLayout>
      <TimerHeader />
      {page}
    </PrimaryLayout>
  );
};

export default Home;

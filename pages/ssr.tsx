import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Timer from '../components/GenericTimer';
import TimerHeader from '../components/Timer/TimerHeader';
import TimerPenalty from '../components/Timer/TimerPenalty';
import TimerStatPreview from '../components/Timer/TimerStatPreview';
import { db, Solve } from '../lib/db';
import { useSession } from '../providers/SessionProvider';

const TestSSR = () => {
  const queryClient = useQueryClient();
  const { selectedPuzzle, selectedSession } = useSession();
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
    <div className="h-screen">
      <Timer
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
        header={<TimerHeader />}
        actions={<TimerPenalty solve={(solves ?? [])[0]} />}
        statPreview={<TimerStatPreview />}
      />
    </div>
  );
};

export default TestSSR;

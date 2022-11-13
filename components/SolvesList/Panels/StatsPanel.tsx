import { Solve } from '../../../lib/db';
import StatsGraph from '../../Stats/StatsGraph';
import StatsOverview from '../../Stats/StatsOverview';

type StatsPanelProps = {
  solves: Solve[];
};

const StatsPanel: React.FC<StatsPanelProps> = ({ solves }) => {
  return (
    <section className="mx-auto flex w-full max-w-sm flex-col gap-2 px-6 md:max-w-2xl">
      <StatsOverview solves={solves} />
      <StatsGraph solves={solves} />
    </section>
  );
};

export default StatsPanel;

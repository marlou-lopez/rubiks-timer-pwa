import Timer from '../components/GenericTimer';
import TimerHeader from '../components/Timer/TimerHeader';
import TimerPenalty from '../components/Timer/TimerPenalty';
import TimerStatPreview from '../components/Timer/TimerStatPreview';

const TestSSR = () => {
  return (
    <div className="h-screen">
      <Timer
        header={<TimerHeader />}
        actions={<TimerPenalty />}
        statPreview={<TimerStatPreview />}
      />
    </div>
  );
};

export default TestSSR;

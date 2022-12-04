import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { useConfig } from '../../../../providers/ConfigProvider';
import AppSwitch from '../../../AppSwitch';
import AppTooltip from '../../../AppTooltip';

const ShowHands = () => {
  const { showHands, setShowHands } = useConfig();
  return (
    <div className="flex items-center justify-between">
      <AppSwitch
        label={
          <>
            <div className="flex items-center gap-2">
              <span>Show hands</span>
              <AppTooltip placement="bottom" content="Additional UI to imitate a stackmat timer.">
                <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
              </AppTooltip>
            </div>
          </>
        }
        checked={showHands}
        onChange={setShowHands}
      />
    </div>
  );
};

export default ShowHands;

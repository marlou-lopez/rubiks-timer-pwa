import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { useConfig } from '../../../../providers/ConfigProvider';
import AppSwitch from '../../../AppSwitch';
import AppTooltip from '../../../AppTooltip';
import Tooltip from '../../../AppTooltip';

const InspectionConfig = () => {
  const { enableInspection = false, setEnableInspection } = useConfig();
  return (
    <div className="flex items-center justify-between ">
      <AppSwitch
        label={
          <div className="flex items-center gap-2">
            <span>WCA Inspection</span>
            <AppTooltip
              content="Include 15 seconds inspection time before starting the timer."
              placement="bottom"
            >
              <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
            </AppTooltip>
          </div>
        }
        checked={enableInspection}
        onChange={setEnableInspection}
      />
    </div>
  );
};

export default InspectionConfig;

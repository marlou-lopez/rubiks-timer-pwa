import {
  offset,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useConfig } from '../../../../providers/ConfigProvider';
import AppTooltip from '../../../AppTooltip';
import AppDropdown from '../../../Dropdowns/AppDropdown';
import { HOLD_DURATION } from '../../../Timer/Timer';
import { formatTime } from '../../../Timer/timerUtils';

const HoldDurationConfig = () => {
  const { holdDuration, setHoldDuration } = useConfig();
  return (
    <div className="flex items-center justify-between">
      <AppDropdown
        className="w-24"
        adaptTheme={false}
        label={
          <>
            <div className="flex items-center gap-2">
              <span>Hold Duration</span>
              <AppTooltip
                placement="bottom"
                content="How long you need to keep the space/screen down."
              >
                <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
              </AppTooltip>
            </div>
          </>
        }
        value={holdDuration}
        onChange={setHoldDuration}
        options={HOLD_DURATION}
        displayFormatter={(value) => `${formatTime(value as number)}s`}
      />
    </div>
  );
};

export default HoldDurationConfig;

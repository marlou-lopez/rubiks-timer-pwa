import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { useConfig } from '../../../../providers/ConfigProvider';
import AppTooltip from '../../../AppTooltip';

const MAX_PHASE = 10;

const MultiPhaseConfig = () => {
  const { multiPhase, setMultiPhase } = useConfig();

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);

    if (value > MAX_PHASE) {
      setMultiPhase(MAX_PHASE);
    } else {
      setMultiPhase(value);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <label htmlFor="multi-phase" className="flex items-center gap-2">
        <span>Multi-phase (0 - 10)</span>
        <AppTooltip content="Number of splits before stopping the timer." placement="bottom">
          <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
        </AppTooltip>
      </label>
      <input
        type={'number'}
        id="multi-phase"
        min={0}
        max={10}
        step={1}
        className=" rounded-md border bg-white px-3 py-1 font-semibold"
        value={multiPhase}
        onChange={handleNumberChange}
      />
    </div>
  );
};

export default MultiPhaseConfig;

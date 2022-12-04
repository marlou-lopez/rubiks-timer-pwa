import {
  CursorArrowRippleIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
} from '@heroicons/react/20/solid';
import React, { ReactSVG } from 'react';
import AppTooltip from '../AppTooltip';
import { TimerOptions } from './Timer';
import { formatTime } from './timerUtils';

const TIMER_PILL_ICONS: Partial<Record<keyof TimerOptions, JSX.Element>> = {
  enableInspection: <MagnifyingGlassIcon className="h-3 w-3" />,
  holdDuration: <CursorArrowRippleIcon className="h-3 w-3" />,
  multiPhase: <QueueListIcon className="h-3 w-3" />,
};

const OPTION_PILL: Partial<
  Record<
    keyof TimerOptions,
    {
      icon: JSX.Element;
      label: string;
      value: (v: number | boolean | string) => string;
    }
  >
> = {
  enableInspection: {
    icon: <MagnifyingGlassIcon className="h-3 w-3" />,
    label: 'WCA Inspection',
    value: (v) => '15s',
  },
  holdDuration: {
    icon: <CursorArrowRippleIcon className="h-3 w-3" />,
    label: 'Hold Duration',
    value: (v) => formatTime(v as number) + 's',
  },
  multiPhase: {
    icon: <QueueListIcon className="h-3 w-3" />,
    label: 'Multi-phase',
    value: (v) => `${v}`,
  },
};

type TimerConfigPreviewPillProps = {
  option: keyof TimerOptions;
  value: number | boolean | string;
};

const TimerConfigPreviewPill = ({ option, value }: TimerConfigPreviewPillProps) => {
  return (
    <AppTooltip content={OPTION_PILL[option]?.label}>
      <div className="flex items-center gap-1 rounded-full border py-1 px-2 shadow">
        {OPTION_PILL[option]?.icon}
        <span className="font-mono text-sm">{OPTION_PILL[option]?.value(value)}</span>
      </div>
    </AppTooltip>
  );
};

const TimerConfigPreview: React.FC<TimerOptions> = (options) => {
  return (
    <div className="mb-2 flex gap-4">
      {Object.entries(options).map(([key, value]) => {
        return (
          OPTION_PILL[key as keyof TimerOptions] &&
          !!value && (
            <TimerConfigPreviewPill key={key} option={key as keyof TimerOptions} value={value} />
          )
        );
      })}
    </div>
  );
};

export default TimerConfigPreview;

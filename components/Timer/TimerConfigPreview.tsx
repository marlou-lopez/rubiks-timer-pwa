import {
  CursorArrowRippleIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
} from '@heroicons/react/20/solid';
import AppTooltip from '../AppTooltip';
import { TimerOptions } from './Timer';
import { formatTime } from './timerUtils';

const TimerConfigPreview: React.FC<TimerOptions> = (options) => {
  const renderPill = (option: keyof TimerOptions, value: number | boolean) => {
    if (option === 'enableInspection' && value) {
      return (
        <AppTooltip content="WCA Inspection">
          <div className="flex items-center gap-1 rounded-full border py-1 px-2 shadow">
            <MagnifyingGlassIcon className="h-3 w-3" />
            <span className="font-mono text-sm">15s</span>
          </div>
        </AppTooltip>
      );
    }
    if (option === 'holdDuration') {
      return (
        <AppTooltip content="Hold Duration">
          <div className="flex items-center gap-1 rounded-full border py-1 px-2 shadow">
            <CursorArrowRippleIcon className="h-3 w-3" />
            <span className="font-mono text-sm">{formatTime(value as number)}s</span>
          </div>
        </AppTooltip>
      );
    }
    if (option === 'multiPhase') {
      return (
        <AppTooltip content="Multi-phase">
          <div className="flex items-center gap-1 rounded-full border py-1 px-2 shadow">
            <QueueListIcon className="h-3 w-3" />
            <span className="font-mono text-sm">{value}</span>
          </div>
        </AppTooltip>
      );
    }
    return null;
  };
  return (
    <div className="mb-2 flex gap-4">
      {Object.entries(options).map(([key, value]) => {
        return <span key={key}>{renderPill(key as keyof TimerOptions, value)}</span>;
      })}
    </div>
  );
};

export default TimerConfigPreview;

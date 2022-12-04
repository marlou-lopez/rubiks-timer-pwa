import { useConfig } from '../../../providers/ConfigProvider';
import AppSwitch from '../../AppSwitch';
import AppDialog from '../AppDialog';
import HoldDurationConfig from './Configs/HoldDurationConfig';
import InspectionConfig from './Configs/InspectionConfig';
import MultiPhaseConfig from './Configs/MultiPhaseConfig';
import ThemeConfig from './Configs/ThemeConfig';

type ConfigDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
};

const ConfigDialog: React.FC<ConfigDialogProps> = ({ isOpen, closeDialog }) => {
  const { showTimerConfigPreview, setShowTimerConfigPreview } = useConfig();
  return (
    <>
      <AppDialog open={isOpen} onClose={closeDialog} title="Config">
        <div className="flex flex-col gap-3">
          <section>
            <h2 className="font-semibold">UI</h2>
            <ThemeConfig />
          </section>
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Timer</h2>
              <div className="flex items-center gap-2">
                <AppSwitch
                  size="small"
                  label={<span className="text-xs text-gray-500">Show configs in preview?</span>}
                  checked={showTimerConfigPreview}
                  onChange={setShowTimerConfigPreview}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <HoldDurationConfig />
              <InspectionConfig />
              <MultiPhaseConfig />
            </div>
          </section>
        </div>
      </AppDialog>
    </>
  );
};

export default ConfigDialog;

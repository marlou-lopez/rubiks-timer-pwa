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
  return (
    <>
      <AppDialog open={isOpen} onClose={closeDialog} title="Config">
        <div className="flex flex-col gap-3">
          <section>
            <h2 className="font-semibold">UI</h2>
            <ThemeConfig />
          </section>
          <section>
            <h2 className="font-semibold">Timer</h2>
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

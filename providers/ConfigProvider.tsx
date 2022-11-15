import { createContext, useCallback, useContext, useState } from 'react';
import { HOLD_DURATION_TYPE } from '../components/Timer/Timer';

type ConfigContextProps = {
  enableInspection?: boolean;
  holdDuration?: HOLD_DURATION_TYPE;
  multiPhase?: number;
  setEnableInspection: (flag: boolean) => void;
  setHoldDuration: (duration: HOLD_DURATION_TYPE) => void;
  setMultiPhase: (phase: number) => void;
};
const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [enableInspection, setEnableInspectionState] = useState(false);
  const [holdDuration, setHoldDurationState] = useState<HOLD_DURATION_TYPE>(300);
  const [multiPhase, setMultiPhaseState] = useState(0);

  const setEnableInspection = useCallback((flag: boolean) => {
    setEnableInspectionState(flag);
  }, []);

  const setHoldDuration = useCallback((duration: HOLD_DURATION_TYPE) => {
    setHoldDurationState(duration);
  }, []);

  const setMultiPhase = useCallback((phase: number) => {
    setMultiPhaseState(phase);
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        enableInspection,
        multiPhase,
        holdDuration,
        setEnableInspection,
        setHoldDuration,
        setMultiPhase,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  return context;
};

export { ConfigProvider, useConfig };

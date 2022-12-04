import { createContext, useCallback, useContext, useState } from 'react';
import useLocalStorage from 'use-local-storage-state';
import { HOLD_DURATION_TYPE } from '../components/Timer/Timer';

type ConfigContextProps = {
  enableInspection: boolean;
  holdDuration: HOLD_DURATION_TYPE;
  multiPhase: number;
  showTimerConfigPreview: boolean;
  showHands: boolean;
  setEnableInspection: (flag: boolean) => void;
  setHoldDuration: (duration: HOLD_DURATION_TYPE) => void;
  setMultiPhase: (phase: number) => void;
  setShowTimerConfigPreview: (flag: boolean) => void;
  setShowHands: (flag: boolean) => void;
};
const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [enableInspection, setEnableInspectionState] = useLocalStorage('enableInspection', {
    defaultValue: false,
  });
  const [holdDuration, setHoldDurationState] = useLocalStorage<HOLD_DURATION_TYPE>('holdDuration', {
    defaultValue: 300,
  });
  const [multiPhase, setMultiPhaseState] = useLocalStorage('multiPhase', {
    defaultValue: 0,
  });
  const [showTimerConfigPreview, setShowTimerConfigPreviewState] = useLocalStorage(
    'showTimerConfigPreview',
    {
      defaultValue: false,
    },
  );
  const [showHands, setShowHandsState] = useLocalStorage('showHands', {
    defaultValue: false,
  });

  const setEnableInspection = useCallback(
    (flag: boolean) => {
      setEnableInspectionState(flag);
    },
    [setEnableInspectionState],
  );

  const setHoldDuration = useCallback(
    (duration: HOLD_DURATION_TYPE) => {
      setHoldDurationState(duration);
    },
    [setHoldDurationState],
  );

  const setMultiPhase = useCallback(
    (phase: number) => {
      setMultiPhaseState(phase);
    },
    [setMultiPhaseState],
  );

  const setShowTimerConfigPreview = useCallback(
    (flag: boolean) => {
      setShowTimerConfigPreviewState(flag);
    },
    [setShowTimerConfigPreviewState],
  );

  const setShowHands = useCallback(
    (flag: boolean) => {
      setShowHandsState(flag);
    },
    [setShowHandsState],
  );

  return (
    <ConfigContext.Provider
      value={{
        enableInspection,
        multiPhase,
        holdDuration,
        showTimerConfigPreview,
        showHands,
        setEnableInspection,
        setHoldDuration,
        setMultiPhase,
        setShowTimerConfigPreview,
        setShowHands,
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

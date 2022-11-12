import { createContext, useContext } from 'react';

type ConfigContextProps = {
  testProps?: string;
};
const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigContext.Provider
      value={{
        testProps: '',
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

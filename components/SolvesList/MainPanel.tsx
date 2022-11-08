import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { isBrowser } from 'react-device-detect';
import ListPanel from './ListPanel';
import StatsPanel from './StatsPanel';

const MainPanel: React.FC<any> = ({ handleDeleteAll, solves, isLoading }) => {
  console.log('Isasdsad: ', isBrowser);
  return (
    <main className="w-full">
      {!isBrowser ? (
        <section className="pb-20">
          <Tab.Group>
            <Tab.List className="flex">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`box-border flex w-full flex-col items-center gap-1 py-1 text-lg font-bold
                `}
                  >
                    List
                    {selected && <div className="w-1/2 rounded-full border-b-4 border-white" />}
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`box-border flex w-full flex-col items-center gap-1 py-1 text-lg font-bold
                `}
                  >
                    Stats
                    {selected && <div className="w-1/2 rounded-full border-b-4 border-white" />}
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <ListPanel
                  handleDeleteAll={handleDeleteAll}
                  solves={solves}
                  isLoading={isLoading}
                />
              </Tab.Panel>
              <Tab.Panel>
                <StatsPanel solves={solves} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </section>
      ) : (
        <>
          <StatsPanel solves={solves} />
          <ListPanel handleDeleteAll={handleDeleteAll} solves={solves} isLoading={isLoading} />
        </>
      )}
    </main>
  );
};

export default MainPanel;

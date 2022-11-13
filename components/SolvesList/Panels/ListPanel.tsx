import { isBrowser, isTablet } from 'react-device-detect';
import { FixedSizeList } from 'react-window';
import { Solve } from '../../../lib/db';
import ListLoading from '../ListLoading';
import SolveItem from '../SolveItem';
import ListHeader from '../ListHeader';

type ListPanelProps = {
  solves: Solve[];
  isLoading: boolean;
  handleDeleteAll: () => Promise<void>;
};

const ListPanel: React.FC<ListPanelProps> = ({ solves, isLoading, handleDeleteAll }) => {
  let height = 600;
  if (isBrowser) {
    height = 210;
  } else if (isTablet) {
    height = 980;
  }

  return (
    <section className="mx-auto flex w-full max-w-sm flex-col px-6 py-2 md:max-w-2xl">
      <ListHeader solveCount={solves.length} handleDeleteAll={handleDeleteAll} />
      {isLoading ? (
        <ListLoading />
      ) : solves.length !== 0 ? (
        <div className="flex flex-grow">
          <FixedSizeList
            className="scrollbar-thin scrollbar-track-black/10 scrollbar-thumb-black scrollbar-track-rounded-md scrollbar-thumb-rounded-md dark:scrollbar-track-white/25 dark:scrollbar-thumb-white"
            height={height}
            width="100%"
            itemCount={solves.length}
            itemData={solves}
            itemSize={30}
            innerElementType="ul"
          >
            {({ data, index, style }) => (
              <li key={data[index].id} style={style}>
                <SolveItem {...data[index]} />
              </li>
            )}
          </FixedSizeList>
        </div>
      ) : (
        <div className="flex h-full flex-grow items-center justify-center font-semibold text-gray-500">
          <h1>No recorded solves yet.</h1>
        </div>
      )}
    </section>
  );
};

export default ListPanel;

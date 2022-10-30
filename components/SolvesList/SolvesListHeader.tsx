type SolvesListHeaderProps = {
  handleDeleteAll: () => Promise<void>;
  solveCount: number;
};

const SolvesListHeader: React.FC<SolvesListHeaderProps> = ({ solveCount, handleDeleteAll }) => {
  return (
    <header className="fixed top-0 z-10 w-full bg-white dark:bg-black">
      <div className="flex items-center gap-2 px-6 py-4">
        <h1 className="text-3xl font-bold text-black dark:text-white">Solves</h1>
      </div>
      <div className="mx-auto flex w-full max-w-sm items-center justify-between py-2 px-6 md:max-w-2xl">
        <h2 className="font-semibold">#: {solveCount}</h2>
        {solveCount > 0 && (
          <button
            type="button"
            onClick={handleDeleteAll}
            className="text-xs font-semibold uppercase text-black dark:text-white"
          >
            Delete All
          </button>
        )}
      </div>
    </header>
  );
};

export default SolvesListHeader;

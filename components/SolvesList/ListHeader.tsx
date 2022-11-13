type ListHeaderProps = {
  handleDeleteAll: () => Promise<void>;
  solveCount: number;
};

const ListHeader: React.FC<ListHeaderProps> = ({ solveCount, handleDeleteAll }) => {
  return (
    <section className="w-full bg-white dark:bg-black">
      <div className="mx-auto flex w-full max-w-sm items-center justify-between py-2 md:max-w-2xl">
        <h2 className="font-semibold">Count: {solveCount}</h2>
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
    </section>
  );
};

export default ListHeader;

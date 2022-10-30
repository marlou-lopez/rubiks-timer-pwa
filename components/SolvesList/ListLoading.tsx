const ListLoading = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="h-6 w-full animate-bounce bg-black dark:bg-white" />
      <h1 className="font-semibold ">Getting data...</h1>
    </div>
  );
};

export default ListLoading;

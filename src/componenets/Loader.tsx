export const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <div
        className={`
           h-10 w-10
           inline-block animate-spin rounded-full border-[3px] border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      ></div>
      <p className="text-lg text-blue-500 mt-3 tracking-wide">Loading...</p>
    </div>
  );
};

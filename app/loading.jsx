function Loading() {
  return (
    <>
      <div className="absolute h-24 w-24 mx-auto mb-4 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="absolute inset-5 border-5 border-zinc-800 rounded-full"></div>
        <div className="absolute inset-5 border-5 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </>
  );
}

export default Loading;

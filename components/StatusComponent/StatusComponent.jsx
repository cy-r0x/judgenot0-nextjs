function StatusComponent({ status }) {
  const colorState =
    status === "Finished"
      ? "bg-red-500"
      : status === "To be held"
        ? "bg-blue-500"
        : "bg-green-500";
  return (
    <>
      <div className={colorState + " relative py-2 px-3 rounded min-w-28 text-center"}>
        {status === "Running" && (
          <>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 animate-ping rounded-full bg-blue-500"></div>
          </>
        )}
        {status}
      </div>
    </>
  );
}

export default StatusComponent;

function Bar({ title, center = false }) {
  return (
    <div
      className={`px-5 py-3 bg-zinc-800 border-b-orange-500 border-b-4 ${
        center ? "text-center" : ""
      }`}
    >
      <p className="text-lg">{title}</p>
    </div>
  );
}

export default Bar;

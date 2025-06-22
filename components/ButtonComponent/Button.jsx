function Button({ name, icon, onClick, disabled, type }) {
  return (
    <button
      className="px-4 py-2 rounded-sm active:scale-95 cursor-pointer font-semibold bg-orange-500 hover:bg-orange-600 transition-all"
      onClick={onClick}
      disabled={disabled}
      type={type || "button"}
    >
      <div className="flex gap-2 items-center">
        {icon ?? ""}
        <p>{name}</p>
      </div>
    </button>
  );
}

export default Button;

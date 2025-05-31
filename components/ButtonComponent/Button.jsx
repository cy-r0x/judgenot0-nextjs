function Button({ name, onClick }) {
  return (
    <button 
      className="px-4 py-2 rounded-sm active:scale-95 cursor-pointer font-semibold bg-orange-500 hover:bg-orange-600 transition-all"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;

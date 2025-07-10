function Button({ name, icon, onClick, disabled, bgColor, hoverColor }) {
  const buttonClasses = `px-4 py-2 rounded-sm active:scale-95 cursor-pointer font-semibold 
    ${bgColor || "bg-orange-500"} 
    transition-all ${
      hoverColor ? `hover:${hoverColor}` : "hover:bg-orange-600"
    }`;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      <div className="flex gap-2 items-center">
        {icon ?? ""}
        <p>{name}</p>
      </div>
    </button>
  );
}

export default Button;

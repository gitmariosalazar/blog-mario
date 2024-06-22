export function Button({
  label,
  disabled,
  outline,
  small,
  custom,
  Icon,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-md bg-slate-600 font-bold
    hover:opacity-80 hover:text-green-600
    transition
    w-full
    border-slate-300
    flex
    items-center
    justify-center
    gap-2
    ${outline ? "bg-black" : "bg-slate-500"}
    ${outline ? "text-slate-500" : "text-white"}
    ${small ? "text-sm font-light" : "text-white"}
    ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
    ${custom ? custom : ""}
    `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
}

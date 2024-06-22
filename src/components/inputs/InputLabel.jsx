// InputLabel.jsx

import React from "react";

const InputLabel = ({
  id,
  label,
  type = "text",
  disabled = false,
  required = false,
  register,
  errors,
  Icon,
  placeholder,
  onChange,
  onIconClick, // Función para manejar el clic en el icono
  showPassword, // Estado de visibilidad de la contraseña
  ...rest
}) => {
  return (
    <div className="w-full relative p-1">
      <input
        autoComplete="on"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        onChange={onChange}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        className={`peer w-full p-2 pt-4 outline-none bg-while font-light border-2 rounded-md transition disabled:opacity-70 bg-slate-900 disabled: cursor-not-allowed ${
          errors[id] ? "border-rose-400" : "border-slate-300"
        } ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}`}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text duration-150 transform -translate-y-3 top-3 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 p-1 ${
          errors[id] ? "text-rose-500" : "text-slate-400"
        }`}
      >
        {label}
      </label>

      {Icon && (
        <div
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 ${
            type === "password" ? "hover:text-indigo-700 cursor-pointer" : ""
          }`}
          onClick={onIconClick} // Llama a la función para manejar el clic en el icono
        >
          {<Icon size={25} />}
        </div>
      )}
    </div>
  );
};

export default InputLabel;

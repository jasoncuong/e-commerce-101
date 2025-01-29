const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="relative w-full">
      {value.trim() !== "" && (
        <label
          htmlFor={nameKey}
          className="animate-slide-top-sm absolute left-[12px] top-0 block bg-white px-1 text-[10px]"
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}

      <input
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        type={type ? type : "text"}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        className="my-2 w-full rounded-sm border px-4 py-2 outline-none placeholder:text-sm placeholder:italic"
      />
    </div>
  );
};

export default InputField;

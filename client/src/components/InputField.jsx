const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="relative mb-2 flex w-full flex-col">
      {value.trim() !== "" && (
        <label
          htmlFor={nameKey}
          className="absolute left-[12px] top-0 block animate-slide-top-sm bg-white px-1 text-[10px]"
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
        onFocus={() => setInvalidFields([])}
        className="mt-2 w-full rounded-sm border px-4 py-2 outline-none placeholder:text-sm placeholder:italic"
      />

      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="italic text-main">
          {invalidFields.find((el) => el.name === nameKey)?.message}
        </small>
      )}
    </div>
  );
};

export default InputField;

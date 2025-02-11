import { memo } from "react";
import clsx from "clsx";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  style,
  fullWidth,
  placeholder,
  isHideLabel,
}) => {
  return (
    <div className={clsx("relative mb-2 flex flex-col", fullWidth && "w-full")}>
      {!isHideLabel && value?.trim() !== "" && (
        <label
          htmlFor={nameKey}
          className="absolute left-[12px] top-0 block animate-slide-top-sm bg-white px-1 text-[10px]"
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}

      <input
        placeholder={
          placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)
        }
        type={type ? type : "text"}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
        className={clsx(
          `mt-2 w-full rounded-sm border px-4 py-2 text-gray-900 outline-none placeholder:text-sm placeholder:italic`,
          style,
        )}
      />

      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="italic text-main">
          {invalidFields.find((el) => el.name === nameKey)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputField);

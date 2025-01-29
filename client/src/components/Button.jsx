import { memo } from "react";

const Button = ({
  name,
  handleOnClick,
  style,
  iconsBefore,
  iconsAfter,
  fullWidth,
}) => {
  return (
    <button
      type="button"
      className={
        style
          ? style
          : `rounded-md bg-main px-4 py-2 font-semibold text-white ${fullWidth ? "w-full" : "w-fit"}`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {iconsBefore && iconsBefore}
      <span>{name}</span>
      {iconsAfter && iconsAfter}
    </button>
  );
};

export default memo(Button);

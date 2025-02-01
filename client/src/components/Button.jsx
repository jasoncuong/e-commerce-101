import { memo } from "react";

const Button = ({ children, handleOnClick, style, fullWidth }) => {
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
      {children}
    </button>
  );
};

export default memo(Button);

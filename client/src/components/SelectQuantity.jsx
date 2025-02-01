import { memo } from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className="flex items-center">
      <span
        onClick={() => handleChangeQuantity("minus")}
        className="cursor-pointer border-r border-black p-2"
      >
        -
      </span>
      <input
        onChange={(e) => handleQuantity(e.target.value)}
        value={quantity}
        className="w-[50px] py-2 text-center text-black outline-none"
        type="text"
      />
      <span
        onClick={() => handleChangeQuantity("plus")}
        className="cursor-pointer border-l border-black p-2"
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);

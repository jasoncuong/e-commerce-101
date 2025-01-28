import { memo } from "react";

const Countdown = ({ unit, number }) => {
  return (
    <div className="flex h-[60px] w-[30%] flex-col items-center justify-center rounded-md bg-[#f4f4f4]">
      <span className="text-[18px] text-gray-800">{number}</span>
      <span className="text-xs text-gray-700">{unit}</span>
    </div>
  );
};

export default memo(Countdown);

import { memo, useRef, useEffect } from "react";
import icons from "../utils/icon";

const { AiFillStar } = icons;

const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();

  useEffect(() => {
    percentRef.current.style.cssText = `right: ${100 - Math.round((ratingCount * 100) / ratingTotal)}%`;
  }, [ratingCount, ratingTotal]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className="w-[75%]">
        <div className="relative h-[6px] w-full rounded-l-full rounded-r-full bg-gray-200">
          <div
            ref={percentRef}
            className="absolute inset-0 rounded-l-full rounded-r-full bg-red-500"
          ></div>
        </div>
      </div>
      <div className="flex w-[15%] justify-end text-sm text-gray-400">{`${ratingCount || 0} reviews`}</div>
    </div>
  );
};

export default memo(VoteBar);

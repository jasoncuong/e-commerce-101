import { memo } from "react";
import icons from "../utils/icon";

const { IoIosArrowDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveFilter }) => {
  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="relative flex items-center justify-between gap-6 border border-gray-800 p-3 text-gray-500"
    >
      <span className="capitalize">{name}</span>
      <IoIosArrowDown />
      {activeClick === name && (
        <div className="absolute left-0 top-full w-fit bg-red-500 p-4">
          Content
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);

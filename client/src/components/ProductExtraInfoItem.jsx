import { memo } from "react";

const ProductExtraInfoItem = ({ icon, title, sub }) => {
  return (
    <div className="mb-[10px] flex items-center gap-4 border p-3">
      <span className="flex items-center justify-center rounded-full bg-gray-800 p-2 text-white">
        {icon}
      </span>
      <div className="flex flex-col text-sm text-gray-500">
        <span className="font-medium">{title}</span>
        <span className="text-xs">{sub}</span>
      </div>
    </div>
  );
};

export default memo(ProductExtraInfoItem);

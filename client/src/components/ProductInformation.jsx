import { memo, useState } from "react";
import { productInfoTabs } from "../utils/contants";

const activeStyle = "";
const notActiveStyle = "";

const ProductInformation = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div className="relative bottom-[-2px] flex items-center gap-2">
        {productInfoTabs?.map((el) => (
          <span
            key={el.id}
            onClick={() => setActiveTab(el.id)}
            className={`cursor-pointer px-4 py-2 uppercase ${activeTab === el.id ? "border border-b-0 bg-white" : "bg-gray-200"}`}
          >
            {el.name}
          </span>
        ))}
      </div>

      <div className="w-full border p-4">
        {productInfoTabs?.some((el) => el.id === activeTab) &&
          productInfoTabs?.find((el) => el.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default memo(ProductInformation);

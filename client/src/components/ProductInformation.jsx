import { memo, useState } from "react";
import { productInfoTabs } from "../utils/contants";
import { VoteBar } from "../components";
import { renderStarFromNumber } from "../utils/helpers";

const ProductInformation = ({ totalRatings, totalCount }) => {
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
        <div
          onClick={() => setActiveTab(5)}
          className={`cursor-pointer px-4 py-2 uppercase ${activeTab === 5 ? "border border-b-0 bg-white" : "bg-gray-200"}`}
        >
          CUSTOMER REVIEW
        </div>
      </div>

      <div className="w-full border p-4">
        {productInfoTabs?.some((el) => el.id === activeTab) &&
          productInfoTabs?.find((el) => el.id === activeTab)?.content}

        {activeTab === 5 && (
          <div className="flex p-4">
            <div className="flex flex-4 flex-col items-center justify-center border border-red-500">
              <span className="text-3xl font-semibold">{`${totalRatings}/5`}</span>
              <span className="flex items-center gap-1">
                {renderStarFromNumber(totalRatings)?.map((el, index) => (
                  <span key={index}>{el}</span>
                ))}
              </span>
              <span className="text-sm">{`${totalCount} reviews`}</span>
            </div>
            <div className="flex flex-6 flex-col gap-2 border border-blue-500 p-4">
              {Array.from(Array(5).keys())
                .reverse()
                .map((el, index) => (
                  <VoteBar
                    key={index}
                    number={el + 1}
                    ratingTotal={5}
                    ratingCount={2}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInformation);

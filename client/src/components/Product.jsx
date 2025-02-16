import { useState } from "react";
import { formatMoney, renderStarFromNumber } from "../utils/helpers";
import label from "../assets/label.png";
import labelblue from "../assets/labelblue.png";
import { SelectOption } from "./";
import icons from "../utils/icon";
import { Link } from "react-router-dom";
import path from "../utils/path";

const { FaHeart, AiOutlineMenu, FaEye } = icons;

const Product = ({ productData, isNew, normal }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="w-full px-[10px] text-base">
      <Link
        to={`/${productData?.category?.toLowerCase()}/${productData._id}/${productData.title}`}
        className="flex w-full cursor-pointer flex-col items-center border p-[15px]"
        onMouseEnter={(e) => {
          e.stopPropagation(), setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation(), setIsShowOption(false);
        }}
      >
        <div className="relative w-full">
          {isShowOption && (
            <div className="absolute bottom-0 left-0 right-0 flex animate-slide-top justify-center gap-2">
              <SelectOption icon={<FaHeart />} />
              <SelectOption icon={<AiOutlineMenu />} />
              <SelectOption icon={<FaEye />} />
            </div>
          )}

          <img
            src={
              productData?.thumb ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s"
            }
            alt=""
            className="h-[274px] w-[274px] object-cover"
          />

          {!normal && (
            <img
              src={isNew ? label : labelblue}
              alt=""
              className={`absolute left-[-44px] top-[-34px] w-[120px] object-contain`}
            />
          )}

          {!normal && (
            <span
              className={`absolute left-[-14px] top-[-12px] font-bold text-white ${isNew ? "" : "text-sm"} `}
            >
              {isNew ? "New" : "Trending"}
            </span>
          )}
        </div>
        <div className="mt-[15px] flex w-full flex-col items-start gap-1">
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              ),
            )}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;

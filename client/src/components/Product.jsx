import { formatMoney } from "../utils/helpers";
import label from "../assets/label.png";
import labelblue from "../assets/labelblue.png";

const Product = ({ productData, isNew }) => {
  return (
    <div className="w-full px-[10px] text-base">
      <div className="flex w-full flex-col items-center border p-[15px]">
        <div className="relative w-full">
          <img
            src={
              productData?.thumb ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s"
            }
            alt=""
            className="h-[243px] w-[243px] object-cover"
          />
          <img
            src={isNew ? label : labelblue}
            alt=""
            className={`absolute left-[-44px] top-[-34px] w-[120px] object-contain`}
          />

          <span
            className={`absolute left-[-14px] top-[-12px] font-bold text-white ${isNew ? "" : "text-sm"} `}
          >
            {isNew ? "New" : "Trending"}
          </span>
        </div>
        <div className="mt-[15px] flex w-full flex-col items-start gap-1">
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;

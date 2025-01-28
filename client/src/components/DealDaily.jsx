import { useEffect, useState, memo } from "react";
import icons from "../utils/icon";
import { apiGetProduct } from "../apis/product";
import { formatMoney, renderStarFromNumber } from "../utils/helpers";
import { Countdown } from "./";

const { AiFillStar, AiOutlineMenu } = icons;

let idInterval;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await apiGetProduct({
      limit: 1,
      page: Math.round(Math.random() * 10),
    });
    if (response.success) {
      setDealDaily(response.products[0]);
      const h = 24 - new Date().getHours();
      const m = 59 - new Date().getMinutes();
      const s = 59 - new Date().getSeconds();
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    } else {
      setHours(0);
      setMinutes(59);
      setSeconds(59);
    }
  };

  //   useEffect(() => {
  //     fetchDealDaily();
  //   }, []);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((pre) => pre - 1);
      } else if (minutes > 0) {
        setMinutes((pre) => pre - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours((pre) => pre - 1);
        setMinutes(59);
        setSeconds(59);
      } else {
        setExpireTime(!expireTime);
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [seconds, minutes, hours, expireTime]);

  useEffect(() => {
    clearInterval(idInterval);
    setTimeout(() => {
      fetchDealDaily();
    }, 5000);
  }, [expireTime]);

  return (
    <div className="w-full flex-auto border">
      <div className="flex w-full items-center justify-between p-4">
        <span className="flex flex-1 justify-center">
          <AiFillStar size={20} color="#dd1111" />
        </span>
        <span className="flex-8 flex justify-center text-center text-[20px] font-semibold text-gray-700">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>

      <div className="flex w-full flex-col items-center gap-2 px-4 pt-8">
        <img
          src={
            dealDaily?.thumb ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s"
          }
          alt=""
          className="w-full object-contain"
        />
        <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
        <span className="flex h-4">
          {renderStarFromNumber(dealDaily?.totalRatings, 20)?.map(
            (el, index) => (
              <span key={index}>{el}</span>
            ),
          )}
        </span>
        <span>{`${formatMoney(dealDaily?.price)} VND`}</span>
      </div>

      <div className="mt-8 p-4">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Countdown unit={"Hours"} number={hours} />
          <Countdown unit={"Minutes"} number={minutes} />
          <Countdown unit={"Seconds"} number={seconds} />
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 bg-main py-2 font-medium text-white hover:bg-gray-800"
        >
          <AiOutlineMenu />
          <span>Option</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);

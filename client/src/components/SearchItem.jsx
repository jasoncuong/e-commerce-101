import { memo, useEffect, useState } from "react";
import icons from "../utils/icon";
import { colors } from "../utils/contants";
import path from "../utils/path";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProduct } from "../apis";
import useDebounce from "../hooks/useDebounce";

const { IoIosArrowDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveFilter, type }) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setSelected] = useState([]);
  const [highestPrice, setHighestPrice] = useState(null);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl) {
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    } else {
      setSelected((prev) => [...prev, e.target.value]);
    }
    changeActiveFilter(null);
  };

  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [selected]);

  const fetchHighestPriceProduct = async () => {
    const response = await apiGetProduct({ sort: "-price", limit: 1 });
    if (response.success) setHighestPrice(response.products[0].price);
  };

  useEffect(() => {
    if (type === "input") fetchHighestPriceProduct();
  }, [type]);

  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    const data = {};

    if (Number(price.from) > 0) data.from = price.from;
    if (Number(price.to) > 0) data.to = price.to;

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(data).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);

  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="relative flex cursor-pointer items-center justify-between gap-6 border border-gray-800 p-3 text-gray-500"
    >
      <span className="capitalize">{name}</span>
      <IoIosArrowDown />
      {activeClick === name && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 top-[calc(100%+1px)] z-10 w-fit min-w-[150px] border bg-white p-4"
        >
          {type === "checkbox" && (
            <div className="">
              <div className="flex items-center justify-between gap-8 border-b p-4">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                  className="cursor-pointer underline hover:text-main"
                >
                  Reset
                </span>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-4 flex flex-col gap-3"
              >
                {colors.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      value={el}
                      onChange={handleSelect}
                      id={el}
                      checked={
                        selected.some((selectedItem) => selectedItem === el)
                          ? true
                          : false
                      }
                      className="form-checkbox"
                    />
                    <label htmlFor={el} className="capitalize text-gray-700">
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between gap-8 border-b p-4">
                <span className="whitespace-nowrap">{`The hightest price is ${Number(highestPrice).toLocaleString()} VND`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({ from: "", to: "" });
                    changeActiveFilter(null);
                  }}
                  className="cursor-pointer underline hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center gap-2 p-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                    className="form-input"
                    type="number"
                    id="from"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                    className="form-input"
                    type="number"
                    id="to"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);

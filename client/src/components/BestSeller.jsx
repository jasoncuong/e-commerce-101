import { useEffect, useState } from "react";
import { apiGetProduct } from "../apis/product";
import Slider from "react-slick";
import { Product } from "./";

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const tabs = [
  {
    id: 1,
    name: "Best Sellers",
  },
  {
    id: 2,
    name: "New Arrivals",
  },
  {
    id: 3,
    name: "New",
  },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProduct({ sort: "-sold" }),
      apiGetProduct({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSellers(response[0].products);
    }
    if (response[1]?.success) {
      setNewProducts(response[1].products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex gap-8 border-b-2 border-main pb-4 text-[20px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`cursor-pointer border-r font-semibold capitalize text-gray-400 ${activeTab === el.id ? "text-main" : ""}`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Slider {...settings}>
          {bestSellers?.map((el) => (
            <Product key={el._id} productData={el} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;

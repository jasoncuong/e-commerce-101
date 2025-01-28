import { useEffect, useState } from "react";
import { apiGetProduct } from "../apis/product";
import Slider from "react-slick";
import { Product } from "./";

var settings = {
  dots: true,
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
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProduct({ sort: "-sold" }),
      apiGetProduct({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSellers(response[0].products);
      setProducts(response[0].products);
    }
    if (response[1]?.success) {
      setNewProducts(response[1].products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === 1) {
      setProducts(bestSellers);
    }
    if (activeTab === 2) {
      setProducts(newProducts);
    }
  }, [activeTab]);

  return (
    <div>
      <div className="mx-[-32px] flex text-[20px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`cursor-pointer border-r px-8 font-semibold uppercase text-gray-400 ${activeTab === el.id ? "text-main" : ""}`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mx-[-10px] mt-4 border-t-2 border-main pt-4">
        <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el._id}
              productData={el}
              isNew={activeTab === 1 ? false : true}
            />
          ))}
        </Slider>
      </div>
      <div className="mt-8 flex w-full gap-4">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
      </div>
    </div>
  );
};

export default BestSeller;

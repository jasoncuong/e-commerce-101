import { useEffect, useState } from "react";
import { apiGetProduct } from "../apis/product";
import { CustomSlider } from "./";
import { getNewProducts } from "../store/product/asyncActions";
import { useDispatch, useSelector } from "react-redux";

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
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);

  const fetchProducts = async () => {
    const response = await apiGetProduct({ sort: "-sold" });
    if (response?.success) {
      setBestSellers(response.products);
      setProducts(response.products);
    }
  };

  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
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
        <CustomSlider products={products} activeTab={activeTab} />
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

import { useEffect, useState } from "react";
import { ProductCard } from "./";
import { apiGetProduct } from "../apis";

const FeatureProduct = () => {
  const [product, setProduct] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProduct({
      limit: 9,
      page: Math.round(Math.random() * 3),
    });

    if (response.success) {
      setProduct(response.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <h3 className="border-b-2 border-main py-[15px] text-[20px] font-semibold">
        FEATURED PRODUCTS
      </h3>
      <div className="mx-[-10px] mt-[15px] flex flex-wrap">
        {product?.map((el, index) => (
          <ProductCard
            key={index}
            image={el.thumb}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
          />
        ))}
      </div>

      <div className="flex justify-between gap-1">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt=""
          className="w-[49%] object-contain"
        />
        <div className="flex w-[24%] flex-col justify-between gap-4">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          />
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          />
        </div>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt=""
          className="w-[24%] object-contain"
        />
      </div>
    </div>
  );
};

export default FeatureProduct;

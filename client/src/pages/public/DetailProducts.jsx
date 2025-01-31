import { useParams } from "react-router-dom";
import { apiGetDetailProduct } from "../../apis";
import { useState, useEffect } from "react";
import { Breadcrumbs } from "../../components";

const DetailProducts = () => {
  const { pid, title, category } = useParams();
  const [products, setProducts] = useState(null);

  const fetchProductData = async () => {
    const response = await apiGetDetailProduct(pid);
    if (response.success) {
      setProducts(response.productData);
    }
  };

  useEffect(() => {
    if (pid) {
      fetchProductData();
    }
  }, [pid]);

  return (
    <div className="w-full">
      <div className="flex h-[81px] items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3>{title}</h3>
          <Breadcrumbs title={title} category={category} />
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;

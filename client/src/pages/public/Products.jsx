import { useParams, useSearchParams } from "react-router-dom";
import { Breadcrumbs, Product, SearchItem } from "../../components";
import { apiGetProduct } from "../../apis";
import { useEffect, useState, useCallback } from "react";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();

  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProduct(queries);
    if (response.success) {
      setProducts(response.products);
    }
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);

    const queries = {};
    for (let i of params) queries[i[0]] = i[1];

    console.log("🚀 ~ useEffect ~ param:", param);
    fetchProductsByCategory(queries);
  }, [params]);

  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick(null);
      } else {
        setActiveClick(name);
      }
    },
    [activeClick],
  );

  return (
    <div className="w-full">
      <div className="flex h-[81px] items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">{category}</h3>
          <Breadcrumbs category={category} />
        </div>
      </div>

      <div className="m-auto mt-8 flex w-main justify-between border p-4">
        <div className="flex w-4/5 flex-auto flex-col">
          <span className="text-sm font-semibold">Filter By</span>
          <div className="flex items-center gap-3">
            <SearchItem
              name="price"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="input"
            />
            <SearchItem
              name="color"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="checkbox"
            />
          </div>
        </div>
        <div className="flex w-1/5">Sort by</div>
      </div>

      <div className="m-auto mt-8 w-main">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid mx-[-10px] flex"
          columnClassName="my-masonry-grid_column"
        >
          {products?.map((el, index) => (
            <Product key={index} normal={true} pid={el.id} productData={el} />
          ))}
        </Masonry>
      </div>

      <div className="h-[500px] w-full"></div>
    </div>
  );
};

export default Products;

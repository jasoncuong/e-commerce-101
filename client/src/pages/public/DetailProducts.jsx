import { useParams } from "react-router-dom";
import { apiGetDetailProduct } from "../../apis";
import { useState, useEffect } from "react";
import { Breadcrumbs } from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

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

      <div className="m-auto mt-4 flex w-main">
        <div className="flex w-2/5 flex-col gap-4">
          <div className="h-[458px] w-[458px] border">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: products?.thumb,
                },
                largeImage: {
                  src: products?.thumb,
                  width: 1800,
                  height: 1800,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider
              className="images-slider flex justify-between gap-2"
              {...settings}
            >
              {products?.images?.map((el) => (
                <div key={el._id} className="flex-1">
                  <img
                    src={el}
                    alt="sub-product"
                    className="h-[143px] border object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 border border-red-300">price</div>
        <div className="w-1/5 border border-green-300">info</div>
      </div>

      <div className="h-[500px] w-full"></div>
    </div>
  );
};

export default DetailProducts;

import { useParams } from "react-router-dom";
import { apiGetDetailProduct, apiGetProduct } from "../../apis";
import { useState, useEffect, useCallback } from "react";
import {
  Breadcrumbs,
  Button,
  SelectQuantity,
  ProductExtraInfoItem,
  ProductInformation,
  CustomSlider,
} from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import {
  formatPrice,
  formatMoney,
  renderStarFromNumber,
} from "../../utils/helpers";
import { productExtraInfo } from "../../utils/contants";

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
  const [quantity, setQuantity] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchProductData = async () => {
    const response = await apiGetDetailProduct(pid);
    if (response.success) {
      setProducts(response.productData);
      setCurrentImage(response?.productData?.thumb);
    }
  };

  const fetchProducts = async () => {
    const response = await apiGetProduct({ category });
    if (response.success) {
      setRelatedProduct(response.products);
    }
  };

  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }

    window.scrollTo(0, 0);
  }, [pid]);

  useEffect(() => {
    if (pid) fetchProductData();
  }, [update]);

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity],
  );

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity],
  );

  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  return (
    <div className="w-full">
      <div className="flex h-[81px] items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold">{title}</h3>
          <Breadcrumbs title={title} category={category} />
        </div>
      </div>

      <div className="m-auto mt-4 flex w-main">
        <div className="flex w-2/5 flex-col gap-4">
          <div className="h-[458px] w-[458px] overflow-hidden border">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: currentImage,
                },
                largeImage: {
                  src: currentImage,
                  width: 1800,
                  height: 1500,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider
              className="images-slider flex justify-between gap-2"
              {...settings}
            >
              {products?.images?.map((el, index) => (
                <div key={index} className="flex-1">
                  <img
                    onClick={(e) => handleClickImage(e, el)}
                    src={el}
                    alt="sub-product"
                    className="h-[143px] cursor-pointer border object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="flex w-2/5 flex-col gap-4 pr-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] font-semibold">{`${formatMoney(formatPrice(products?.price))} VND`}</h2>
            <span className="text-sm text-main">{`Instock: ${products?.quantity}`}</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStarFromNumber(products?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-sm italic text-main">{`(Sold ${products?.sold})`}</span>
          </div>
          <ul className="list-disc pl-5 text-sm text-gray-500">
            {products?.description?.map((el, index) => (
              <li className="leading-6" key={index}>
                {el}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <SelectQuantity
                handleQuantity={handleQuantity}
                quantity={quantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <Button fullWidth>Add to cart</Button>
          </div>
        </div>
        <div className="w-1/5">
          {productExtraInfo?.map((el) => (
            <ProductExtraInfoItem
              key={el.id}
              title={el.title}
              sub={el.sub}
              icon={el.icon}
            />
          ))}
        </div>
      </div>

      <div className="m-auto mt-8 w-main">
        <ProductInformation
          totalRatings={products?.totalRatings}
          ratings={products?.ratings}
          nameProduct={products?.title}
          pid={products?._id}
          rerender={rerender}
        />
      </div>

      <div className="m-auto mt-8 w-main">
        <h3 className="border-b-2 border-main py-[15px] text-[20px] font-semibold">
          OTHER CUSTOMERS ALSO BUY:
        </h3>
        <CustomSlider products={relatedProduct} normal={true} />
      </div>
      <div className="h-[100px] w-full"></div>
    </div>
  );
};

export default DetailProducts;

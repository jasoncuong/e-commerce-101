import Slider from "react-slick";
import { Product } from "./";
import { memo } from "react";

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const CustomSlider = ({ products, activeTab }) => {
  return (
    <>
      {products && (
        <Slider {...settings} className="custom-slider">
          {products?.map((el, index) => (
            <Product
              key={index}
              pid={el.id}
              productData={el}
              isNew={activeTab === 1 ? false : true}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);

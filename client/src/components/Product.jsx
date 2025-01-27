const Product = ({ productData }) => {
  return (
    <div className="w-1/3">
      <img
        src={productData?.images[0] || ""}
        alt=""
        className="h-[243px] w-[243px] object-cover"
      />
    </div>
  );
};

export default Product;

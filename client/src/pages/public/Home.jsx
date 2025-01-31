import {
  Sidebar,
  Banner,
  BestSeller,
  DealDaily,
  FeatureProduct,
  CustomSlider,
} from "../../components";

import { useSelector } from "react-redux";
import icons from "../../utils/icon";

const { IoIosArrowForward } = icons;

const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);
  const { isLoggedIn, current } = useSelector((state) => state.user);

  return (
    <>
      <div className="mt-6 flex w-main">
        <div className="flex w-[25%] flex-auto flex-col gap-5">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex w-[75%] flex-auto flex-col gap-5 pl-5">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8">
        <FeatureProduct />
      </div>

      {/* NEW ARRIVALS */}
      <div className="my-8 w-full">
        <h3 className="border-b-2 border-main py-[15px] text-[20px] font-semibold">
          NEW ARRIVALS
        </h3>
        <div className="mx-[-10px] mt-4">
          <CustomSlider products={newProducts} />
        </div>
      </div>

      {/* HOT COLLECTIONS */}
      <div className="my-8 w-full">
        <h3 className="border-b-2 border-main py-[15px] text-[20px] font-semibold">
          HOT COLLECTIONS
        </h3>
        <div className="mt-4 flex flex-wrap gap-4">
          {categories
            ?.filter((el) => el.brand.length > 0)
            ?.map((el, index) => (
              <div key={index} className="w-[396px]">
                <div className="flex min-h-[190px] gap-4 border p-4">
                  <img
                    src={el?.image}
                    alt=""
                    className="h-[139px] w-[144px] flex-1 object-cover"
                  />
                  <div className="flex-1 text-gray-700">
                    <h4 className="font-semibold uppercase">{el.title}</h4>
                    <ul className="text-sm">
                      {el?.brand.map((item, index) => (
                        <span
                          key={index}
                          className="flex cursor-pointer items-center gap-1 text-gray-500 hover:text-main"
                        >
                          <IoIosArrowForward size={14} />
                          <li>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="my-8 w-full">
        <h3 className="border-b-2 border-main py-[15px] text-[20px] font-semibold">
          BLOG POSTS
        </h3>
      </div>
    </>
  );
};

export default Home;

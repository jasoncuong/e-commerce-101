// import { useEffect, useState } from "react";
// import { apiGetCategories } from "../apis/app";
import { NavLink } from "react-router-dom";
import { createSlug } from "../utils/helpers";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.appReducer);
  console.log(categories);

  // const [category, setCategory] = useState(null);
  // const fetchCategory = async () => {
  //   const response = await apiGetCategories();

  //   if (response.success) {
  //     setCategory(response.productCategories);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategory();
  // }, []);

  return (
    <div className="flex flex-col border">
      {categories &&
        categories.map((el) => (
          <NavLink
            key={createSlug(el.title)}
            to={createSlug(el.title)}
            className={({ isActive }) =>
              isActive
                ? "bg-main px-5 pb-[14px] pt-[15px] text-sm text-white hover:text-main"
                : "px-5 pb-[14px] pt-[15px] text-sm hover:text-main"
            }
          >
            {el.title}
          </NavLink>
        ))}
    </div>
  );
};

export default Sidebar;

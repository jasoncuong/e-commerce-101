import { navigation } from "../utils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="mb-6 flex h-[48px] w-main items-center border-y py-2 text-sm">
      {navigation.map((el) => (
        <NavLink
          key={el.id}
          to={el.path}
          className={({ isActive }) =>
            isActive
              ? `pr-12 text-main hover:text-main`
              : `pr-12 hover:text-main`
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;

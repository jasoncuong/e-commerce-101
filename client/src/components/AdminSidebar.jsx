import { memo, Fragment, useState } from "react";
import logo from "../assets/logo1.png";
import { adminSidebar } from "../utils/contants";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import icons from "../utils/icon";

const { IoIosArrowDown, IoIosArrowForward } = icons;

const activeStyle =
  "px-4 py-2 flex items-center gap-2 text-gray-200 bg-gray-500";
const notActiveStyle =
  "px-4 py-2 flex items-center gap-2 text-gray-200 hover:bg-gray-600";

const AdminSidebar = () => {
  const [actived, setActived] = useState([]);

  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID)) {
      setActived((prev) => prev.filter((el) => el !== tabID));
    } else {
      setActived((prev) => [...prev, tabID]);
    }
  };

  return (
    <div className="h-full bg-zinc-800 py-4">
      <div className="flex flex-col items-center gap-2 p-4">
        <img src={logo} alt="logo" className="w-[200px] object-contain" />
        <small>Admin Workspace</small>
      </div>
      <div>
        {adminSidebar?.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(isActive && activeStyle, !isActive && notActiveStyle)
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div
                className="flex flex-col text-sm text-gray-200"
                onClick={() => handleShowTabs(el.id)}
              >
                <div className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === el.id) ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
                {actived.some((id) => id === el.id) && (
                  <div className="flex flex-col">
                    {el.submenu.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activeStyle,
                            !isActive && notActiveStyle,
                            "pl-10",
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSidebar);

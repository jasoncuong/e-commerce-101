import { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../utils/path";
import { getCurrent } from "../store/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import icons from "../utils/icon";
import { logout, clearMessage } from "../store/user/userSlice";
import Swal from "sweetalert2";

const { IoIosLogOut } = icons;

const TopHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, current, message } = useSelector((state) => state.user);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) {
        dispatch(getCurrent());
      }
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (message) {
      Swal.fire("Oops", message, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
    }
  }, [message]);

  return (
    <div className="flex h-[38px] w-full items-center justify-center bg-main">
      <div className="flex w-main justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn && current ? (
          <div className="flex items-center justify-center gap-4 text-sm">
            <span>{`Welcome, ${current?.firstname} ${current?.lastname}`}</span>
            <span
              className="cursor-pointer p-2 hover:rounded-full hover:bg-gray-200 hover:text-main"
              onClick={() => dispatch(logout())}
            >
              <IoIosLogOut size={18} />
            </span>
          </div>
        ) : (
          <Link
            to={`/${path.LOGIN}`}
            className="cursor-pointer hover:text-gray-700"
          >
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);

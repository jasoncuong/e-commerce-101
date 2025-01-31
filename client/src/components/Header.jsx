import Logo from "../assets/logo.png";
import icons from "../utils/icon";
import { Link } from "react-router-dom";
import path from "../utils/path";

const Header = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
  return (
    <div className="flex h-[110px] w-main justify-between py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={Logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col items-center border-r px-6">
          <span className="flex items-center gap-3">
            <RiPhoneFill color="red" />
            <span className="font-semibold">(+1800) 000 8888</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center border-r px-6">
          <span className="flex items-center gap-3">
            <MdEmail color="red" />
            <span className="font-semibold">support@tadathemes.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="flex cursor-pointer items-center justify-center gap-2 border-r px-6">
          <BsHandbagFill color="red" />
          <span>0 item(s)</span>
        </div>
        <div className="flex cursor-pointer items-center justify-center gap-2 px-6">
          <FaUserCircle color="red" />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

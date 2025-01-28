import { memo } from "react";
import icons from "../utils/icon";

const { MdEmail } = icons;

const Footer = () => {
  return (
    <div className="w-full">
      {/* TOP */}
      <div className="flex h-[103px] w-full items-center justify-center bg-main">
        <div className="flex w-main items-center justify-between">
          <div className="flex flex-1 flex-col">
            <span className="text-xl uppercase text-gray-100">
              Sign up to Newsletter
            </span>
            <small className="text-[13px] text-gray-300">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex flex-1 items-center">
            <input
              type="text"
              placeholder="Email address..."
              className="w-full rounded-l-full bg-[#f04646] p-4 pr-0 text-gray-200 outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-100 placeholder:opacity-50"
            />
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-r-full bg-[#f04646] text-white">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex h-[407px] w-full items-center justify-center bg-gray-900 text-[13px] text-white">
        <div className="flex w-main">
          <div className="flex-2 cursor-pinter flex flex-col gap-2">
            <h3 className="mb-[20px] border-l-2 border-main pl-[15px] text-[15px] font-medium">
              ABOUT US
            </h3>
            <span>
              <span>Address: </span>
              <span className="opacity-70">
                474 Ontario St Toronto, ON M4X 1M7 Canada{" "}
              </span>
            </span>
            <span>
              <span>Phone: </span>
              <span className="opacity-70">(+1234)56789xxx</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-70">tadathemes@gmail.com</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="mb-[20px] border-l-2 border-main pl-[15px] text-[15px] font-medium">
              INFORMATION
            </h3>
            <span className="cursor-pointer opacity-70">Typography</span>
            <span className="cursor-pointer opacity-70">Gallery</span>
            <span className="cursor-pointer opacity-70">Store Location</span>
            <span className="cursor-pointer opacity-70">Today's Deals</span>
            <span className="cursor-pointer opacity-70">Contact</span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="mb-[20px] border-l-2 border-main pl-[15px] text-[15px] font-medium">
              WHO ARE WE
            </h3>

            <span className="cursor-pointer opacity-70">Help</span>
            <span className="cursor-pointer opacity-70">Free Shipping</span>
            <span className="cursor-pointer opacity-70">FAQs</span>
            <span className="cursor-pointer opacity-70">Return & Exchange</span>
            <span className="cursor-pointer opacity-70">Testimonials</span>
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] border-l-2 border-main pl-[15px] text-[15px] font-medium uppercase">
              #DigitalWorldStore
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);

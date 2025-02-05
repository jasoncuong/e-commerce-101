import { memo, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { voteOptions } from "../utils/contants";
import icons from "../utils/icon";
import { Button } from "../components";

const { AiFillStar } = icons;

const VoteOptions = ({ nameProduct }) => {
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="flex w-[700px] flex-col items-center justify-center gap-4 bg-white p-4"
    >
      <img src={logo} alt="logo" className="my-8 w-[300px] object-contain" />
      <h2 className="text-center text-lg font-medium">{`Voting product ${nameProduct}`}</h2>
      <textarea
        className="form-textarea w-full placeholder:text-sm placeholder:italic placeholder:text-gray-200"
        placeholder="Type something"
      ></textarea>
      <div className="flex w-full flex-col gap-4">
        <p className="font-semibold">How do you like this product?</p>
        <div className="flex items-center justify-center gap-4">
          {voteOptions.map((el, index) => (
            <div
              key={index}
              className="flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-gray-200 p-4 hover:bg-gray-300"
            >
              <AiFillStar color="gray" />
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button fullWidth>Submit</Button>
      </div>
    </div>
  );
};

export default memo(VoteOptions);

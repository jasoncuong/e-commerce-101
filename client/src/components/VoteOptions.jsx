import { memo, useRef, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { voteOptions } from "../utils/contants";
import icons from "../utils/icon";
import { Button } from "../components";

const { AiFillStar } = icons;

const VoteOptions = ({ nameProduct, handleSubmitVoteOptions }) => {
  const modalRef = useRef();
  const [choosenScore, setChoosenScore] = useState(null);
  const [comment, setComment] = useState("");

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
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="form-textarea w-full placeholder:text-sm placeholder:italic placeholder:text-gray-200"
        placeholder="Type something"
      ></textarea>
      <div className="flex w-full flex-col gap-4">
        <p className="font-semibold">How do you like this product?</p>
        <div className="flex items-center justify-center gap-4">
          {voteOptions.map((el, index) => (
            <div
              key={index}
              onClick={() => setChoosenScore(el.id)}
              className="flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-gray-200 p-4"
            >
              {Number(choosenScore) && choosenScore >= el.id ? (
                <AiFillStar color="orange" />
              ) : (
                <AiFillStar color="gray" />
              )}

              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          handleOnClick={() =>
            handleSubmitVoteOptions({
              comment,
              score: choosenScore,
            })
          }
          fullWidth
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default memo(VoteOptions);

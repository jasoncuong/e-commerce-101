import { useParams, useNavigate } from "react-router-dom";
import path from "../../utils/path";
import Swal from "sweetalert2";
import { useEffect } from "react";

const FinalRegister = () => {
  const navigate = useNavigate();
  const { status } = useParams();
  useEffect(() => {
    if (status === "failed") {
      Swal.fire("Oops!", "Registration failed!", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }

    if (status === "success") {
      Swal.fire(
        "Congratulation!",
        "Registration successfully!",
        "success",
      ).then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
  }, []);
  return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default FinalRegister;

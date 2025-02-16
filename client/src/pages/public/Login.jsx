import { useCallback, useEffect, useState } from "react";
import { InputField, Button, Loading } from "../../components";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import path from "../../utils/path";
import { login } from "../../store/user/userSlice";
import { showModal } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../utils/helpers";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [token, setToken] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    console.log(response);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.info(response.message);
    }
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  //Submit
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;

    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          setIsVerifyEmail(true);
        } else {
          Swal.fire("Oops!", response.message, "error");
        }
      } else {
        const result = await apiLogin(data);
        if (result.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: result.accessToken,
              userData: result.userData,
            }),
          );
          navigate(`/${path.HOME}`);
        } else {
          Swal.fire("Oops!", result.message, "error");
        }
      }
    } else {
    }
  }, [payload, isRegister]);

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire("Congratulation!", response.message, "success").then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else {
      Swal.fire("Oops!", response.message, "error");
    }
    setIsVerifyEmail(false);
    setToken("");
  };

  return (
    <div className="relative h-screen w-screen">
      {isVerifyEmail && (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-overlay">
          <div className="w-[500px] rounded-md bg-white p-8">
            <h4 className="">
              We sent a code to your email. Please check your email and enter
              your code:
            </h4>
            <input
              className="rounded-md border p-2 outline-none"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <button
              onClick={finalRegister}
              type="button"
              className="ml-4 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {isForgotPassword && (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex animate-slide-right flex-col items-center bg-white py-8">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Enter your email: </label>
            <input
              type="text"
              id="email"
              className="w-[800px] border-b pb-2 outline-none placeholder:text-sm"
              placeholder="Exp: email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex w-full items-center justify-end gap-4">
              <Button
                name="Submit"
                style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2"
                handleOnClick={handleForgotPassword}
              />
              <Button
                name="Back"
                handleOnClick={() => setIsForgotPassword(false)}
              />
            </div>
          </div>
        </div>
      )}
      <img
        src="https://static.vecteezy.com/system/resources/previews/011/220/317/non_2x/e-commerce-banner-design-on-light-blue-background-the-icons-are-collected-in-a-honeycomb-like-module-illustration-vector.jpg"
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-1/2 top-0 flex items-center justify-center">
        <div className="flex min-w-[500px] flex-col items-center rounded-md bg-white p-8">
          <h1 className="mb-8 text-[28px] font-semibold text-main">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey={"firstname"}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey={"lastname"}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          )}

          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey={"email"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey={"mobile"}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}

          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey={"password"}
            type={"password"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Button handleOnClick={handleSubmit} fullWidth>
            {isRegister ? "Register" : "Login"}
          </Button>
          <div className="my-2 flex w-full items-center justify-between text-sm">
            {!isRegister && (
              <span
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot your account?
              </span>
            )}

            {!isRegister && (
              <span
                onClick={() => setIsRegister(true)}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                Create account
              </span>
            )}

            {isRegister && (
              <span
                onClick={() => setIsRegister(false)}
                className="w-full cursor-pointer text-center text-blue-500 hover:underline"
              >
                Already have an account?
              </span>
            )}
          </div>
          <Link
            className="cursor-pointer text-sm text-blue-500 hover:underline"
            to={`/${path.HOME}`}
          >
            Go home?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

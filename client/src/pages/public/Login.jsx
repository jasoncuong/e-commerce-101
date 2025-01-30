import { useCallback, useState } from "react";
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    console.log(response);
  };

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        Swal.fire("Congratulation!", response.message, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else {
        Swal.fire("Oops!", response.message, "error");
      }
    } else {
      const result = await apiLogin(data);
      console.log(result);

      if (result.success) {
        dispatch(
          register({
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
  }, [payload, isRegister]);
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center bg-white py-8">
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
          <div className="flex w-full items-center justify-end">
            <Button name="Submit" handleOnClick={handleForgotPassword} />
          </div>
        </div>
      </div>
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
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey={"lastname"}
              />
            </div>
          )}

          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey={"email"}
          />
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey={"mobile"}
            />
          )}

          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey={"password"}
            type={"password"}
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fullWidth
          />
          <div className="my-2 flex w-full items-center justify-between text-sm">
            {!isRegister && (
              <span className="cursor-pointer text-blue-500 hover:underline">
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
        </div>
      </div>
    </div>
  );
};

export default Login;

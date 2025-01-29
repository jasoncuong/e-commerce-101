import { useCallback, useState } from "react";
import { InputField, Button } from "../../components";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = useCallback(() => {
    console.log(payload);
  }, [payload]);
  return (
    <div className="relative h-screen w-screen">
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
            <InputField
              value={payload.name}
              setValue={setPayload}
              nameKey={"name"}
            />
          )}

          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey={"email"}
          />
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

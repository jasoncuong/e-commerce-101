import { useState } from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="animate-slide-right bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center bg-white py-8">
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Enter your new password: </label>
        <input
          type="password"
          id="password"
          className="w-[800px] border-b pb-2 outline-none placeholder:text-sm"
          placeholder="Type here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex w-full items-center justify-end gap-4">
          <Button
            name="Submit"
            style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2"
            handleOnClick={handleResetPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

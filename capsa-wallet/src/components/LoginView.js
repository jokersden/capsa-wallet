import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useForm } from "react-hook-form";
import { checkPass } from "../utils/secureStorage";
import {
  ACCOUNT_SCREEN,
  IMG_WIDTH_LOGGED,
  NEW_PASSWORD_SCREEN,
  PASSWORD_FROM_SEED_SCREEN,
} from "../utils/configs";

function LoginView() {
  const user = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    if (checkPass(data.password, process.env.REACT_APP_SERVER_HASH_KEY)) {
      user.setIsLogged(true);
      user.setImageWidth(IMG_WIDTH_LOGGED);
      user.setUserStep(ACCOUNT_SCREEN);
    } else {
      setError("password", { type: "mismatch" });
    }
  };

  return (
    <div className="m-3 flex justify-center bg-base-200 h-screen items-center">
      <div className="flex flex-col w-2/3">
        {user.hasWallet ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="password"
              placeholder="Enter your Password"
              {...register("password", { required: true })}
              className="input input-md input-ghost w-full max-w-xs border-x-0 border-t-0 border-b border-gray-400"
            />
            {errors.password?.type === "required" && (
              <span className="text-xs text-red-700">
                Password cannot be empty
              </span>
            )}
            {errors.password?.type === "mismatch" && (
              <span className="text-xs text-red-700">Incorrect Password</span>
            )}
            <div className="w-full flex justify-center my-4">
              <button
                type="submit"
                className="btn btn-sm btn-outline text-accent"
              >
                Sign-In
              </button>
            </div>
          </form>
        ) : (
          <div className="m-5 flex flex-col items-center">
            <button
              className="btn btn-active btn-link btn-xs text-accent"
              onClick={() => {
                user.setUserStep(NEW_PASSWORD_SCREEN);
              }}
            >
              Create a New Wallet
            </button>
            <span>OR</span>
            <button
              className="btn btn-active btn-link btn-xs text-accent"
              onClick={() => {
                user.setUserStep(PASSWORD_FROM_SEED_SCREEN);
              }}
            >
              Import an Exsisting Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginView;

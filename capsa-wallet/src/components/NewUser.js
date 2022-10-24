import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useForm } from "react-hook-form";
import { savePassword } from "../utils/secureStorage";
import {
  NEW_WALLET_SEED_SCREEN,
  NEW_PASSWORD_SCREEN,
  PASSWORD_FROM_SEED_SCREEN,
  FROM_SEED_SCREEN,
  LOGIN_SCREEN,
} from "../utils/configs";

function NewUser() {
  const user = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    if (data.password === data.confirmation) {
      savePassword(
        data.password,
        process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
      );
      if (user.userStep === NEW_PASSWORD_SCREEN) {
        user.setUserStep(NEW_WALLET_SEED_SCREEN);
      } else if (user.userStep === PASSWORD_FROM_SEED_SCREEN) {
        user.setUserStep(FROM_SEED_SCREEN);
      }
    } else {
      setError("confirmation", { type: "mismatch" });
    }
  };
  return (
    <div className="m-4 flex justify-center bg-base-200 h-screen items-center">
      <div className="absolute top-40 left-10">
        <button
          className="btn btn-circle btn-accent"
          onClick={() => user.setUserStep(LOGIN_SCREEN)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col w-2/3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            placeholder="Create a new Password"
            {...register("password", { required: true })}
            className="input input-md input-ghost w-full max-w-xs border-x-0 border-t-0 border-b border-gray-400"
          />
          {errors.password?.type === "required" && (
            <span className="text-xs text-red-700">
              Password cannot be empty
            </span>
          )}
          <input
            type="password"
            placeholder="Confirm your Password"
            {...register("confirmation", { required: true })}
            className="input input-md input-ghost w-full max-w-xs border-x-0 border-t-0 border-b border-gray-400"
          />
          {errors.confirmation?.type === "required" && (
            <span className="text-xs text-red-700">
              Password cannot be empty
            </span>
          )}
          {errors.confirmation?.type === "mismatch" && (
            <span className="text-xs text-red-700">
              Passwords should match!
            </span>
          )}

          <label className="label cursor-pointer">
            <input
              type="checkbox"
              placeholder="Enter your Password"
              {...register("agreement", { required: true })}
              className="checkbox"
            />
            <span className="label-text">I Agree to terms and conditions.</span>
          </label>

          {errors.agreement?.type === "required" && (
            <span className="text-xs text-red-700">
              You have to read and agree!!
            </span>
          )}
          <div className="w-full flex justify-center my-4">
            <button
              type="submit"
              className="btn btn-sm btn-outline text-accent"
            >
              Create New Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUser;

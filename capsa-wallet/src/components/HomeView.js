import React, { useContext } from "react";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../context/userContext";
import { useForm } from "react-hook-form";

function HomeView() {
  const user = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    if (data.password === secureLocalStorage.getItem("password")) {
      user.setIsLogged(true);
    } else {
      setError("password", { type: "mismatch" });
    }
    // console.log(secureLocalStorage.getItem("password"), user.isLogged);
    // secureLocalStorage.setItem("password", password);
  };

  return (
    <div className="m-4 flex justify-center bg-base-200 h-screen items-center w-full">
      <div className="flex flex-col w-2/3">
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
            <button type="submit" className="btn btn-sm glass">
              Sign-In
            </button>
          </div>
        </form>
        <div className="m-5 flex flex-col items-center">
          <button className="btn btn-active btn-link btn-xs">
            Create a New Wallet
          </button>
          <span>OR</span>
          <button className="btn btn-active btn-link btn-xs">
            Import an Exsisting Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeView;

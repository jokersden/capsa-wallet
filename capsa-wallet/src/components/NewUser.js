import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";

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
      secureLocalStorage.setItem("password", data.password);
      user.setUserStep(2);
    } else {
      setError("confirmation", { type: "mismatch" });
    }
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
          <input
            type="password"
            placeholder="Enter your Password"
            {...register("confirmatio", { required: true })}
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
          <input
            type="checkbox"
            placeholder="Enter your Password"
            {...register("agreement", { required: true })}
            className=""
          />
          {errors.agreement?.type === "required" && (
            <span className="text-xs text-red-700">
              You have to read and agree!!
            </span>
          )}
          <div className="w-full flex justify-center my-4">
            <button type="submit" className="btn btn-sm glass">
              Create New Password
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default NewUser;

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { getSecurely } from "../utils/secureStorage";
import { ACCOUNT_SCREEN } from "../utils/configs";

function ConfirmSeed() {
  const user = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    const mn = getSecurely(
      "mnemonic",
      process.env.REACT_APP_SERVER_HASH_KEY
    ).split(" ");
    if (
      data.fourth === mn[3] &&
      data.eight === mn[7] &&
      data.sixteenth === mn[15] &&
      data.twentyfourth === mn[23]
    ) {
      localStorage.removeItem("userStep");
      user.setUserStep(ACCOUNT_SCREEN);
    } else {
      setError("twentyfourth", { type: "mismatch" });
    }
  };

  return (
    <>
      <div className="my-10 mx-6 flex flex-col">
        <span className="font-bold italic">
          Enter your 4th, 8th, 16th and 24th words.
        </span>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col text-center">
              <input
                type="text"
                placeholder="4 th word"
                {...register("fourth", { required: true })}
                className="input input-md input-ghost max-w-xs border-x-0 border-t-0 border-b border-gray-400"
              />
              {errors.fourth?.type === "required" && (
                <span className="text-xs text-red-700 mt-1">
                  This cannot be empty
                </span>
              )}
            </div>

            <div className="flex flex-col text-center">
              <input
                type="text"
                placeholder="8 th word"
                {...register("eight", { required: true })}
                className="input input-md input-ghost max-w-xs border-x-0 border-t-0 border-b border-gray-400"
              />
              {errors.eight?.type === "required" && (
                <span className="text-xs text-red-700 mt-1">
                  This cannot be empty
                </span>
              )}
            </div>

            <div className="flex flex-col text-center">
              <input
                type="text"
                placeholder="16 th word"
                {...register("sixteenth", { required: true })}
                className="input input-md input-ghost max-w-xs border-x-0 border-t-0 border-b border-gray-400"
              />
              {errors.sixteenth?.type === "required" && (
                <span className="text-xs text-red-700 mt-1">
                  This cannot be empty
                </span>
              )}
            </div>

            <div className="flex flex-col text-center">
              <input
                type="text"
                placeholder="24 th word"
                {...register("twentyfourth", { required: true })}
                className="input input-md input-ghost max-w-xs border-x-0 border-t-0 border-b border-gray-400"
              />
              {errors.twentyfourth?.type === "required" && (
                <span className="text-xs text-red-700 mt-1">
                  This cannot be empty
                </span>
              )}
            </div>
          </div>
          {errors.twentyfourth?.type === "mismatch" && (
            <div className="mt-5 justify-center text-center">
              <span className="text-xs text-red-700 mt-5 ">
                Please make sure you've entered ALL the words correctly..
              </span>
            </div>
          )}
          <div className="flex justify-center w-full mt-10">
            <button className="btn btn-accent" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ConfirmSeed;

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { saveSecurely } from "../utils/secureStorage";
import algosdk from "algosdk";
import { ACCOUNT_SCREEN } from "../utils/configs";

function FromSeed() {
  const user = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    if (data.seedarea.split(" ").length === 25) {
      try {
        const account = algosdk.mnemonicToSecretKey(data.seedarea);
        saveSecurely(
          account.addr,
          "address",
          process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
        );
        saveSecurely(
          algosdk.secretKeyToMnemonic(account.sk),
          "mnemonic",
          process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
        );
        saveSecurely(
          JSON.stringify(account.sk),
          "pk",
          process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
        );
        user.setAddress(account.addr);
        //user.setImageWidth(IMG_WIDTH_LOGGED);
        user.setUserStep(ACCOUNT_SCREEN);
      } catch {
        setError("seedarea", {
          type: "mismatch",
          message:
            "Your Seed phrase is wrong. Check all the words and spellings.",
        });
      }
    } else {
      setError("seedarea", {
        type: "mismatch",
        message: "There should be 25 words.",
      });
    }
  };

  return (
    <div className="my-10 mx-6 flex flex-col">
      <span className="font-bold italic text-center">
        Please enter your 25 word secret phrase. Each word should be separated
        by a space
      </span>
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="textarea textarea-bordered italic w-full h-48"
          {...register("seedarea", { required: true })}
        ></textarea>
        {errors.seedarea?.type === "required" && (
          <span className="text-xs text-red-700 mt-1">
            This cannot be empty
          </span>
        )}
        {errors.seedarea?.type === "mismatch" && (
          <span className="text-xs text-red-700 mt-1">
            {errors.seedarea?.message}
          </span>
        )}
        <div className="flex justify-center w-full mt-4">
          <button className="btn btn-accent" type="submit">
            Import
          </button>
        </div>
      </form>
    </div>
  );
}

export default FromSeed;

import React, { useContext, useEffect, useState } from "react";
import {
  ACCOUNT_SCREEN,
  ADD_ASSET_SCREEN,
  IMG_WIDTH_INIT,
  LOGIN_SCREEN,
  PS_PORT,
  PS_TESTNET_URL,
  PS_TOKEN,
  SEND_ALGO_SCREEN,
} from "../../utils/configs";
import { updateUserScreen } from "../../utils/userCookies";
import { UserContext } from "../../context/userContext";
import algosdk from "algosdk";
import { showNotification } from "../../utils/notifications";
import { getSecurely } from "../../utils/secureStorage";
import { useForm } from "react-hook-form";

function AddAsset() {
  const user = useContext(UserContext);
  //const [assetId, setAssetId] = useState(0);
  const goToMain = () => {
    user.setUserStep(ACCOUNT_SCREEN);
    updateUserScreen(ACCOUNT_SCREEN);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    try {
      updateUserScreen(ADD_ASSET_SCREEN);
    } catch (error) {
      user.setUserStep(LOGIN_SCREEN);
    }
    user.setImageWidth(IMG_WIDTH_INIT);
  }, []);

  const optin = async (data) => {
    let assetId = parseInt(data.asset);
    let address = getSecurely(
      "address",
      process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
    );
    showNotification(
      `Opting in to ${assetId}!`,
      "You transaction is being submitted!."
    );
    try {
      const algodclient = new algosdk.Algodv2(
        PS_TOKEN(process.env.REACT_APP_PURESTAKE_API_KEY),
        PS_TESTNET_URL,
        PS_PORT
      );
      let params = await algodclient.getTransactionParams().do();
      // Send 0 amount to the same address from same address to optin to that asset
      let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        address,
        address,
        undefined,
        undefined,
        0,
        undefined,
        assetId,
        params
      );

      let rawSignedTxn = opttxn.signTxn(
        algosdk.mnemonicToSecretKey(
          getSecurely(
            "mnemonic",
            process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
          )
        ).sk
      );
      let opttx = await algodclient.sendRawTransaction(rawSignedTxn).do();
      // Wait for confirmation
      await algosdk.waitForConfirmation(algodclient, opttx.txId, 4);
      showNotification(
        "Asset added Successfully!",
        `You have successfull Opted-in to ${assetId}`
      );
      user.setTxconfirmed(!user.txconfirmed);
      goToMain();
    } catch (e) {
      if (e.message.includes("does not exist or has been deleted")) {
        showNotification("Opt-in Failed!", "Wrong Asset Id.");
      } else {
        showNotification("Opt-in Failed!", "There was an error opting in.");
      }
    }
  };
  return (
    <div className="m-4 flex flex-col bg-base-200 h-screen items-center justify-center">
      <div className="absolute top-28 left-8 drop-shadow-lg">
        <button
          className="btn btn-circle btn-accent"
          onClick={() => {
            goToMain();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit(optin)}>
          <label className="label">
            <span className="label-text">Asset you want to Opt-in to</span>
          </label>
          <div className="flex flex-col">
            <input
              type="text"
              className="input input-ghost border-b-2 border-0 border-b-accent-focus bg-base h-8"
              {...register("asset", { required: true })}
            ></input>
            {errors.asset?.type === "required" && (
              <span className="text-xs text-red-700">
                Asset cannot be empty
              </span>
            )}
          </div>
          <div className="mt-5 flex justify-center">
            <button type="submit" className="btn btn-accent">
              Opt-in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAsset;

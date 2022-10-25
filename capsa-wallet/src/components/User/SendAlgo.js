import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/userContext";
import algosdk from "algosdk";
import {
  ACCOUNT_SCREEN,
  IMG_WIDTH_INIT,
  LOGIN_SCREEN,
  PS_PORT,
  PS_TESTNET_URL,
  PS_TOKEN,
  SEND_ALGO_SCREEN,
} from "../../utils/configs";
import { checkPass, getSecurely } from "../../utils/secureStorage";
import { updateUserScreen } from "../../utils/userCookies";
import { showNotification } from "../../utils/notifications";

function SendAlgo(props) {
  const user = useContext(UserContext);
  const [sendView, setSendView] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    try {
      updateUserScreen(SEND_ALGO_SCREEN);
    } catch (error) {
      user.setUserStep(LOGIN_SCREEN);
    }
    user.setImageWidth(IMG_WIDTH_INIT);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm();

  const goToMain = () => {
    user.setUserStep(ACCOUNT_SCREEN);
    updateUserScreen(ACCOUNT_SCREEN);
  };
  const maxExpendable = async () => {
    const algodclient = new algosdk.Algodv2(
      PS_TOKEN(process.env.REACT_APP_PURESTAKE_API_KEY),
      PS_TESTNET_URL,
      PS_PORT
    );
    const data = await algodclient
      .accountInformation(
        getSecurely(
          "address",
          process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
        )
      )
      .do();
    setAmount(
      algosdk.microalgosToAlgos(data.amount - algosdk.ALGORAND_MIN_TX_FEE)
    );
  };
  useEffect(() => {
    maxExpendable();
  }, []);

  const onSubmit = (data) => {
    if (data.receiver.length !== 58) {
      setError("receiver", { type: "mismatch" });
    } else if (getValues.amount <= amount) {
      setError("amount", { type: "mismatch" });
    } else {
      setSendView(true);
    }
  };

  const onSubmitPass = (data) => {
    if (
      checkPass(
        data.password,
        process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
      )
    ) {
      // send tx
      sendTx();
      goToMain();
    } else {
      setError("password", { type: "mismatch" });
    }
  };

  const sendTx = async () => {
    showNotification("Sending Algo!", "You transaction is being submitted!.");
    const algodclient = new algosdk.Algodv2(
      PS_TOKEN(process.env.REACT_APP_PURESTAKE_API_KEY),
      PS_TESTNET_URL,
      PS_PORT
    );
    let params = await algodclient.getTransactionParams().do();

    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;

    const receiver = getValues().receiver;
    const enc = new TextEncoder();
    const note = enc.encode("Sending a test tx");
    let amount = algosdk.algosToMicroalgos(getValues().amount);
    let sender = user.address;

    try {
      let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: receiver,
        amount: amount,
        note: note,
        suggestedParams: params,
      });

      // Sign the transaction

      let signedTxn = txn.signTxn(
        algosdk.mnemonicToSecretKey(
          getSecurely(
            "mnemonic",
            process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
          )
        ).sk
      );
      let txId = txn.txID().toString();
      //console.log("Signed transaction with txID: %s", txId);

      // Submit the transaction

      await algodclient.sendRawTransaction(signedTxn).do();

      let confirmedTxn = await algosdk.waitForConfirmation(
        algodclient,
        txId,
        4
      );
      //Get the completed Transaction
      // console.log(
      //   "Transaction " +
      //     txId +
      //     " confirmed in round " +
      //     confirmedTxn["confirmed-round"]
      // );
      showNotification(
        "Transaction Success!",
        `You have successfull sent ${getValues().amount} to ${
          getValues().receiver
        }. Transaction Id: ${txId}`
      );
    } catch (error) {
      // if the account amount is insufficient
      if (error.message.includes("overspend")) {
        showNotification(
          "Transaction Failed!",
          "You don't have enough Algos to send."
        );
      } else if (error.message.includes("address seems to be malformed")) {
        showNotification("Transaction Failed!", "You Algos weren't sent.");
      }
    }
    user.setTxconfirmed(!user.txconfirmed);

    // let mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
    // console.log("Transaction information: %o", mytxinfo);
    //let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
  };
  const maxAlgos = () => {
    setValue("amount", amount);
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
      {!sendView ? (
        <>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="label">
                  <span className="label-text">Receiver Address:</span>
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="input input-ghost border-b-2 border-0 border-b-accent-focus bg-base h-8"
                    {...register("receiver", { required: true })}
                  ></input>
                  {errors.receiver?.type === "required" && (
                    <span className="text-xs text-red-700">
                      Receiver cannot be empty
                    </span>
                  )}
                  {errors.receiver?.type === "mismatch" && (
                    <span className="text-xs text-red-700">
                      This is not a valid Algorand address
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-8">
                <label className="label">
                  <span className="label-text">Amount to Send:</span>
                  <button
                    type="button"
                    className="label-text-alt btn-xs btn-accent rounded-xl text-accent-content w-12"
                    onClick={maxAlgos}
                  >
                    max
                  </button>
                </label>
                <div className="flex flex-col">
                  <input
                    type="number"
                    step="any"
                    className="input input-ghost border-b-2 border-0 border-b-accent-focus bg-base h-8"
                    {...register("amount", { required: true })}
                  ></input>
                  {errors.amount?.type === "required" && (
                    <span className="text-xs text-red-700">
                      Amount cannot be empty
                    </span>
                  )}
                  {errors.amount?.type === "mismatch" && (
                    <span className="text-xs text-red-700">
                      You don't have enough Algos
                    </span>
                  )}
                </div>
              </div>
              <div className="justify-end flex mt-6">
                <button type="submit" className="btn btn-accent">
                  Next
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="w-full">
          <div className="flex-col justify-center text-sm flex">
            <span className="italic font-semibold text-center ">
              You are sending {getValues().amount} Algos to{" "}
            </span>
            <span className="text-warning text-center">{`${getValues().receiver.slice(
              0,
              30
            )} ${getValues().receiver.slice(30)}`}</span>
          </div>
          <div className="m-5 mt-14 flex flex-col justify-center">
            <span className="text-xs">
              Confirm and Send by authenticating with your password
            </span>
            <div className="m-3">
              <form
                onSubmit={handleSubmit(onSubmitPass)}
                className="flex flex-col justify-center "
              >
                <input
                  type="password"
                  placeholder="Enter your wallet password"
                  {...register("password", { required: true })}
                  className="input"
                ></input>
                {errors.password?.type === "required" && (
                  <span className="text-xs text-red-700">
                    Password cannot be empty
                  </span>
                )}
                {errors.password?.type === "mismatch" && (
                  <span className="text-xs text-red-700">
                    Incorrect Password
                  </span>
                )}
                <button className="btn btn-accent mt-5">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SendAlgo;

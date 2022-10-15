import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getSecurely } from "../utils/secureStorage";
import { HashLoader } from "react-spinners";
import algosdk from "algosdk";
import {
  IMG_WIDTH_LOGGED,
  PS_PORT,
  PS_TESTNET_URL,
  PS_TOKEN,
} from "../utils/configs";
import truncateAddress from "../utils/addressUtils";
import { ASSETS_IMG_SIZE } from "../utils/configs";

function HomeView() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [algoPrice, setAlgoPrice] = useState(0);

  useEffect(() => {
    user.setImageWidth(IMG_WIDTH_LOGGED);
    const algodclient = new algosdk.Algodv2(
      PS_TOKEN(process.env.REACT_APP_PURESTAKE_API_KEY),
      PS_TESTNET_URL,
      PS_PORT
    );

    let accountInfoFunc = async () => {
      const data = await algodclient
        .accountInformation(
          getSecurely("address", process.env.REACT_APP_SERVER_HASH_KEY)
        )
        .do();

      setAccountInfo(data);
      setLoading(false);
    };
    accountInfoFunc().catch(console.error);
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=algorand&vs_currencies=usd"
    )
      .then((res) => res.json())
      .then((data) => {
        setAlgoPrice(data.algorand.usd);
      })
      .catch(console.error);
  }, []);

  const user = useContext(UserContext);

  const sendAlgo = () => {
    console.log("send");
  };
  const receiveAlgo = () => {
    console.log("receive");
  };
  const swapAlgo = () => {
    console.log("swap");
  };
  const addAssets = () => {
    console.log("addAssets");
  };
  return (
    <div>
      {loading ? (
        <div className="absolute left-44 top-52">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-center">
            <div className="tooltip m-2 " data-tip="click to copy">
              <span
                className="text-xs p-2 rounded-2xl shadow-lg shadow-gray-700 font-bold bg-accent-focus text-accent-content cursor-pointer hover:bg-accent"
                onClick={() => {
                  navigator.clipboard.writeText(accountInfo.address);
                }}
              >
                {truncateAddress(accountInfo.address)}
              </span>
            </div>
          </div>
          <div className="bg-base-200 rounded-xl m-5">
            <div className="flex justify-center items-center">
              <svg
                height={ASSETS_IMG_SIZE + 20}
                width={ASSETS_IMG_SIZE + 20}
                className="-ml-8"
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 650 650"
              >
                <defs></defs>
                <title>ALGO_Logo</title>
                <g id="lINT7W">
                  <polygon
                    className="fill-accent-content"
                    points="444.18 444.32 406.81 444.32 382.54 354.04 330.36 444.33 288.64 444.33 369.29 304.57 356.31 256.05 247.56 444.36 205.82 444.36 343.64 205.64 380.18 205.64 396.18 264.95 433.88 264.95 408.14 309.71 444.18 444.32"
                  />
                </g>
              </svg>
              <span className="font-bold text-3xl -ml-3">
                {algosdk.microalgosToAlgos(accountInfo.amount)}
              </span>
            </div>
            <div className="w-full flex pb-2 -mt-4 justify-center">
              <span className="text-center text-sm">
                {(
                  algoPrice * algosdk.microalgosToAlgos(accountInfo.amount)
                ).toFixed(2)}{" "}
                USD
              </span>
            </div>

            <div className="flex justify-between mt-2 pb-4">
              <div
                className="ml-16 p-2 rounded-3xl bg-accent-focus tooltip m-2 "
                data-tip="Receive"
                onClick={receiveAlgo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-accent-content cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
                  />
                </svg>
              </div>
              <div
                className="p-2 rounded-3xl bg-accent-focus tooltip m-2 "
                data-tip="Send"
                onClick={sendAlgo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-accent-content cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </div>
              <div
                className="mr-16 p-2 rounded-3xl bg-accent-focus tooltip m-2 "
                data-tip="Swap"
                onClick={swapAlgo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-accent-content cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center text-center m-14">
            <span className="pb-4 font-bold">
              You have not added any Assets yet!
            </span>
            <div className="">
              <button
                className="btn btn-accent rounded-3xl"
                onClick={addAssets}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add Asset
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomeView;

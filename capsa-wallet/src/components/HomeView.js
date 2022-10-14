import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getSecurely } from "../utils/secureStorage";
import { HashLoader } from "react-spinners";
import algosdk from "algosdk";
import { PS_PORT, PS_TESTNET_URL, PS_TOKEN } from "../utils/configs";
import truncateAddress from "../utils/addressUtils";
import { ASSETS_IMG_SIZE } from "../utils/configs";

function HomeView() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [algoPrice, setAlgoPrice] = useState(0);
  useEffect(() => {
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
                className="text-xs p-2 rounded-2xl font-bold bg-accent-focus text-accent-content focus: cursor-pointer"
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
          </div>
        </>
      )}
    </div>
  );
}

export default HomeView;

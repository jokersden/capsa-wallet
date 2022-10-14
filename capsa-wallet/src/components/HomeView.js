import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getSecurely } from "../utils/secureStorage";
import algosdk from "algosdk";
import { PS_PORT, PS_TESTNET_URL, PS_TOKEN } from "../utils/configs";

function HomeView() {
  const [accountInfo, setAccountInfo] = useState(null);
  useEffect(() => {
    const algodclient = new algosdk.Algodv2(
      PS_TOKEN(process.env.REACT_APP_PURESTAKE_API_KEY),
      PS_TESTNET_URL,
      PS_PORT
    );

    //Check your balance
    let accountInfoFunc = async () => {
      const data = await algodclient
        .accountInformation(getSecurely("address", process.env.REACT_APP_SERVER_HASH_KEY))
        .do();
      //const json = await data.json();
      setAccountInfo(data);
    };
    accountInfoFunc().catch(console.error);
    //console.log("Account balance: %d microAlgos", accountInfo);
  }, []);

  const user = useContext(UserContext);
  return (
    <div>
      {getSecurely("address")}
      {JSON.stringify(accountInfo)}
    </div>
  );
}

export default HomeView;

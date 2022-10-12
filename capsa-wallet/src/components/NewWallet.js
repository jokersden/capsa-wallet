import React, { useEffect, useState, useContext } from "react";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../context/userContext";
import { PropagateLoader } from "react-spinners";

function NewWallet() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);
  const [test, setTest] = useState(0);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/create_account")
      .then((res) => res.json())
      .then((data) => {
        secureLocalStorage.setItem("pk", data.pk);
        secureLocalStorage.setItem("address", data.address);
        setData(data.mnemonic);
        user.setAddress(data.address);
        setLoading(false);
      });
  }, [test]);

  return (
    <div className="m-4 flex flex-col bg-base-200 h-screen items-start">
      {loading ? (
        <div class="flex justify-center items-center">
          <div className="absolute left-48 top-72">
            <PropagateLoader color="#36d7b7" />
          </div>
        </div>
      ) : (
        <>
          <div className="m-4 border border-gray-400 rounded-md">
            {data.split(" ").map((word) => {
              return <span className="badge text-lg m-2">{word}</span>;
            })}
          </div>
          <div className="m-4 text-center">
            <span className="font-bold italic text-center">
              Please store your secret pharse in a secure place and then click
              proceed.
            </span>
          </div>
          <div className="flex justify-center w-full mt-20">
            <button className="btn btn-accent">Proceed</button>
          </div>
        </>
      )}
    </div>
  );
}
//http://127.0.0.1:8000
export default NewWallet;

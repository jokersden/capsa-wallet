import React, { useEffect, useState, useContext } from "react";
//import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../context/userContext";
import { PropagateLoader } from "react-spinners";
import { saveSecurely, getSecurely } from "../utils/secureStorage";

function NewWallet() {
  //const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);
  const [test, setTest] = useState(0);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/create_account")
      .then((res) => res.json())
      .then((data) => {
        saveSecurely(data.pk, "pk");
        saveSecurely(data.address, "address");
        saveSecurely(data.mnemonic, "mnemonic");
        user.setAddress(data.address);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        //setLoading(false);
        //console.log(err);
      });
  }, [test]);

  return (
    <div className="m-4 flex flex-col bg-base-200 h-screen items-start">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="absolute left-48 top-72">
            <PropagateLoader color="#36d7b7" />
          </div>
        </div>
      ) : (
        <>
          <div className="m-4 border border-gray-400 rounded-md">
            {getSecurely("mnemonic")
              .split(" ")
              .map((word) => {
                return <span className="badge text-lg m-2">{word}</span>;
              })}
          </div>
          <div className="m-4 text-center">
            <span className="font-bold italic text-center">
              Please store your secret pharse in a secure place and then click
              proceed.
            </span>
          </div>
          <div className="flex justify-center w-full mt-5 mb-3">
            <button
              className="btn btn-accent"
              onClick={() => user.setUserStep(3)}
            >
              Proceed
            </button>
          </div>
        </>
      )}
      {error ? (
        <div className="flex justify-center items-center">
          <div className="m-4 text-center absolute left-8 top-80">
            <span className="font-bold italic text-center">
              There was an error creating an account.
            </span>
            <div className="mt-8 w-full justify-center flex">
              <button
                onClick={() => user.setUserStep(0)}
                className="btn btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <span className="ml-2">Back home</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
//http://127.0.0.1:8000
export default NewWallet;

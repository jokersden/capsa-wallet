import React, { useState, useContext, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../context/userContext";

function ConfirmSeed() {
  const user = useContext(UserContext);
  useEffect(() => {
    secureLocalStorage.setItem("password", "whatisthis");
    console.log(secureLocalStorage.getItem("password"));
  }, []);

  return (
    <>
      test
      <div className="m-4 border border-gray-400 rounded-md">
        {secureLocalStorage.getItem("password")}
      </div>
      <div className="m-4 text-center">
        <span className="font-bold italic text-center">
          Please store your secret pharse in a secure place and then click
          proceed.
        </span>
      </div>
      <div className="flex justify-center w-full mt-20">
        <button className="btn btn-accent" onClick={() => user.setUserStep(3)}>
          Proceed
        </button>
      </div>
    </>
  );
}

export default ConfirmSeed;

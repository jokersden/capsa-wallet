import React, { useEffect, useContext } from "react";

import { UserContext } from "../../context/userContext";
import {
  ACCOUNT_SCREEN,
  AUTH_EXPIRY_TIME,
  IMG_WIDTH_INIT,
  LOGIN_SCREEN,
  SEND_ALGO_SCREEN,
} from "../../utils/configs";
import { updateUserScreen } from "../../utils/userCookies";

function SendAlgo(props) {
  const user = useContext(UserContext);

  useEffect(() => {
    try {
      updateUserScreen(SEND_ALGO_SCREEN);
    } catch (error) {
      user.setUserStep(LOGIN_SCREEN);
    }
    user.setImageWidth(IMG_WIDTH_INIT);
  }, []);

  return (
    <div className="m-4 flex flex-col bg-base-200 h-screen items-center justify-center">
      <div className="absolute top-28 left-8 drop-shadow-lg">
        <button
          className="btn btn-circle btn-accent"
          onClick={() => {
            user.setUserStep(ACCOUNT_SCREEN);
            updateUserScreen(ACCOUNT_SCREEN);
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
        <form>
          <div>
            <label className="label">
              <span className="label-text">Receiver Address:</span>
            </label>
            <input
              type="text"
              className="input input-ghost border-b-2 border-0 border-b-accent-focus bg-base h-8"
            ></input>
          </div>
          <div className="mt-8">
            <label className="label">
              <span className="label-text">Amount to Send:</span>
              <button
                className="label-text-alt btn-xs btn-accent rounded-xl text-accent-content w-12"
                onClick={() => {}}
              >
                max
              </button>
            </label>
            <input
              type="text"
              className="input input-ghost border-b-2 border-0 border-b-accent-focus bg-base h-8"
            ></input>
          </div>
          <div className="justify-end flex mt-6">
            <button type="submit" className="btn btn-accent">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendAlgo;

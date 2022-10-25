import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { IMG_WIDTH_INIT } from "../utils/configs";
import { removeUserFromStorage } from "../utils/secureStorage";
import { deleteCookies } from "../utils/userCookies";

function Settings() {
  const user = useContext(UserContext);
  const deleteAccount = () => {
    user.setIsLogged(false);
    user.setImageWidth(IMG_WIDTH_INIT);
    deleteCookies("authenticated_user");
    user.setAddress(null);
    removeUserFromStorage();
    window.location.reload();
  };
  const onChange = (newValue) => {
    new Notification("Hi there!");
    console.log(Notification.permission);
    if (newValue) {
      Notification.requestPermission();
    } else {
    }
  };
  return (
    <div className="m-4 flex justify-center bg-base-200 h-screen items-center">
      <div className="absolute top-40 left-10">
        <button
          className="btn btn-circle btn-accent"
          onClick={() => window.location.reload()}
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col w-2/3">
        <label>Network</label>
        <select
          className="select select-bordered select-sm w-full max-w-xs mt-2"
          defaultValue={"TestNet"}
        >
          <option>TestNet</option>
          <option disabled>MainNet (Coming Soon)</option>
        </select>
        <div className="form-control mt-4">
          <label className="label cursor-pointer">
            <span className="label-text">Notifactions</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              onChange={(e) => onChange(e.target.checked)}
            />
          </label>
        </div>
        {user.isLogged && (
          <label
            htmlFor="delet-account-modal"
            className="btn btn-outline border-red-500 text-red-500 mt-16 modal-button"
          >
            Remove Account
          </label>
        )}
      </div>
      <input
        type="checkbox"
        id="delet-account-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to remove your Account?
          </h3>
          <p className="py-4">
            This action cannot be undone. Make sure you've backed up your seed
            phrase, if you want to import this account again to a compatible
            wallet.
          </p>
          <div className="modal-action">
            <label htmlFor="delet-account-modal" className="btn">
              Cancel
            </label>
            <label
              htmlFor="delet-account-modal"
              className="btn btn-error"
              onClick={deleteAccount}
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

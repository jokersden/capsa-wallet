import { useEffect, useState } from "react";
import { getSecurely, hashAPhrase } from "./utils/secureStorage";
import { themeChange } from "theme-change";
import ConfirmSeed from "./components/ConfirmSeed";
import LoginView from "./components/LoginView";
import NewUser from "./components/NewUser";
import NewWallet from "./components/NewWallet";
import HomeView from "./components/HomeView";
import FromSeed from "./components/FromSeed";
import { UserContext } from "./context/userContext";
import {
  IMG_WIDTH_INIT,
  LOGIN_SCREEN,
  ACCOUNT_SCREEN,
  CONFIRM_SEED_SCREEN,
  FROM_SEED_SCREEN,
  NEW_PASSWORD_SCREEN,
  NEW_WALLET_SEED_SCREEN,
  PASSWORD_FROM_SEED_SCREEN,
  SEND_ALGO_SCREEN,
  SETTINGS_SCREEN,
  IMG_WIDTH_LOGGED,
  ADD_ASSET_SCREEN,
} from "./utils/configs";
import SendAlgo from "./components/User/SendAlgo";
import { getUserCookie, deleteCookies } from "./utils/userCookies";
import Settings from "./components/Settings";
import AddAsset from "./components/User/AddAsset";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [address, setAddress] = useState("");
  const [userStep, setUserStep] = useState(LOGIN_SCREEN);
  const [hasWallet, setHasWallet] = useState(false);
  const [imgWidth, setImageWidth] = useState(IMG_WIDTH_INIT);
  const [network, setNetwork] = useState(localStorage.getItem("network"));
  const [txconfirmed, setTxconfirmed] = useState(false);

  const user = {
    address,
    setAddress,
    isLogged,
    setIsLogged,
    userStep,
    setUserStep,
    hasWallet,
    setHasWallet,
    setImageWidth,
    txconfirmed,
    setTxconfirmed,
  };

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    themeChange(false);
    if (
      getSecurely(
        "address",
        process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
      )
    ) {
      setHasWallet(true);
    }
    if (localStorage.getItem("network") === null) {
      setNetwork("TestNet");
    }
    try {
      let initStep = localStorage.getItem("userStep");
      setUserStep(parseInt(initStep));
      // To stop authentication by adding the cookie manually.
      var authCookie = getUserCookie();
      if (
        authCookie.secret_phrase.toString() ===
        hashAPhrase(
          authCookie.at,
          process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
        ).toString()
      ) {
        setUserStep(authCookie.view);
        setIsLogged(true);
        setImageWidth(IMG_WIDTH_LOGGED);
      }
    } catch (error) {}
  }, []);

  const logout = () => {
    setIsLogged(false);
    setImageWidth(IMG_WIDTH_INIT);
    deleteCookies("authenticated_user");
    setUserStep(LOGIN_SCREEN);
  };

  const renderSwitch = (step) => {
    switch (step) {
      case LOGIN_SCREEN:
        return <LoginView />;
      case NEW_PASSWORD_SCREEN:
        return <NewUser />;
      case NEW_WALLET_SEED_SCREEN:
        return <NewWallet />;
      case CONFIRM_SEED_SCREEN:
        return <ConfirmSeed />;
      case FROM_SEED_SCREEN:
        return <FromSeed />;
      case PASSWORD_FROM_SEED_SCREEN:
        return <NewUser />;
      case ACCOUNT_SCREEN:
        return <HomeView />;
      case SEND_ALGO_SCREEN:
        return <SendAlgo />;
      case SETTINGS_SCREEN:
        return <Settings />;
      case ADD_ASSET_SCREEN:
        return <AddAsset />;
      default:
        return <LoginView />;
    }
  };

  return (
    <UserContext.Provider value={user}>
      <div className="w-400 flex flex-col h-full">
        <div className="flex justify-between">
          <div className="justify-start flex">
            <input
              type="checkbox"
              className="toggle mt-2 ml-2"
              data-toggle-theme="dark,cupcake"
              data-act-class="ACTIVECLASS"
            ></input>
          </div>
          <div className="mt-2 mr-2 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={refreshPage}
              className="w-6 h-6 mr-2 hover:cursor-pointer "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>

            <div className="dropdown dropdown-end">
              <label tabIndex="0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={() => setUserStep(SETTINGS_SCREEN)}>
                  <a>Settings</a>
                </li>
                {isLogged && (
                  <li onClick={logout}>
                    <a>Logout</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/logo_transparent.png"
            width={imgWidth}
            alt="Logo of Capsa wallet"
          ></img>
        </div>
        {renderSwitch(userStep)}
        <footer className="footer justify-between flex bg-base-100 mb-1 sticky">
          <span className="ml-2 text-[10px] font-mono text-info">
            {network}
          </span>
          <span className="mr-2 text-[10px] font-mono text-info">
            {process.env.REACT_APP_VERSION}
          </span>
        </footer>
      </div>
    </UserContext.Provider>
  );
}

export default App;

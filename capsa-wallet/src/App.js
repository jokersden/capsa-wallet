import { useEffect, useState } from "react";
import { getSecurely } from "./utils/secureStorage";
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
} from "./utils/configs";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [address, setAddress] = useState("");
  const [userStep, setUserStep] = useState(LOGIN_SCREEN);
  const [hasWallet, setHasWallet] = useState(false);
  const [imgWidth, setImageWidth] = useState(IMG_WIDTH_INIT);

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
  };

  useEffect(() => {
    themeChange(false);
    if (getSecurely("address", process.env.REACT_APP_SERVER_HASH_KEY)) {
      setHasWallet(true);
    }
    try {
      let initStep = localStorage.getItem("userStep");
      setUserStep(parseInt(initStep));
    } catch (error) {}
  }, []);

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

      default:
        return <LoginView />;
    }
  };

  return (
    <UserContext.Provider value={user}>
      <div className="w-400 flex flex-col h-full">
        <input
          type="checkbox"
          className="toggle mt-2 ml-2"
          data-toggle-theme="dark,cupcake"
          data-act-class="ACTIVECLASS"
        ></input>
        <div className="flex justify-center">
          <img
            src="/logo_transparent.png"
            width={imgWidth}
            alt="Logo of Capsa wallet"
          ></img>
        </div>
        {renderSwitch(userStep)}
      </div>
    </UserContext.Provider>
  );
}

export default App;

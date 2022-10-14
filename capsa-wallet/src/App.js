import { useEffect, useState } from "react";
import { getSecurely } from "./utils/secureStorage";
import { themeChange } from "theme-change";
import ConfirmSeed from "./components/ConfirmSeed";
import LoginView from "./components/LoginView";
import NewUser from "./components/NewUser";
import NewWallet from "./components/NewWallet";
import HomeView from "./components/HomeView";
import { UserContext } from "./context/userContext";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [address, setAddress] = useState("");
  const [userStep, setUserStep] = useState(0);
  const [hasWallet, setHasWallet] = useState(false);

  const user = {
    address,
    setAddress,
    isLogged,
    setIsLogged,
    userStep,
    setUserStep,
    hasWallet,
    setHasWallet,
  };

  useEffect(() => {
    themeChange(false);
    if (getSecurely("address")) {
      setHasWallet(true);
    }
  }, []);

  const renderSwitch = (step) => {
    switch (step) {
      case 0:
        return <LoginView />;
      case 1:
        return <NewUser />;
      case 2:
        return <NewWallet />;
      case 3:
        return <ConfirmSeed />;
      case 4:
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
            width={80}
            alt="Logo of Capsa wallet"
          ></img>
        </div>
        {renderSwitch(userStep)}
      </div>
    </UserContext.Provider>
  );
}

export default App;

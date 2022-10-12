import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import HomeView from "./components/HomeView";
import NewUser from "./components/NewUser";
import NewWallet from "./components/NewWallet";
import { UserContext } from "./context/userContext";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [address, setAddress] = useState("");
  const [userStep, setUserStep] = useState(2);

  const user = {
    address,
    setAddress,
    isLogged,
    setIsLogged,
    userStep,
    setUserStep,
  };

  useEffect(() => {
    themeChange(false);
  }, []);

  const renderSwitch = (step) => {
    switch (step) {
      case 0:
        return <HomeView />;
      case 1:
        return <NewUser />;
      case 2:
        return <NewWallet />;
      default:
        break;
    }
  };

  return (
    <UserContext.Provider value={user}>
      <div className="w-400 flex flex-col h-full">
        <input
          type="checkbox"
          //data-choose-theme
          className="toggle mt-2 ml-2"
          data-toggle-theme="dark,light"
          data-act-class="ACTIVECLASS"
          //checked
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

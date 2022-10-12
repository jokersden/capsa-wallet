import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import secureLocalStorage from "react-secure-storage";

function App() {
  const [password, setPassword] = useState("");
  useEffect(() => {
    themeChange(false);
    let value = secureLocalStorage.getItem("password");
    console.log(value);
    // 👆 false parameter is required for react project
  }, []);

  const signin = (e) => {
    e.preventDefault();
    secureLocalStorage.setItem("password", password);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="w-400 flex flex-col h-full">
      <input
        type="checkbox"
        //data-choose-theme
        className="toggle mt-2 ml-2"
        data-toggle-theme="dark,cupcake"
        data-act-class="ACTIVECLASS"
        //checked
      ></input>
      <div className="flex justify-center">
        <img
          src="https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png"
          width={60}
          alt="Logo of Capsa wallet"
        ></img>
      </div>
      <div className="m-4 flex justify-center bg-base-200 h-screen items-center w-full">
        <div className="flex flex-col w-2/3">
          <form onSubmit={signin}>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={updatePassword}
              className="input input-md input-ghost w-full max-w-xs border-x-0 border-t-0 border-b border-gray-400"
            />
            <div className="w-full flex justify-center my-4">
              <button type="submit" className="btn btn-sm glass">
                Sign-In
              </button>
            </div>
          </form>
          <div className="m-5 flex flex-col items-center">
            <button className="btn btn-active btn-link btn-xs">
              Create a New Wallet
            </button>
            <span>OR</span>
            <button className="btn btn-active btn-link btn-xs">
              Import an Exsisting Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

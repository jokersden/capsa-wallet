import { createContext } from "react";

export const user = {
  address: "",
  setAddress: (address) => {},
  isLogged: true,
  setIsLogged: (status) => {},
  userStep: 0,
  setUserStep: (step) => {},
};

export const UserContext = createContext(user);

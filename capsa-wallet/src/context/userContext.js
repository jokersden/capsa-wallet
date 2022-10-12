import { createContext } from "react";

export const user = {
  address: "",
  setAddress: (address) => {},
  isLogged: true,
  setIsLogged: (status) => {},
};

export const UserContext = createContext(user);

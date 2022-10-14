import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { getSecurely } from "../utils/secureStorage";

function HomeView() {
  const user = useContext(UserContext);
  return <div>{getSecurely("address")}</div>;
}

export default HomeView;

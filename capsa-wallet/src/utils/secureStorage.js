import sha256 from "crypto-js/sha256";
import { AES, enc } from "crypto-js";

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const hashPass = (pass) => {
  return sha256(process.env.REACT_APP_SERVER_HASH_KEY + pass);
};

export const savePassword = (pass) => {
  let p_hash = hashPass(pass);
  saveToLocalStorage("password", p_hash);
};

export const checkPass = (pass) => {
  return (
    hashPass(pass).toString() === localStorage.getItem("password").toString()
  );
};

export const saveSecurely = (value, stype) => {
  const secret =
    process.env.REACT_APP_SERVER_HASH_KEY + localStorage.getItem("password");
  let encypted = AES.encrypt(value, secret).toString();
  saveToLocalStorage(stype, encypted);
};

export const getSecurely = (stype) => {
  const secret =
    process.env.REACT_APP_SERVER_HASH_KEY + localStorage.getItem("password");
  try {
    let bytes = AES.decrypt(localStorage.getItem(stype), secret);
    return bytes.toString(enc.Utf8);
  } catch {
    return false;
  }
};

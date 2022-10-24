import sha256 from "crypto-js/sha256";
import { AES, enc } from "crypto-js";

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const deleteFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const removeUserFromStorage = () => {
  const keys = ["address", "pk", "mnemonic", "password"];

  keys.map((key) => deleteFromLocalStorage(key));
};

export const hashAPhrase = (phrase, secret_key) => {
  return sha256(secret_key + phrase);
};

export const savePassword = (pass, secret_key) => {
  let p_hash = hashAPhrase(pass, secret_key);
  saveToLocalStorage("password", p_hash);
};

export const checkPass = (pass, secret_key) => {
  return (
    hashAPhrase(pass, secret_key).toString() ===
    localStorage.getItem("password").toString()
  );
};

export const saveSecurely = (value, stype, secret_key) => {
  const secret = secret_key + localStorage.getItem("password");
  let encypted = AES.encrypt(value, secret).toString();
  saveToLocalStorage(stype, encypted);
};

export const getSecurely = (stype, secret_key) => {
  const secret = secret_key + localStorage.getItem("password");
  try {
    let bytes = AES.decrypt(localStorage.getItem(stype), secret);
    return bytes.toString(enc.Utf8);
  } catch {
    return false;
  }
};

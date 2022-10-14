export const IMG_WIDTH_INIT = 80;
export const IMG_WIDTH_LOGGED = 40;

export const LOGIN_SCREEN = 0;
export const NEW_PASSWORD_SCREEN = 1;
export const NEW_WALLET_SEED_SCREEN = 2;
export const CONFIRM_SEED_SCREEN = 3;
export const FROM_SEED_SCREEN = 4;
export const ACCOUNT_SCREEN = 5;

export const PS_TESTNET_URL = "https://testnet-algorand.api.purestake.io/ps2";
export const PS_PORT = "";
export const PS_TOKEN = (token) => {
  return {
    "X-API-Key": token,
  };
};

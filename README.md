# Capsa Wallet

#### The Algorand Wallet for the Web.

<img src="images/logo_transparent.png" height="180"/>

<span style="color:red">*Please note that this wallet is currently in alpha and has not been gone through a proper security audit yet. It currently connected only to Algorand testnet. It's advised not to use any seed phrases from your main wallets/wallets with real assets until a proper security audit been done.*</span>


Capsa is a Chrome extension which can be used to connect to Algorand blockchain:

## Features:
- Users can create new wallets
- Import existing wallets
- Check their Algo and other asset balances on Algorand blockchain.
- Send Algo and other assets between accounts on Algornad blockchain.
- Generate a QR code to receive Algos/assets from others on Algorand blockchain.
- The wallet seed is securely encrypted with the wallet password.
- User has an added security layer when sending Algos or assets to others by authenticating with wallet passwords before sending a transaction
- Above all this wallet has Light and DARK modes!!!

## How to Install the extension
- Download the latest release from [releases](https://github.com/jokersden/capsa-wallet/releases)
- Go to the Chrome addressbar type: 
  ```chrome://extensions/```
- Enable developer mode:
  ![enable_developer_mode](images/enable_dev_mode.png)
- Drag and drop the downloaded .crx file to extensions page and click add extension.
  ![add_extension_to_chrome](images/add_to_chrome.png)

## How to use the wallet
- 
## Contributing

- Clone the repo
- change directory to capsa-wallet <br>
 ```cd capsa-wallet```
- Install dependencies <br/>
  ```npm install```
- Then run with <br/>
  ```npm start```
- Or build the project and import to Chrome (you have to enable developer mode in Chrome for this) <br/>
  ```npm run build``` 

![load to chrome](images/load_to_chrome.png)
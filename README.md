# Welcome to your Tradez test app 👋

This repository is an app that uses the Alpaca API to view information about your positions, activities (Preferences), and your Alpaca-linked account.

## Get started
   - ###   Please proceed as follows
1. Install dependencies

   ```bash
   npm install
   ```

2. Start script to charge env variable for json-server base url

   ```bash
    npm run env
   ```

3. Start Running the local server on port :3000 ( #### don't forget to free the :3000 port before ####)

   ```bash
    npm run server
   ```

4. Start the app with expo (on a new terminal)

   ```bash
    npm start
   ```

# Please to test the app don't forget to replace the alpaca api key, and secret key with appropriates ones

## Handle the project

### This project is running with a specific alpca account so make sur to change Api key, and secret Api key in the file alpacaConfig.js at the root of this project [the file](./alpacaConfig.js) or you will use my account (no money in portofilio, no activity, no... !).

#### How to config :                 
            "APCA-API-KEY-ID": {YOUR-OWN.ALPACA_API_KEY_ID},  
            "APCA-API-SECRET-KEY": {YOUR-OWN.ALPACA_API_SECRET_KEY} 

   
 
 ### The script [Node](./scripts/updateEnv.js) provides the machine's IP and sets it in an environment variable so the phone can make API calls to the JSON server on the machine automatically. You can delete the script and manually set the environment variable by following the syntax: EXPO_PUBLIC_IP_API_URL = "your_ip_address". All this in a .env file 

## Facilties


- You can run  a single command to run the project if there is no processus on the :3000 port

   ```bash
    npm run dev
   ```




## Join me if any request.

Contsct

- Gmail: maximegamo@gmail.com 

<!-- 61f36e0c-60ed-48c9-8d93-805c49c6a98e -->

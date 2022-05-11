import {apiCall} from "./apiCall";

export async function updateUserDataAfterLogin(username, apiToken){
    let userData = {
        contact: username
    }
    const walletCall = await apiCall("userWallet", apiToken, { contact: username });

    let userWallet = {
        "email": "",
        "phone_number": "",
        "user_name": "",
        "wallet_amount": 0,
        "usd_wallet_amount": 0
    };
    if (walletCall.hasOwnProperty("response") && walletCall.response)
        userWallet = walletCall.response;

    const serveCall = await apiCall("userServe", apiToken, { contact: username });
    let userServe = {
        "email": "",
        "phone_number": "",
        "user_name": "",
        "favorites": [],
        "cart": {},
        "ref_id": null,
        "temp_user_id": ""
    };
    if (serveCall.hasOwnProperty("response") && serveCall.response)
        userServe = serveCall.response;

    const addressCall = await apiCall("userAddresses", apiToken, {
        "user":{
            email: username
        }
    });

    let userAddresses = [];
    if (addressCall.hasOwnProperty("response") && addressCall.response)
        userAddresses = [...addressCall.response];

    const measurementCall = await apiCall("userMeasurements", apiToken, {
        "user":{
            email: username,
            is_guest: false,
            temp_user_id: userServe.temp_user_id
        }
    });

    let userMeasurements = {};
    if (measurementCall.hasOwnProperty("response") && measurementCall.response)
        userMeasurements = measurementCall.response;


    console.log(userData);
    console.log(userWallet);
    console.log(userServe);
    console.log(userAddresses);
    console.log(userMeasurements);

    return {
        "userData":userData,
        "userWallet":userWallet,
        "userServe":userServe,
        "userAddresses":userAddresses,
        "userMeasurements":userMeasurements
    }
}

/*
  "userAddresses": [
    {
      "name": "test",
      "lastname": "test",
      "email": "shailaja.s@algowire.com",
      "phone": 1234567890,
      "address": "abc block",
      "landmark": "",
      "country": "india",
      "zip_code": 110096,
      "state": "Delhi",
      "city": "New Delhi"
    }
  ],
  "defaultAddress": {
    "name": "test",
    "lastname": "test",
    "email": "shailaja.s@algowire.com",
    "phone": 1234567890,
    "address": "abc block",
    "landmark": "",
    "country": "india",
    "zip_code": 110096,
    "state": "Delhi",
    "city": "New Delhi"
  }
 */
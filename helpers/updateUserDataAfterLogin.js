import {apiCall} from "./apiCall";

export async function updateUserDataAfterLogin(username, apiToken, currentUserMeasurements, currentCart){
    //==================== user Data
    let userData = {
        contact: username
    }

    //==================== user Wallet
    const walletCall = await apiCall("userWallet", apiToken, { contact: username });

    let userWallet = {
        "email": "",
        "phone_number": "",
        "user_name": "",
        "wallet_amount": 0,
        "usd_wallet_amount": 0
    };
    if (walletCall.hasOwnProperty("response") && walletCall.response && walletCall.response.email)
        userWallet = walletCall.response;

    //==================== user Serve
    const serveCall = await apiCall("userServe", apiToken, { contact: username });
    let userServe = {
        "email": "",
        "phone_number": "",
        "user_name": "",
        "favorites": [],
        "cart": {},
        "ref_id": null,
        "temp_user_id": Date.now()
    };
    if (serveCall.hasOwnProperty("response") && serveCall.response && serveCall.response.email)
        userServe = serveCall.response;

    //==================== user Address
    const addressCall = await apiCall("userAddresses", apiToken, {
        "user":{
            email: username
        }
    });
    const tempId = userServe.temp_user_id || Date.now()
    const userO = {
        email: username,
        is_guest: false,
        temp_user_id: tempId
    }

    let userAddresses = [];
    if (addressCall.hasOwnProperty("response") && addressCall.response && Array.isArray(addressCall.response) )
        userAddresses = [...addressCall.response];

    // @TODO Conflict on the cart data structure.
    //==================== user Cart
    // we may have products that we need to add to user
    // there are two types of cart products tailored and not.

    let userCart = [];
    const cartCall = await apiCall("getCart", apiToken, {"user":userO});
    if (cartCall.response && Array.isArray(cartCall.response) )
        userCart = [...cartCall.response];

    //==================== user Measurement
    // we may have measurements so we need to add first.
    const measurementKeys = Object.keys(currentUserMeasurements);
    for(const key in measurementKeys){
        await apiCall("addMeasurements", apiToken, {
            "user": userO,
            "measurments":currentUserMeasurements[key]
        })
    }

    const measurementCall = await apiCall("userMeasurements", apiToken, {
        "user":userO
    });

    let userMeasurements = {};
    if (measurementCall.hasOwnProperty("response") && measurementCall.response && Object.keys(measurementCall.response).length>0)
        userMeasurements = measurementCall.response


    console.log(userData);
    console.log(userWallet);
    console.log(userServe);
    console.log(userAddresses);
    console.log(userCart);
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
import {apiCall} from "./apiCall";

export async function updateUserDataAfterLogin(username, apiToken, currentMeasurements, currentCart){
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
        userWallet = {...walletCall.response};

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
        userServe = {...serveCall.response};

    // create user Object required in other calls
    const tempId = userServe.temp_user_id || Date.now()
    const userO = {
        email: username,
        is_guest: false,
        temp_user_id: tempId
    }


    //==================== user Address
    const addressCall = await apiCall("userAddresses", apiToken, {
        "user":{
            email: username
        }
    });
    let userAddresses = [];
    if (addressCall.hasOwnProperty("response") && addressCall.response && Array.isArray(addressCall.response) )
        userAddresses = [...addressCall.response];

    // @TODO Conflict on the cart data structure.
    //==================== user Cart
    // we may have products that we need to add to user
    // first we add any measurements that may be there.
    const countCart = Object.keys(currentCart)
    for(let x=0;x<countCart;x++){
        await apiCall("addToCart", dataStore.apiToken, { user: userO, cart: currentCart[x] })
    }

    let userCart = [];
    const cartCall = await apiCall("getCart", apiToken, {"user":userO});
    if (cartCall.response && Array.isArray(cartCall.response) )
        userCart = cartCall.response.filter(item=>{return item.qty!=null})

    //==================== user Measurement
    // first we add any measurements that may be there.
    const countMeasurements = Object.keys(currentMeasurements)
    for(let x=0;x<countMeasurements;x++){
        await apiCall("addMeasurements", dataStore.apiToken, {
            "user": userO,
            "measurments": currentMeasurements[x]
        })
    }

    // then we call the measurements
    const measurementCall = await apiCall("userMeasurements", apiToken, {
        "user":userO
    });

    let userMeasurements = {};
    if (measurementCall.hasOwnProperty("response") && measurementCall.response && Object.keys(measurementCall.response).length>0)
        userMeasurements = {...measurementCall.response}

    //==================== user Measurement
    const orderHistoryCall = await apiCall("userOrderHistory", apiToken, {
        "user":{contact:username,token:apiToken}
    });
    console.log("ORDER HISTORY CALL",orderHistoryCall)
    let userOrderHistory = {};
    if (orderHistoryCall.hasOwnProperty("response") && orderHistoryCall.response && orderHistoryCall.response!="user not found"
        && Object.keys(orderHistoryCall.response).length>0)
        userOrderHistory = {...orderHistoryCall.response}

    console.log("userData",userData);
    console.log("userWallet",userWallet);
    console.log("userServe",userServe);
    console.log("userAddresses",userAddresses);
    console.log("userCart",userCart);
    console.log("userMeasurements",userMeasurements);
    console.log("userOrderHistory",userOrderHistory);

    return {
        "userData":userData,
        "userWallet":userWallet,
        "userServe":userServe,
        "userAddresses":userAddresses,
        "userCart":userCart,
        "userMeasurements":userMeasurements,
        "userOrderHistory":userOrderHistory
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
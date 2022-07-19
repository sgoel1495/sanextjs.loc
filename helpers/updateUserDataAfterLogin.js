import {apiCall} from "./apiCall";

export async function updateUserDataAfterLogin(username, apiToken, currentMeasurements, currentCart){
    //==================== user Data
    let userData = {
        contact: username
    }

    //==================== user Wallet
    const walletCall = await apiCall("userWallet", apiToken, { contact: username });

    let userWallet = {
        "WalletAmount": 0,
        "TotalCr": 0,
        "TotalDr": 0,
        "Wallet":[]
    };
    if (walletCall.user)
        userWallet = {...walletCall.user};

    //==================== user Serve
    const serveCall = await apiCall("userServe", apiToken, { contact: username });

    let userServe = {
        "email": "",
        "phone_number": "",
        "user_name": "",
        "favorites": [],
        "cart": {},
        "ref_id": null,
        "temp_user_id": null
    };
    if (serveCall.hasOwnProperty("response") && serveCall.response && serveCall.response.email) {
        userServe = {...serveCall.response};
        if(!userServe.temp_user_id || userServe.temp_user_id===""){
            userServe.temp_user_id=Date.now()
        }
    }

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

    const defaultAddressCall = await apiCall("getDefaultAddress", apiToken, {
        "user":{
            email: username
        }
    });
    let defaultAddress = null
    if(
        defaultAddressCall.hasOwnProperty("response")
        && defaultAddressCall.response.hasOwnProperty("email")
    )
        defaultAddress = defaultAddressCall.response

    // @TODO Conflict on the cart data structure.
    //==================== user Cart
    // we may have products that we need to add to user
    // first we add any measurements that may be there.
    // console.log("CURRENT CART",currentCart)
    for(let x=0;x<currentCart.length;x++){
        const newCart = currentCart[x].order
        newCart.qty = currentCart[x].qty
        // console.log("INSERTING product to cart",newCart)
        const callResult = await apiCall("addToCart", apiToken, { user: userO, cart: newCart })
        // console.log("CALL RESULT",callResult)
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
    // console.log("ORDER HISTORY CALL",orderHistoryCall)
    let userOrderHistory = {};
    if (orderHistoryCall.hasOwnProperty("response") && orderHistoryCall.response && orderHistoryCall.response!="user not found"
        && Object.keys(orderHistoryCall.response).length>0)
        userOrderHistory = {...orderHistoryCall.response}

    // console.log("userData",userData);
    // console.log("userWallet",userWallet);
    // console.log("userServe",userServe);
    // console.log("userAddresses",userAddresses);
    // console.log("userCart",userCart);
    // console.log("userMeasurements",userMeasurements);
    // console.log("userOrderHistory",userOrderHistory);

    return {
        "userData":userData,
        "userWallet":userWallet,
        "userServe":userServe,
        "userAddresses":userAddresses,
        "defaultAddress":defaultAddress,
        "userCart":userCart,
        "userMeasurements":userMeasurements,
        "userOrderHistory":userOrderHistory,
        "orderPromo": {},
        "currentOrderId": "",
        "currentOrderInCart": {
            "address": {},
            "measurement": {},
            "account": {},
            "order": {},
            "payment": {},
            "shipping_fee": 0,
            "otp_verified": false
        },
        "useWallet": false
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
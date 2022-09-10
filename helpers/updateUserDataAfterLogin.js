import {apiCall} from "./apiCall";
import {addToCart, checkItemInCart} from "./addTocart";

export async function updateUserDataAfterLogin(username, apiToken, currentMeasurements, currentCart) {
    //==================== user Serve
    const serveCall = await apiCall("userServe", apiToken, {contact: username});

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
        if (!userServe.temp_user_id || userServe.temp_user_id === "") {
            userServe.temp_user_id = Date.now()
        }
    }

    // create user Object required in other calls
    const tempId = userServe.temp_user_id || Date.now()
    const userO = {
        email: username,
        is_guest: false,
        temp_user_id: tempId
    }

    //==================== user Wallet
    const walletCall = await apiCall("userWallet", apiToken, {contact: username});

    let userWallet = {
        "WalletAmount": 0,
        "TotalCr": 0,
        "TotalDr": 0,
        "Wallet": []
    };
    if (walletCall.user)
        userWallet = {...walletCall.user};


    //==================== user Address
    const addressCall = await apiCall("userAddresses", apiToken, {
        "user": {
            email: username
        }
    });
    let userAddresses = [];
    if (addressCall.hasOwnProperty("response") && addressCall.response && Array.isArray(addressCall.response))
        userAddresses = [...addressCall.response];

    const defaultAddressCall = await apiCall("getDefaultAddress", apiToken, {
        "user": {
            email: username
        }
    });

    let defaultAddress = null
    if (
        defaultAddressCall.hasOwnProperty("response")
        && defaultAddressCall.response.hasOwnProperty("email")
    )
        defaultAddress = defaultAddressCall.response

    // @TODO Conflict on the cart data structure.
    //==================== user Cart
    // we may have products that we need to add to user
    // first we add any measurements that may be there.

    let userCart = [];
    let cartCall = await apiCall("getCart", apiToken, {"user": userO});
    if (cartCall.response && Array.isArray(cartCall.response))
        userCart = cartCall.response.filter(item => {
            return item.qty != null
        })

    for (let x = 0; x < currentCart.length; x++) {
        let apiName = "addToCart"
        let newCart = currentCart[x]
        let item = await checkItemInCart(userCart, currentCart, false)
        if (item) {
            newCart = {
                "product": {
                    "product_cart_id": item.cart_id,
                    "qty": item.qty + 1
                }
            }
            apiName = "updateCart"
        }

        const callResult = await apiCall(apiName, apiToken, {user: userO, cart: newCart})
    }

    cartCall = await apiCall("getCart", apiToken, {"user": userO});
    if (cartCall.response && Array.isArray(cartCall.response))
        userCart = cartCall.response.filter(item => {
            return item.qty != null
        })

    //==================== user Measurement
    // first we add any measurements that may be there.
    const countMeasurements = Object.keys(currentMeasurements)
    for (let x = 0; x < countMeasurements; x++) {
        await apiCall("addMeasurements", apiToken, {
            "user": userO,
            "measurments": currentMeasurements[x]
        })
    }

    // then we call the measurements
    const measurementCall = await apiCall("userMeasurements", apiToken, {
        "user": userO
    });

    let userMeasurements = {};
    if (measurementCall.hasOwnProperty("response") && measurementCall.response && Object.keys(measurementCall.response).length > 0)
        userMeasurements = {...measurementCall.response}

    let orderHistory = {}
    const orderHistoryCall = await apiCall("userOrderHistory", apiToken, {
        "user": {contact: username, token: apiToken}
    });
    if (orderHistoryCall.status === 200) {
        orderHistory = orderHistoryCall.response
    }
    return {
        "userState": {
            "userServe": userServe,
            "defaultAddress": defaultAddress,
            "userAddresses": userAddresses,
            "wallet": userWallet,
            "measurements": userMeasurements,
        },
        "shoppingCart": userCart,
        "orderHistory": orderHistory
    }
}

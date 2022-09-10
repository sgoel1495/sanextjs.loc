import {apiCall} from "./apiCall";

export async function refreshCart(userData, apiToken, setCart) {
    let user = getUserObject(userData)
    const respCart = await apiCall("getCart", apiToken, {user: user})
    if (respCart.response && Array.isArray(respCart.response)) {
        const actualCart = respCart.response.filter(item => {
            return item.qty != null
        })
        setCart(actualCart)
    }
}

export function getUserObject(userData) {
    let tempId;
    if (userData.userServe && (!userData.userServe.temp_user_id || userData.userServe.temp_user_id === "")) {
        tempId = Date.now()
        userData.userServe.temp_user_id = tempId
    } else
        tempId = userData.userServe.temp_user_id

    return {
        email: (userData.userServe.email) ? userData.userServe.email : "",
        contact: (userData.userServe.email) ? userData.userServe.email : "",
        is_guest: !(userData.userServe.email),
        temp_user_id: tempId
    }
}

export async function checkItemInCart(userCart, product, isGC) {
    let similarItems = userCart.filter(item => item.product_id === product.product_id && item.is_tailor === product.is_tailor)
    return similarItems.find((item) => {
        let flag = true
        if (isGC) {
            // let keys = ["sender_name", "sender_email", "sender_telephone", "recipient_name", "recipient_email", "recipient_telephone", "message"]

            // keys.forEach((key) => {
            //     if (item[key] !== product[key] && flag) {
            //         flag = false
            //     }
            // })
        } else {
            if (product.is_tailor) {
                if (item.measurment_id !== product.measurment_id) {
                    flag = false
                }
            } else {
                let keys = ["size", "sleeve_length", "dress_length"]
                keys.forEach((key) => {
                    if (flag && item[key] !== product[key]) {
                        flag = false
                    }
                })
            }
        }
        return flag
    })
}

export async function addToCart(userData, userCart, apiToken, setCart, cart, apiName = "addToCart") {
    let user = getUserObject(userData)

    //update payload and apiname if item already in cart
    let isGC = apiName === "addGiftToCart";
    let item = await checkItemInCart(userCart, cart[isGC ? "giftcard_details" : "cart"], isGC)
    if (item) {
        cart = {
            "product": {
                "product_cart_id": item.cart_id,
                "qty": item.qty + 1
            }
        }
        apiName = "updateCart"
    }

    const resp = await apiCall(apiName, apiToken, {user: user, ...cart})

    if ((resp.response && resp.response === "success") || (resp.msg && resp.msg === "success")) {
        await refreshCart(userData, apiToken, setCart)
        return true
    }
    return false
}

export async function updateCart(userData, apiToken, setCart, product) {
    let user = getUserObject(userData)

    product = {
        "product": {
            "product_cart_id": product.cart_id,
            "qty": product.qty
        }
    }

    const resp = await apiCall("updateCart", apiToken, {user: user, ...product})

    if ((resp.response && resp.response === "success") || (resp.msg && resp.msg === "success")) {
        await refreshCart(userData, apiToken, setCart)
    }
}

export async function removeFromCart(userData, apiToken, setCart, product) {
    let user = getUserObject(userData)
    product = {
        "product": {
            "product_cart_id": product.cart_id
        }
    }
    const resp = await apiCall("removeCart", apiToken, {user: user, ...product})

    if ((resp.response && resp.response === "success") || (resp.msg && resp.msg === "success")) {
        await refreshCart(userData, apiToken, setCart)
    }
}

export async function updateCartMeasurement(userData, apiToken, setCart, cart_id, product) {
    let user = getUserObject(userData)
    let item = {
        "product": {
            "product_cart_id": cart_id
        }
    }
    await apiCall("removeCart", apiToken, {user: user, ...item})
    const resp = await apiCall("addToCart", apiToken, {user: user, ...product})
    if ((resp.response && resp.response === "success") || (resp.msg && resp.msg === "success")) {
        await refreshCart(userData, apiToken, setCart)
    }
}
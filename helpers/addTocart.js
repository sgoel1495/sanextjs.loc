import {apiCall} from "./apiCall";

export async function refreshCart(dataStore, updateDataStore) {
    let user = getUserObject(dataStore, updateDataStore)
    const respCart = await apiCall("getCart", dataStore.apiToken, {user: user})
    if (respCart.response && Array.isArray(respCart.response)) {
        const actualCart = respCart.response.filter(item => {
            return item.qty != null
        })
        updateDataStore("userCart", actualCart)
    }
}

export function getUserObject(dataStore, updateDataStore) {
    let tempId;
    if (dataStore.userServe && (!dataStore.userServe.temp_user_id || dataStore.userServe.temp_user_id === "")) {
        tempId = Date.now()
        dataStore.userServe.temp_user_id = tempId
        updateDataStore("userServe", dataStore.userServe)
    } else
        tempId = dataStore.userServe.temp_user_id

    return {
        email: (dataStore.userData.contact) ? dataStore.userData.contact : "",
        contact: (dataStore.userData.contact) ? dataStore.userData.contact : "",
        is_guest: !(dataStore.userData.contact),
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

export async function addToCart(dataStore, updateDataStore, cart, apiName = "addToCart") {
    let user = getUserObject(dataStore, updateDataStore)

    //update payload and apiname if item already in cart
    let isGC = apiName === "addGiftToCart";
    let item = await checkItemInCart(dataStore.userCart, cart[isGC ? "giftcard_details" : "cart"], isGC)
    if (item) {
        cart = {
            "product": {
                "product_cart_id": item.cart_id,
                "qty": item.qty + 1
            }
        }
        apiName = "updateCart"
    }

    const resp = await apiCall(apiName, dataStore.apiToken, {user: user, ...cart})

    if ((resp.response && resp.response === "success") || (resp.msg && resp.msg === "success")) {
        await refreshCart(dataStore, updateDataStore)
        return true
    }
    return false
}

export async function updateCart(dataStore, updateDataStore, product) {
    let user = getUserObject(dataStore, updateDataStore)

    product = {
        "product": {
            "product_cart_id": product.cart_id,
            "qty": product.qty
        }
    }

    const resp = await apiCall("updateCart", dataStore.apiToken, {user: user, ...product})

    if ((resp.response && resp.response === "success") || (resp.msg && resp.msg === "success")) {
        await refreshCart(dataStore, updateDataStore)
    }
}

export async function removeFromCart(dataStore, updateDataStore, product) {
    let user = getUserObject(dataStore, updateDataStore)
    product = {
        "product": {
            "product_cart_id": product.cart_id
        }
    }
    const resp = await apiCall("removeCart", dataStore.apiToken, {user: user, ...product})

    if ((resp.response && resp.response === "success") || (resp.msg && resp.msg === "success")) {
        await refreshCart(dataStore, updateDataStore)
    }
}

export async function updateCartMeasurement(dataStore, updateDataStore,cart_id,product){
    let user = getUserObject(dataStore, updateDataStore)
    let item = {
        "product": {
            "product_cart_id": cart_id
        }
    }
    await apiCall("removeCart", dataStore.apiToken, {user: user, ...item})
    const resp = await apiCall("addToCart", dataStore.apiToken, {user: user, ...product})
    if ((resp.response && resp.response === "success") || (resp.msg && resp.msg === "success")) {
        await refreshCart(dataStore, updateDataStore)
    }
}
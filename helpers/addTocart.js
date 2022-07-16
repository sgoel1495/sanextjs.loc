import {apiCall} from "./apiCall";

export async function refreshCart(dataStore, updateDataStore) {
    let user = await getUserObject(dataStore, updateDataStore)
    const respCart = await apiCall("getCart", dataStore.apiToken, {user: user})
    if (respCart.response && Array.isArray(respCart.response)) {
        const actualCart = respCart.response.filter(item => {
            return item.qty != null
        })
        updateDataStore("userCart", actualCart)
    }
}

export async function getUserObject(dataStore, updateDataStore) {
    let tempId;
    if (!dataStore.userServe.temp_user_id || dataStore.userServe.temp_user_id === "") {
        tempId = Date.now()
        dataStore.userServe.temp_user_id = tempId
        updateDataStore("userServe", dataStore.userServe)
    } else
        tempId = dataStore.userServe.temp_user_id

    return {
        email: (dataStore.userData.contact) ? dataStore.userData.contact : "",
        is_guest: !(dataStore.userData.contact),
        temp_user_id: tempId
    }
}

export async function checkItemInCart(userCart, product, isGC) {
    let similarItems = userCart.filter(item => item.product_id === product.product_id)
    if (isGC) {
        return similarItems.find((item) => {
            // let keys = ["sender_name", "sender_email", "sender_telephone", "recipient_name", "recipient_email", "recipient_telephone", "message"]
            let flag = true
            // keys.forEach((key) => {
            //     if (item[key] !== product[key] && flag) {
            //         flag = false
            //     }
            // })
            return flag
        })
    } else {

    }

}

export async function addToCart(dataStore, updateDataStore, cart, apiName = "addToCart") {

    let user = await getUserObject(dataStore, updateDataStore)

    //update payload and apiname if item already in cart
    let isGC = apiName === "addGiftToCart";
    let item = await checkItemInCart(dataStore.userCart, cart[isGC ? "giftcard_details" : "cart"], apiName === "addGiftToCart")
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
    }
}

export async function updateCart(dataStore, updateDataStore, product) {
    let user = await getUserObject(dataStore, updateDataStore)

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
    let user = await getUserObject(dataStore, updateDataStore)
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
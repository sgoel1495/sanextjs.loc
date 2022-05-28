import {apiCall} from "./apiCall";

export default async function addToCartLoggedIn(apiToken, userO, cart, updateDataStore) {
    const resp = await apiCall("addToCart", apiToken, {user: userO, cart: cart})
    if (resp.response && resp.response === "success") {
        // refresh the cart
        const respCart = await apiCall("getCart", apiToken, {user: userO})
        if (respCart.response && Array.isArray(respCart.response)) {
            const actualCart = respCart.response.filter(item => {
                return item.qty != null
            })
            updateDataStore("userCart", actualCart)
        }
        const serveCall = await apiCall("userServe", apiToken, {contact: userO.email});
        if (serveCall.hasOwnProperty("response") && serveCall.response && serveCall.response.email)
            updateDataStore("userServe", {...serveCall.response})
    }
}
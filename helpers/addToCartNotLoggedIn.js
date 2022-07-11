import {apiCall} from "./apiCall"
import getUserO from "./getUserO";

export default async function addToCartNotLoggedIn (dataStore) {
    const userO = getUserO(dataStore,true)
    for(let x=0;x<dataStore.userCart.length;x++){
        const cart = dataStore.userCart[x].order
        const resp = await apiCall("addToCart", dataStore.apiToken, {user: userO, cart: cart})
        console.log("ADD TO CART RESULT", resp)
    }
}

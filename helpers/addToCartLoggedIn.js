import {apiCall} from "./apiCall";

export default async function addToCartLoggedIn(apiToken, userO, cart, updateDataStore, apiName = "addToCart") {
    const resp = await apiCall(apiName, apiToken, {user: userO, ...cart})
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

/*
Non Tailored
{
   "user" : { "email" : "",
     "is_guest" : true,
     "temp_user_id" : "1599477182"
   },
   "cart" : { "product_id" : "Tops-Colva-NotchNeckLinenTop",
       "size" : "M",
       "qty" : "1",
       "is_sale" : "false",
       "is_tailor" : "false",
       "sleeve_length" : "",
       "dress_length" : ""
   },
  "token" : "b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0"
}
 */
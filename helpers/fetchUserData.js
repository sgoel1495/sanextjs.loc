import {apiCall} from "./apiCall";

async function fetchUserData(apiToken,email){
    const resp = await apiCall("userWallet", apiToken, { contact: email });
    if (resp.hasOwnProperty("response"))
        return resp.response;
    else
        return {
            "email": "",
            "phone_number": "",
            "user_name": "",
            "wallet_amount": 0,
            "usd_wallet_amount": 0
        };
}
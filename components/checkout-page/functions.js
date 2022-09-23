import {getUserObject} from "../../helpers/addTocart";
import {apiCall} from "../../helpers/apiCall";

export const updateAddressForOrder = async (index, userData, orderData, apiToken, setOrderSummary, account = {}) => {
    const user = getUserObject(userData);
    user["address_index"] = index;
    if (!userData.userServe.email) {
        user["address"] = {0: userData.userAddresses[index]};
        user["account"] = account;
    }
    setOrderSummary({...orderData.orderSummary, "address": userData.userAddresses[index], "address_index": index})
    const queryObject = {user: user, order: {order_id: orderData.currentOrderId}};
    return await apiCall("deliveryAddress", apiToken, queryObject);
};

export const savePayment = async (isGift, giftData, payMode, useWallet, userData, orderData, apiToken, currCurrency, setOrderSummary, payWith = "") => {
    let payload = {
        "user": getUserObject(userData),
        "order": {
            "order_id": orderData.currentOrderId,
            "is_gift": isGift,
            "gift_msg": giftData.gift_msg,
            "gift_msg_to": giftData.gift_msg_to,
            "gift_msg_from": giftData.gift_msg_from,
            "is_usd": currCurrency !== "inr",
            "payment_mode": payMode,
            "payment_status": "Not Paid",
            "credited_in_account": false,
            "curr_currency": currCurrency,
            "ex_rate": 1
        },
        "payment_with": payWith
    }
    let gross = orderData.orderSummary.gross;
    if (payMode === "COD") {
        gross += 80;
    }
    if (useWallet) {
        payload['order']['is_wallet'] = true
        if (userData.wallet.WalletAmount >= gross) {
            payload['order']['cash_from_wallet'] = gross
            payload['order']['payment_mode'] = "WALLET"
        } else {
            payload['order']['cash_from_wallet'] = userData.wallet.WalletAmount
        }
    }
    let index;
    if (orderData.orderSummary.address_index >= 0 && orderData.orderSummary.address_index < userData.userAddresses.length) {
        index = orderData.orderSummary.address_index
    } else {
        index = 0;
        await updateAddressForOrder(0, userData, orderData, apiToken, setOrderSummary);
    }
    let resp = await apiCall("savePayment", apiToken, payload)
    setOrderSummary({
        ...orderData.orderSummary,
        "address": userData.userAddresses[index],
        "address_index": index,
        "payment": payload.order
    });
    return resp
}

export const saveFinalPayment = async (userData, order_id, razorpayResp, apiToken) => {
    let payload = {
        "user": getUserObject(userData),
        "order": {
            "order_id": order_id,
            "razorpay_response": razorpayResp
        },
        "payment_with": "razorpay",
    }
    return await apiCall("saveFinalPayment", apiToken, payload)
}
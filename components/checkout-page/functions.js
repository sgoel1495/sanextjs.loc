import {getUserObject} from "../../helpers/addTocart";
import {apiCall} from "../../helpers/apiCall";

export const updateAddressForOrder = async (index, dataStore, updateDataStore) => {
    const user = await getUserObject(dataStore, updateDataStore);
    user["address_index"] = index;
    if (!dataStore.userData.contact) {
        user["address"] = {0: dataStore.userAddresses[index]};
        user["account"] = dataStore.currentOrderInCart.account;
    }
    updateDataStore("orderSummary", {...dataStore.orderSummary, "address": dataStore.userAddresses[index], "address_index": index})
    const queryObject = {user: user, order: {order_id: dataStore.currentOrderId}};
    await apiCall("deliveryAddress", dataStore.apiToken, queryObject);
};

export const savePayment = async (isGift, giftData, payMode, useWallet, dataStore, updateDataStore) => {
    let payload = {
        "user": await getUserObject(dataStore, updateDataStore),
        "order": {
            "order_id": dataStore.currentOrderId,
            "is_gift": isGift,
            "gift_msg": giftData.gift_msg,
            "gift_msg_to": giftData.gift_msg_to,
            "gift_msg_from": giftData.gift_msg_from,
            "is_usd": dataStore.currCurrency !== "inr",
            "payment_mode": payMode,
            "payment_status": "Not Paid",
            "credited_in_account": false,
            "curr_currency": dataStore.currCurrency,
            "ex_rate": 1
        },
    }
    let gross = dataStore.orderSummary.gross;
    if (payMode === "COD") {
        gross += 80;
    }
    if (useWallet) {
        payload['order']['is_wallet'] = true
        if (dataStore.userWallet.WalletAmount >= gross) {
            payload['order']['cash_from_wallet'] = gross
            payload['order']['payment_mode'] = "WALLET"
        } else {
            payload['order']['cash_from_wallet'] = dataStore.userWallet.WalletAmount
        }
    }
    let index;
    if (dataStore.orderSummary.address_index >= 0 && dataStore.orderSummary.address_index < dataStore.userAddresses.length) {
        index = dataStore.orderSummary.address_index
    } else {
        index = 0;
        await updateAddressForOrder(0, dataStore, updateDataStore);
    }
    await apiCall("savePayment", dataStore.apiToken, payload)
    updateDataStore("orderSummary", {
        ...dataStore.orderSummary,
        "address": dataStore.userAddresses[index],
        "address_index": index,
        "payment": payload.order
    });
}
import currencyFormatter from "./currencyFormatter";
import promoDiscountValue from "./promoDiscountValue";
import rawOrderTotal from "./rawOrderTotal";

export default function orderTotal (dataStore) {
    let total = rawOrderTotal(dataStore)
    total -= promoDiscountValue(dataStore)
    const shippingFee = dataStore.currentOrderInCart.shipping_fee

    total += shippingFee
    const toPay = total
    if(dataStore.userWallet.WalletAmount>0 && dataStore.useWallet)
        if(total>dataStore.userWallet.WalletAmount)
            total -= dataStore.userWallet.WalletAmount
        else
            total = 0.00

    return {finalPayable:total,toPay:toPay}
}

import currencyFormatter from "./currencyFormatter";
import promoDiscountValue from "./promoDiscountValue";

export default function orderTotal (dataStore) {
    let inrTotal = 0
    let usdTotal = 0
    Object.values(dataStore.userCart).forEach(cartItem => {
        inrTotal += cartItem.price * cartItem.qty
        usdTotal += cartItem.usd_price * cartItem.qty
    })
    const shippingFee = dataStore.currentOrderInCart.shipping_fee
    return (dataStore.currCurrency === "inr")
        ? currencyFormatter("INR").format(inrTotal - promoDiscountValue(dataStore) + shippingFee)
        : currencyFormatter("USD").format(usdTotal - promoDiscountValue(dataStore) + shippingFee)
}

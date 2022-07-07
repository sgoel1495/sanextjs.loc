export default function promoDiscountValue (dataStore) {
    let returnValue = 0.00

    if( dataStore
        && dataStore.orderPromo
        && dataStore.orderPromo.discount_hash
        && dataStore.orderPromo.discount_hash.is_promocode_applied
    )
        returnValue = (dataStore.currCurrency === "inr")
            ? dataStore.orderPromo.discount_hash.discount_inr
            : dataStore.orderPromo.discount_hash.discount_usd

    return returnValue
}
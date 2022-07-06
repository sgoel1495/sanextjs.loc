export default function promoDiscountValue (datastore) {
    return (
        dataStore.orderPromo
        && dataStore.orderPromo.discount_hash
        && dataStore.orderPromo.discount_hash.is_promocode_applied
    )
        ? (dataStore.currCurrency === "inr")
            ? dataStore.orderPromo.discount_hash.discount_inr
            : dataStore.orderPromo.discount_hash.discount_usd
        : 0.00
}
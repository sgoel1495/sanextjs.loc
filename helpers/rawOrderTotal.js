export default function rawOrderTotal(dataStore){
    let inrTotal = 0
    let usdTotal = 0
    Object.values(dataStore.userCart).forEach(cartItem => {
        inrTotal += cartItem.price * cartItem.qty
        usdTotal += cartItem.usd_price * cartItem.qty
    })
    return (dataStore.currCurrency === "inr")? inrTotal:usdTotal
}
import {useContext} from "react";
import AppWideContext from "../../store/AppWideContext";

function OrderSummary () {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    const rupeeIndian = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    });
    const { dataStore } = useContext(AppWideContext);
    const firstDate = new Date()
    firstDate.setDate(firstDate.getDate()+10)
    const secondDate = new Date()
    secondDate.setDate(secondDate.getDate()+12)
    const orderTotal = ()=>{
        let inrTotal =0
        let usdTotal =0
        Object.values(dataStore.userCart).forEach(cartItem=>{
            inrTotal += cartItem.price
            usdTotal += cartItem.usd_price
        })
        return (dataStore.currCurrency==="inr")? rupeeIndian.format(inrTotal - promoDiscountValue):dollarUS.format(usdTotal - promoDiscountValue)
    }
    const total = orderTotal()
    const promoDiscountValue = (
        dataStore.orderPromo
        && dataStore.orderPromo.discount_hash
        && dataStore.orderPromo.discount_hash.is_promocode_applied
    ) ? (dataStore.currCurrency ==="inr")
        ? dataStore.orderPromo.discount_hash.discount_inr
        : dataStore.orderPromo.discount_hash.discount_usd
        : 0.00

    const promoDiscount = (dataStore.currCurrency ==="inr")
        ? rupeeIndian.format(promoDiscountValue)
        : dollarUS.format(promoDiscountValue)


    return <div>
        <div>Order Summary</div>
        <div>Estimated Delivery {monthNames[firstDate.getMonth()]} {firstDate.getDate()} - {monthNames[secondDate.getMonth()]} {secondDate.getDate()}</div>
        <hr/>
        <div>
            <span>Bag Total</span>
            <span>{total}</span>
        </div>
        <div>
            <span>Promo</span>
            <span>{promoDiscount}</span>
        </div>
        <div>
            <span>Shipping Charges</span>
            <span>FREE</span>
        </div>
        <div>
            <span>Alteration Services</span>
            <span>FREE</span>
        </div>
        <hr/>
        <div>
            <span>Amount Payable</span>
            <span>{total}</span>
        </div>
        <div>* Inclusive GST</div>
    </div>
}

export default OrderSummary
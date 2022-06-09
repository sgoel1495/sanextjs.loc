import React, { useContext, useState } from "react";
import AppWideContext from "../../store/AppWideContext";
import Toast from "../common/Toast";

function OrderSummary() {
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
    firstDate.setDate(firstDate.getDate() + 10)
    const secondDate = new Date()
    secondDate.setDate(secondDate.getDate() + 12)
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);

    const promoDiscountValue = (
        dataStore.orderPromo
        && dataStore.orderPromo.discount_hash
        && dataStore.orderPromo.discount_hash.is_promocode_applied
    )
        ? (dataStore.currCurrency === "inr")
            ? dataStore.orderPromo.discount_hash.discount_inr
            : dataStore.orderPromo.discount_hash.discount_usd
        : 0.00

    const promoDiscount = (dataStore.currCurrency === "inr")
        ? rupeeIndian.format(promoDiscountValue)
        : dollarUS.format(promoDiscountValue)

    const orderTotal = () => {
        let inrTotal = 0
        let usdTotal = 0
        Object.values(dataStore.userCart).forEach(cartItem => {
            inrTotal += cartItem.price * cartItem.qty
            usdTotal += cartItem.usd_price * cartItem.qty
        })
        const shippingFee = dataStore.currentOrderInCart.shipping_fee
        return (dataStore.currCurrency === "inr")
            ? rupeeIndian.format(inrTotal - promoDiscountValue + shippingFee)
            : dollarUS.format(usdTotal - promoDiscountValue + shippingFee)
    }
    const total = orderTotal()

    return (
        <div className="bg-[#f1f2f3] py-6 px-5 mt-12">
            <p className="text-xl mb-2">Order Summary</p>
            <div>Estimated Delivery {monthNames[firstDate.getMonth()]} {firstDate.getDate()} - {monthNames[secondDate.getMonth()]} {secondDate.getDate()}</div>
            <table className="order_summary_table">
                <tbody>
                    <tr>
                        <td>Bag Total</td>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <td>Promo</td>
                        <td>{promoDiscount}</td>
                    </tr>
                    <tr>
                        <td>Shipping Charges</td>
                        <td>{(dataStore.currentOrderInCart.shipping_fee===0)
                                ?<span>FREE</span>
                                :(dataStore.currCurrency === "inr")
                                    ? rupeeIndian.format(dataStore.currentOrderInCart.shipping_fee)
                                    : dollarUS.format(dataStore.currentOrderInCart.shipping_fee)
                        }</td>
                    </tr>
                    <tr>
                        <td>Alteration Services</td>
                        <td>FREE</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex font-600 text-[#777] mt-5">
                <p className="flex-1">Amount Payable</p>
                <p>{total}</p>
            </div>
            <p className="text-[10px] font-500">* Inclusive GST</p>
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </div>
    )
}

export default OrderSummary
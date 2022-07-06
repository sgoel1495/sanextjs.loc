import React, { useContext, useState } from "react";
import AppWideContext from "../../store/AppWideContext";
import Toast from "../common/Toast";
import currencyFormatter from "../../helpers/currencyFormatter";
import orderTotal from "../../helpers/orderTotal";
import promoDiscountValue from "../../helpers/promoDiscountValue";

function OrderSummary() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const { dataStore } = useContext(AppWideContext);
    const firstDate = new Date()
    firstDate.setDate(firstDate.getDate() + 10)
    const secondDate = new Date()
    secondDate.setDate(secondDate.getDate() + 12)
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
/*
    const promoDiscountValue = (
        dataStore.orderPromo
        && dataStore.orderPromo.discount_hash
        && dataStore.orderPromo.discount_hash.is_promocode_applied
    )
        ? (dataStore.currCurrency === "inr")
            ? dataStore.orderPromo.discount_hash.discount_inr
            : dataStore.orderPromo.discount_hash.discount_usd
        : 0.00
*/


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
                        <td>{(dataStore.currCurrency === "inr")
                            ? currencyFormatter("INR").format(promoDiscountValue())
                            : currencyFormatter("USD").format(promoDiscountValue())
                        }</td>
                    </tr>
                    <tr>
                        <td>Shipping Charges</td>
                        <td>{(dataStore.currentOrderInCart.shipping_fee===0)
                                ?<span>FREE</span>
                                :(dataStore.currCurrency === "inr")
                                    ? currencyFormatter("INR").format(dataStore.currentOrderInCart.shipping_fee)
                                    : currencyFormatter("USD").format(dataStore.currentOrderInCart.shipping_fee)
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
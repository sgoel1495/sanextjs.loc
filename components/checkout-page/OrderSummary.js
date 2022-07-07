import React, { useContext, useState } from "react";
import AppWideContext from "../../store/AppWideContext";
import Toast from "../common/Toast";
import currencyFormatter from "../../helpers/currencyFormatter";
import orderTotal from "../../helpers/orderTotal";
import promoDiscountValue from "../../helpers/promoDiscountValue";
import rawOrderTotal from "../../helpers/rawOrderTotal";
import compareDecimalNumbers from "../../helpers/compareDecimalNumbers";

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

    const curr = dataStore.currCurrency.toUpperCase()
    const rawOrdTotal = rawOrderTotal(dataStore)
    const {finalPayable,toPay} = orderTotal(dataStore)

    const rawTotal = currencyFormatter(curr).format(rawOrdTotal)
    const walletPay = currencyFormatter(curr).format(toPay)
    const total =  currencyFormatter(curr).format(finalPayable)

    return (
        <div className="bg-[#f1f2f3] py-6 px-5 mt-12">
            <p className="text-xl mb-2">Order Summary</p>
            <div>Estimated Delivery {monthNames[firstDate.getMonth()]} {firstDate.getDate()} - {monthNames[secondDate.getMonth()]} {secondDate.getDate()}</div>
            <table className="order_summary_table">
                <tbody>
                    <tr>
                        <td>Bag Total</td>
                        <td>{rawTotal}</td>
                    </tr>
                    <tr>
                        <td>Promo</td>
                        <td>{currencyFormatter(curr).format(promoDiscountValue(dataStore))}</td>
                    </tr>
                    <tr>
                        <td>Shipping Charges</td>
                        <td>{(compareDecimalNumbers(dataStore.currentOrderInCart.shipping_fee,0)==="=")
                            ?<span>FREE</span>
                            :<span>currencyFormatter(curr).format(dataStore.currentOrderInCart.shipping_fee)</span>
                        }</td>
                    </tr>
                    <tr>
                        <td>Alteration Services</td>
                        <td>FREE</td>
                    </tr>
                    {<tr>
                        <td>Wallet</td>
                        <td>{(dataStore.useWallet && dataStore.userWallet.WalletAmount > 0)
                            ?(compareDecimalNumbers(finalPayable,0)==="=")
                                ? walletPay
                                : currencyFormatter(curr).format(dataStore.userWallet.WalletAmount)
                            :<span>₹0.00</span>
                        }</td>
                    </tr>}
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
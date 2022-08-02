
import React, {useContext, useEffect, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import Toast from "../common/Toast";
import currencyFormatter from "../../helpers/currencyFormatter";

function OrderSummary() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [gross, setGross] = useState(0)
    const [bagTotal, setBagTotal] = useState(0)
    const [promo, setPromo] = useState(0)
    const firstDate = new Date();
    firstDate.setDate(firstDate.getDate() + 10);
    const secondDate = new Date();
    secondDate.setDate(secondDate.getDate() + 12);
    const curr = dataStore.currCurrency.toUpperCase();


    useEffect(() => {
        let tempGross = 0;
        let tempBag = 0;
        let tempPromo = 0;
        if (dataStore.orderSummary) {
            if (curr === "INR") {
                tempBag = dataStore.orderSummary.grand_total_inr
                tempGross = dataStore.orderSummary.grand_total_inr
            } else {
                tempBag = dataStore.orderSummary.grand_total_usd
                tempGross = dataStore.orderSummary.grand_total_usd
            }
            if (dataStore.orderSummary.discount_hash && Object.keys(dataStore.orderSummary.discount_hash).length) {
                if (curr === "INR") {
                    tempPromo = dataStore.orderSummary.discount_hash.discount_inr
                    tempGross = dataStore.orderSummary.discount_hash.after_discount_grand_total_inr
                } else {
                    tempPromo = dataStore.orderSummary.discount_hash.after_discount_grand_total_usd
                    tempGross = dataStore.orderSummary.discount_hash.after_discount_grand_total_usd
                }
            }
        }
        setGross(tempGross)
        setBagTotal(tempBag)
        setPromo(tempPromo)
        if (dataStore.orderSummary.gross !== tempGross)
            updateDataStore("orderSummary", {...dataStore.orderSummary, "gross": tempGross})
    }, [dataStore.orderSummary])

    let total = gross;
    if (dataStore.orderSummary.payMode === "COD") {
        total += 80;
    }
    if (dataStore.orderSummary.useWallet) {
        if (dataStore.userWallet.WalletAmount >= total) {
            total = 0
        } else {
            total -= dataStore.userWallet.WalletAmount
        }
    }
    const mobileView = (
        <div className=' p-4 border border-solid border-gray-200 mx-3 mt-2'>
            <p className='text-xl mb-2 mt-4 text-center'>Order Summary</p>
            <table className='order_summary_table_mobile'>
                <tbody>
                <tr>
                    <td>Bag Total</td>
                    <td>{currencyFormatter(curr).format(bagTotal)}</td>
                </tr>
                <tr>
                    <td>Promo</td>
                    <td>{currencyFormatter(curr).format(isNaN(promo) ? 0 : promo)}</td>
                </tr>
                {
                    dataStore.userWallet.WalletAmount > 0 ?
                        <>
                            <tr>
                                <td>Gross Total</td>
                                <td>{currencyFormatter(curr).format(gross)}</td>
                            </tr>
                            <tr>
                                <td>Wallet</td>
                                <td>
                                    {currencyFormatter(curr).format(dataStore.userWallet.WalletAmount)}
                                </td>
                            </tr>
                        </>
                        :
                        null
                }
                <tr>
                    <td>Shipping Charges</td>
                    <td>
                        <span className={"text-[#00A478]"}>FREE</span>
                    </td>
                </tr>
                <tr>
                    <td>Alteration Services</td>
                    <td className={"text-[#00A478]"}>
                        <span className={"text-[#00A478]"}>FREE</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className='flex font-600 text-[#777] mt-5'>
                <p className='flex-1'>Amount Payable</p>
                <p>{currencyFormatter(curr).format(total)}</p>
            </div>
            <p className='text-[10px] font-500'>* Inclusive GST</p>
        </div>
    );
    const browserView = (
        <div className='bg-[#f1f2f3] py-6 px-5 mt-12'>
            <p className='text-xl mb-2'>Order Summary</p>
            <div>
                Estimated Delivery {monthNames[firstDate.getMonth()]} {firstDate.getDate()} - {monthNames[secondDate.getMonth()]} {secondDate.getDate()}
            </div>
            <table className='order_summary_table'>
                <tbody>
                <tr>
                    <td>Bag Total</td>
                    <td>{currencyFormatter(curr).format(bagTotal)}</td>
                </tr>
                <tr>
                    <td>Promo</td>
                    <td>{currencyFormatter(curr).format(promo)}</td>
                </tr>
                {dataStore.userWallet.WalletAmount > 0 ?
                    <>
                        <tr>
                            <td>Gross Total</td>
                            <td>{currencyFormatter(curr).format(gross)}</td>
                        </tr>
                        <tr>
                            <td>Wallet</td>
                            <td>
                                {currencyFormatter(curr).format(dataStore.userWallet.WalletAmount)}
                            </td>
                        </tr>
                    </>
                    : null
                }

                <tr>
                    <td>Shipping Charges</td>
                    <td>FREE</td>
                </tr>
                <tr id={"codCharges"}/>
                </tbody>
            </table>
            <div className='flex font-600 text-[#777] mt-5'>
                <p className='flex-1'>Amount Payable</p>
                <p>{currencyFormatter(curr).format(total)}</p>
            </div>
            <p className='text-[10px] font-500'>* Inclusive GST</p>
        </div>
    );

    return dataStore.mobile ? mobileView : browserView;
}

export default OrderSummary;

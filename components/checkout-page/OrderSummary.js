import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {setOrderSummary} from "../../ReduxStore/reducers/orderSlice";
import appSettings from "../../store/appSettings";

function OrderSummary({appConfig, userData, userConfig, orderSummary,payMode, ...props}) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [gross, setGross] = useState(0)
    const [bagTotal, setBagTotal] = useState(0)
    const [promo, setPromo] = useState(0)
    const firstDate = new Date();
    firstDate.setDate(firstDate.getDate() + 10);
    const secondDate = new Date();
    secondDate.setDate(secondDate.getDate() + 12);
    const currCurrency = userConfig.currCurrency;
    const currencySymbol = userConfig.currSymbol;
    const orderShipping = appSettings("currency_data")[currCurrency]

    useEffect(() => {
        let tempGross = 0;
        let tempBag = 0;
        let tempPromo = 0;
        if (orderSummary) {
            if (currCurrency.toUpperCase() === "INR") {
                tempBag = orderSummary.grand_total_inr
                tempGross = orderSummary.grand_total_inr
            } else {
                tempBag = orderSummary.grand_total_usd
                tempGross = orderSummary.grand_total_usd
            }
            if (orderSummary.discount_hash && Object.keys(orderSummary.discount_hash).length) {
                if (currCurrency.toUpperCase() === "INR") {
                    tempPromo = orderSummary.discount_hash.discount_inr
                    tempGross = orderSummary.discount_hash.after_discount_grand_total_inr
                } else {
                    tempPromo = orderSummary.discount_hash.after_discount_grand_total_usd
                    tempGross = orderSummary.discount_hash.after_discount_grand_total_usd
                }
            }
        }
        setGross(tempGross)
        setBagTotal(tempBag)
        setPromo(tempPromo)
        if (orderSummary.gross !== tempGross)
            props.setOrderSummary({...orderSummary, "gross": tempGross})
    }, [orderSummary])
    let total = gross;
    console.log(payMode)
    if (orderSummary.payMode === "COD") {
        total += 80;
    }
    if (orderSummary.useWallet) {
        if (userData.wallet.WalletAmount >= total) {
            total = 0
        } else {
            total -= userData.wallet.WalletAmount
        }
    }
    const mobileView = (
        <div className=' p-4 border border-solid border-gray-200 mx-3 mt-2'>
            <p className='text-xl mb-2 mt-4 text-center'>Order Summary</p>
            <table className='order_summary_table_mobile'>
                <tbody>
                <tr>
                    <td>Bag Total</td>
                    <td>{currencySymbol}{bagTotal}</td>
                </tr>
                <tr>
                    <td>Promo</td>
                    <td>{currencySymbol}{(isNaN(promo) ? 0 : promo)}</td>
                </tr>
                {
                    userData.wallet.WalletAmount > 0 ?
                        <>
                            <tr>
                                <td>Gross Total</td>
                                <td>{currencySymbol}{gross}</td>
                            </tr>
                            <tr>
                                <td>Wallet</td>
                                <td>
                                    {currencySymbol}{userData.wallet.WalletAmount}
                                </td>
                            </tr>
                        </>
                        :
                        null
                }
                <tr>
                    <td>Shipping Charges</td>
                    <td>
                        <span className={"text-[#00A478]"}>{bagTotal >= orderShipping["offer_shipping"] ? "FREE" : orderShipping["shipping_int"]}</span>
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
                <p>{currencySymbol}{total}</p>
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
                    <td>{currencySymbol}{bagTotal}</td>
                </tr>
                <tr>
                    <td>Promo</td>
                    <td>{currencySymbol}{promo}</td>
                </tr>
                {userData.wallet.WalletAmount > 0 ?
                    <>
                        <tr>
                            <td>Gross Total</td>
                            <td>{currencySymbol}{gross}</td>
                        </tr>
                        <tr>
                            <td>Wallet</td>
                            <td>
                                {currencySymbol}{userData.wallet.WalletAmount}
                            </td>
                        </tr>
                    </>
                    : null
                }

                <tr>
                    <td>Shipping Charges</td>
                    <td>{bagTotal >= orderShipping["offer_shipping"] ? "FREE" : orderShipping["shipping_int"]}</td>
                </tr>
                <tr id={"codCharges"}/>
                </tbody>
            </table>
            <div className='flex font-600 text-[#777] mt-5'>
                <p className='flex-1'>Amount Payable</p>
                <p>{currencySymbol}{total}</p>
            </div>
            <p className='text-[10px] font-500'>* Inclusive GST</p>
        </div>
    );

    return appConfig.isMobile ? mobileView : browserView;
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig,
        userConfig: state.userConfig,
        orderSummary: state.orderData.orderSummary,
        payMode: state.orderData.orderSummary.payMode,
    }
}

export default connect(mapStateToProps, {setOrderSummary})(OrderSummary);

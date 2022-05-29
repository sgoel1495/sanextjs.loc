import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import React, { Fragment, useContext, useEffect, useState } from "react";
import OrderSummary from "../../../components/checkout-page/OrderSummary";
import ShippingAddress from "../../../components/checkout-page/ShippingAddress";
import PromoCode from "../../../components/checkout-page/PromoCode";
import GiftAndPayment from "../../../components/checkout-page/GiftAndPayment";
import ReviewOrder from "../../../components/checkout-page/ReviewOrder";
import AppWideContext from "../../../store/AppWideContext";
import getUserO from "../../../helpers/getUserO";
import {apiCall} from "../../../helpers/apiCall";

function UsersCheckoutPage() {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    useEffect(()=>{
        if (dataStore && (!dataStore.currentOrderId || dataStore.currentOrderId === 0))
            updateDataStore("currentOrderId", Date.now())
    },[])

    const [addressComplete, setAddressComplete] = useState(false)
    const [giftPaymentComplete, setGiftPaymentComplete] = useState(false)

    const placeOrder = async () => {
        console.log(dataStore.currentOrderId,dataStore.currentOrderInCart)
        // this userO is different
        const user = {
            contact: dataStore.userData.contact || dataStore.currentOrderInCart.address.email,
            is_guest: !(dataStore.userData.contact),
            temp_user_id: dataStore.userServe.temp_user_id
        }
        console.log("USER",user)
        const callWord = "savePayment"
            /*
        const callWord = (dataStore.currentOrderInCart.order.payment_mode==="CC"
            || dataStore.currentOrderInCart.order.payment_mode==="DC" )?"savePayment" : "codcheckout"

             */
        const step1Call = await apiCall(callWord,dataStore.apiToken,{
            user:user,
            order:dataStore.currentOrderInCart.order
        })
        console.log("STEP1 CALL",step1Call)
        dataStore.place_order_step1 = step1Call

    }

    const mobileView = null
    const browserView = <Fragment>
        <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile} />
        <Header type={"shopMenu"} />
        <div className="w-[970px] xl:w-[1170px] mx-auto my-28 flex gap-6">
            <div className="flex-[8]">
                <ShippingAddress addressComplete={addressComplete} updateCompleteness={setAddressComplete.bind(this)} />
                <PromoCode />
                <GiftAndPayment giftPaymentComplete={giftPaymentComplete} updateCompleteness={setGiftPaymentComplete.bind(this)} />
                <ReviewOrder />
            </div>
            <div className="flex-[4]">
                <OrderSummary />
                {(addressComplete && giftPaymentComplete)
                    ? <div className="inline-flex mb-5 text-white bg-black px-5 py-3" onClick={placeOrder}>PLACE YOUR ORDER AND PAY</div>
                    : null
                }
            </div>

        </div>
    </Fragment>


    return (
        <Fragment>
            {(dataStore.mobile) ? mobileView : browserView}
        </Fragment>
    )
}

export default UsersCheckoutPage

/*
            {(addressComplete && giftPaymentComplete)
                ? <div className="inline-flex mb-5 text-white bg-black px-5 py-3" onClick={placeOrder}>PLACE YOUR ORDER AND PAY</div>
                : null
            }
<div className="inline-flex mb-5 text-white bg-black px-5 py-3" onClick={placeOrder}>PLACE YOUR ORDER AND PAY</div>
 */
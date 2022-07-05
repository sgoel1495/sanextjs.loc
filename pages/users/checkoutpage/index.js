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
import Toast from "../../../components/common/Toast";
import ReactDom from "react-dom";
import OtpModal from "../../../components/checkout-page/OtpModal";
import addToCartNotLoggedIn from "../../../helpers/addToCartNotLoggedIn";

function UsersCheckoutPage() {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    console.log("============= DATASTORE",dataStore)
    useEffect(()=>{
        if (dataStore && (!dataStore.currentOrderId || dataStore.currentOrderId === ""))
            updateDataStore("currentOrderId", Date.now().toString())
    },[dataStore,updateDataStore])

    const [addressComplete, setAddressComplete] = useState(false)
    const [giftPaymentComplete, setGiftPaymentComplete] = useState(false)
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false)

    const updateAddressForOrder = async ()=>{
        const userO = getUserO(dataStore,true, true)
        userO["address_index"]=dataStore.addressIndex
        // step1 is update the address. Need orderid and address index
        if(!dataStore.userData.contact) {
            userO["address"] = {0: dataStore.selectedAddress}
            userO["account"] = dataStore.currentOrderInCart.account
        }

        const queryObject = {user:userO, order:{order_id:dataStore.currentOrderId}}
        const addressCall = await apiCall("deliveryAddress",dataStore.apiToken,queryObject)
        console.log("Update Address",addressCall)
        return addressCall
    }

    const doStep1ForCOD = async ()=>{
        // same for logged in or not
        const userO = getUserO(dataStore,true)
        const queryObject = {user:userO, order:dataStore.currentOrderInCart.order}
        const step1Call = await apiCall("savePayment", dataStore.apiToken, queryObject)
        // the OTP On this call is to be avoided
        console.log("STEP1 CALL",step1Call)
        if(step1Call.message && step1Call.message==="Payment initiated"){
            setShowOTPModal(true)
        } else {
            setMessage("Something went wrong. Please try again later")
            setShow(true)
        }
    }

    const doStep1ForCCDC = async ()=>{
        if(dataStore.userData.contact){

        } else {

        }

    }

    const placeOrder = async () => {
        console.log("Placing Order ========================= DATA STORE ========",dataStore)
        const userEmailO = getUserO(dataStore,true)
        const userContactO = getUserO(dataStore,true, true)

        /*
        Steps:-
1. Add to cart
2. Get cart
3. Get order summary
4. Address for delivery
5. save payment details
6. Send otp for COD
7. Verify otp fot COD
         */
        // Step 1/7 1. Add to cart
        if(!dataStore.userData.contact)
            await addToCartNotLoggedIn(dataStore)

        // Step2/7 2. Get cart
        const gotCartCall = await apiCall("getCart", dataStore.apiToken, {user:userEmailO})
        let gotCart = []
        if(gotCartCall.response)
            gotCart = gotCartCall.response

        // Step3/7 3. Get order summary
        const gotOrderSummaryCall = await apiCall("getOrderSummary", dataStore.apiToken, {user:userContactO})
        let gotOrderSummary = []
        if(gotOrderSummary.cart)
            gotOrderSummary = gotOrderSummaryCall.cart

        // Step4/7 4. Address for delivery
        const addressCall = await updateAddressForOrder()
        let partialOrder = {}
        if(addressCall.msg2 && addressCall.msg2==="Partial Order created")
            partialOrder = addressCall

        // step5/7 save_payment_details:
        if(dataStore.currentOrderInCart.order.payment_mode==="COD"){
            // same for logged in or not
            const queryObject = {user:userContactO, order:dataStore.currentOrderInCart.order}
            const step1Call = await apiCall("savePayment", dataStore.apiToken, queryObject)
            // the OTP On this call is to be avoided
            console.log("STEP1 CALL",step1Call)
            if(step1Call.message && step1Call.message==="Payment initiated"){
                setShowOTPModal(true)
            } else {
                setMessage("Something went wrong. Please try again later")
                setShow(true)
            }
        }
    }


    console.log("addressComplete && giftPaymentComplete",addressComplete, giftPaymentComplete)

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
        {showOTPModal &&
            ReactDom.createPortal(
                <OtpModal closeModal={() => setShowOTPModal(false)}  />,
                document.getElementById("paymentpopup"))
        }
    </Fragment>


    return (
        <Fragment>
            {(dataStore.mobile) ? mobileView : browserView}
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    )
}

export default UsersCheckoutPage

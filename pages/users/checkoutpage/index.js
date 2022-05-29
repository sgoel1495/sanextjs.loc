import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import React, { Fragment, useContext, useEffect, useState } from "react";
import OrderSummary from "../../../components/checkout-page/OrderSummary";
import ShippingAddress from "../../../components/checkout-page/ShippingAddress";
import PromoCode from "../../../components/checkout-page/PromoCode";
import GiftAndPayment from "../../../components/checkout-page/GiftAndPayment";
import ReviewOrder from "../../../components/checkout-page/ReviewOrder";
import AppWideContext from "../../../store/AppWideContext";

function UsersCheckoutPage() {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    useEffect(()=>{
        if (dataStore && (!dataStore.currentOrderId || dataStore.currentOrderId === 0))
            updateDataStore("currentOrderId", Date.now())
    },[])

    const [addressComplete, setAddressComplete] = useState(false)
    const [giftPaymentComplete, setGiftPaymentComplete] = useState(false)

    const placeOrder = async () => {

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
            </div>
            {(addressComplete && giftPaymentComplete)
                ? <div onClick={placeOrder}>PLACE YOUR ORDER AND PAY</div>
                : null
            }
        </div>
    </Fragment>


    return (
        <Fragment>
            {(dataStore.mobile) ? mobileView : browserView}
        </Fragment>
    )
}

export default UsersCheckoutPage
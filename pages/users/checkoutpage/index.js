import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Link from "next/link";
import React, { Fragment, useContext, useEffect, useState } from "react";
import OrderSummary from "../../../components/checkout-page/OrderSummary";
import ShippingAddress from "../../../components/checkout-page/ShippingAddress";
import PromoCode from "../../../components/checkout-page/PromoCode";
import GiftAndPayment from "../../../components/checkout-page/GiftAndPayment";
import ReviewOrder from "../../../components/checkout-page/ReviewOrder";
import AppWideContext from "../../../store/AppWideContext";
import getUserO from "../../../helpers/getUserO";
import { apiCall } from "../../../helpers/apiCall";
import Toast from "../../../components/common/Toast";
import ReactDom from "react-dom";
import OtpModal from "../../../components/checkout-page/OtpModal";
import addToCartNotLoggedIn from "../../../helpers/addToCartNotLoggedIn";
import orderTotal from "../../../helpers/orderTotal";
import compareDecimalNumbers from "../../../helpers/compareDecimalNumbers";
import Image from "next/image";
import AdditionalSizeDetail from "../../../components/checkout-page/mobile-view/AdditionalSizeDetails";
import OrderDetails from "../../../components/checkout-page/mobile-view/OrderDetails";
import { useRouter } from "next/router";

function UsersCheckoutPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    const router = useRouter();
    const [addressComplete, setAddressComplete] = useState(false);
    const [giftPaymentComplete, setGiftPaymentComplete] = useState(false);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [active, setActive] = useState(1);

    useEffect(() => {
        if (dataStore && (!dataStore.currentOrderId || dataStore.currentOrderId === "")) updateDataStore("currentOrderId", Date.now().toString());
    }, [dataStore, updateDataStore]);

    const updateAddressForOrder = async () => {
        const userO = getUserO(dataStore, true, true);
        userO["address_index"] = dataStore.addressIndex;
        // step1 is update the address. Need orderid and address index
        if (!dataStore.userData.contact) {
            userO["address"] = { 0: dataStore.selectedAddress };
            userO["account"] = dataStore.currentOrderInCart.account;
        }

        const queryObject = { user: userO, order: { order_id: dataStore.currentOrderId } };
        const addressCall = await apiCall("deliveryAddress", dataStore.apiToken, queryObject);

        return addressCall;
    };

    const doStep1ForCOD = async () => {
        // same for logged in or not
        const userO = getUserO(dataStore, true);
        const queryObject = { user: userO, order: dataStore.currentOrderInCart.order };
        const step1Call = await apiCall("savePayment", dataStore.apiToken, queryObject);
        // the OTP On this call is to be avoided

        if (step1Call.message && step1Call.message === "Payment initiated") {
            setShowOTPModal(true);
        } else {
            setMessage("Something went wrong. Please try again later");
            setShow(true);
        }
    };

    const doStep1ForCCDC = async () => {
        if (dataStore.userData.contact) {
        } else {
        }
    };

    const placeOrder = async () => {
        // Update the wallet as payment
        const { finalPayable } = orderTotal(dataStore);
        if (dataStore.useWallet && compareDecimalNumbers(finalPayable, 0) === "=") {
            dataStore.currentOrderInCart.order.payment_mode = "wallet";
        }

        const userEmailO = getUserO(dataStore, true);
        const userContactO = getUserO(dataStore, true, true);

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
        if (!dataStore.userData.contact) await addToCartNotLoggedIn(dataStore);

        // Step2/7 2. Get cart
        const gotCartCall = await apiCall("getCart", dataStore.apiToken, { user: userEmailO });
        let gotCart = [];
        if (gotCartCall.response) gotCart = gotCartCall.response;

        // Step3/7 3. Get order summary
        const gotOrderSummaryCall = await apiCall("getOrderSummary", dataStore.apiToken, { user: userContactO });
        let gotOrderSummary = [];
        if (gotOrderSummary.cart) gotOrderSummary = gotOrderSummaryCall.cart;

        // Step4/7 4. Address for delivery
        const addressCall = await updateAddressForOrder();
        let partialOrder = {};
        if (addressCall.msg2 && addressCall.msg2 === "Partial Order created") partialOrder = addressCall;

        // step5/7 save_payment_details:
        if (dataStore.currentOrderInCart.order.payment_mode === "COD" || dataStore.currentOrderInCart.order.payment_mode === "wallet") {
            // same for logged in or not
            const queryObject = { user: userContactO, order: dataStore.currentOrderInCart.order };
            const step1Call = await apiCall("savePayment", dataStore.apiToken, queryObject);
            // the OTP On this call is to be avoided

            if (step1Call.message && step1Call.message === "Payment initiated") {
                setShowOTPModal(true);
            } else {
                setMessage("Something went wrong. Please try again later");
                setShow(true);
            }
        }
    };

    let ActiveForm = <></>;
    switch (active) {
        case 1:
            ActiveForm = <OrderDetails setActive={setActive} />;
            break;
        case 2:
            ActiveForm = <ShippingAddress setActive={setActive} addressComplete={addressComplete}
                updateCompleteness={setAddressComplete.bind(this)} />;
            break;
        case 3:
            ActiveForm = <AdditionalSizeDetail setActive={setActive} />;
            break;
        case 4:
            ActiveForm = (
                <GiftAndPayment giftPaymentComplete={giftPaymentComplete}
                    updateCompleteness={setGiftPaymentComplete.bind(this)} setActive={setActive} />
            );
            break;
        case 5:
            ActiveForm = <ReviewOrder setActive={setActive} />;
            break;
    }
    const mobileView = (
        <div>
            <div className='flex flex-row justify-between pt-5 px-3'>
                <div className='flex items-center'>
                    <span className={"px-2 font-600 border-2"} onClick={router.goBack}>
                        {"<"}
                    </span>
                </div>
                <div className=''>
                    <Link href='/'>
                        <Image src={WEBASSETS + "/assets/SALT_logo.png"} alt='fav' width={100} height={40} />
                    </Link>
                </div>
                <p className='font-semibold'>{active}/5</p>
            </div>
            {ActiveForm}
        </div>
    );
    const browserView = (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile} />
            <Header type={"shopMenu"} />
            <div className='w-[970px] xl:w-[1170px] mx-auto my-28 flex gap-6'>
                <div className='flex-[8]'>
                    <ShippingAddress addressComplete={addressComplete}
                        updateCompleteness={setAddressComplete.bind(this)} />
                    <PromoCode />
                    <GiftAndPayment giftPaymentComplete={giftPaymentComplete}
                        updateCompleteness={setGiftPaymentComplete.bind(this)} />
                    <ReviewOrder />
                </div>
                <div className='flex-[4]'>
                    <OrderSummary />
                    {addressComplete && giftPaymentComplete ? (
                        <div className='inline-flex mb-10 mt-10 text-white bg-black px-10 py-2' onClick={placeOrder}>
                            PLACE YOUR ORDER AND PAY
                        </div>
                    ) : null}
                </div>
            </div>
            {showOTPModal && ReactDom.createPortal(<OtpModal
                closeModal={() => setShowOTPModal(false)} />, document.getElementById("paymentpopup"))}
        </Fragment>
    );

    return (
        <Fragment>
            {dataStore.mobile ? mobileView : browserView}
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    );
}

export default UsersCheckoutPage;

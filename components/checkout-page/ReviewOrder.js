import React, {useReducer, useState} from "react";
import Accordion from "../common/accordion";
import ProductCartView from "../common/ProductCartView/ProductCartView";
import ReactDom from "react-dom";
import OtpModal from "./OtpModal";
import {connect} from "react-redux";
import {setOrderSummary} from "../../ReduxStore/reducers/orderSlice";
import {useRouter} from "next/router";
import {saveFinalPayment, savePayment} from "./functions";
import Image from "next/image";
import razorpayLogo from "../../public/assets/images/razorpay_logo.svg";
import ccavenue from "../../public/assets/images/ccavenue.png";
import {addBackFromPaymentIntent, addOnPaymentIntent} from "../../ReduxStore/reducers/intentSlice";

function ReviewOrder(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const currencySymbol = props.userConfig.currSymbol;
    const address = props.orderSummary.address ? props.orderSummary.address : {};
    const measurements = props.orderSummary.measurements ? props.orderSummary.measurements : {};
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showGateway, setShowGateways] = useReducer((state) => {
        return !state
    }, false)
    const [showOTPModal, setShowOTPModal] = useReducer((state) => {
        return !state
    }, false)

    const payRazorPay = (order_id, amount) => {
        let options = {
            "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": props.userConfig.currCurrency.toUpperCase(),
            "name": "Saltattire",
            "description": "Bespoke & Custom Clothing",
            "image": WEBASSETS + `/assets/images/SALT_attire_logo.png`,
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                saveFinalPayment(props.userData, props.currentOrderId, response, props.appConfig.apiToken, "").then((resp) => {
                    if (resp.status === 200) {
                        router.push("/salt/Thankyou?id=" + resp.order_id)
                    } else {
                        setLoading(false)
                    }
                })
            },
            "modal": {
                "ondismiss": function () {
                    props.addBackFromPaymentIntent()
                    setLoading(false)
                }
            },
            "prefill": {
                "name": props.userData.userServe.user_name,
                "email": props.userData.userServe.email,
                "contact": props.userData.userServe.phone_number
            },
            "theme": {
                "color": "#fffaf7"
            }
        };
        let rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            props.addBackFromPaymentIntent()
            setLoading(false)
        });
        rzp1.open()
        props.addOnPaymentIntent()
    }

    const placeOrder = async (payWith) => {
        setLoading(true)
        let giftData = {
            gift_msg: props.orderSummary.payment.gift_msg,
            gift_msg_to: props.orderSummary.payment.gift_msg_to,
            gift_msg_from: props.orderSummary.payment.gift_msg_from,
        }
        let resp = await savePayment(props.orderSummary.payment.is_gift, giftData, props.orderSummary.payMode, props.orderSummary.useWallet, props.userData, {
            orderSummary: props.orderSummary,
            currentOrderId: props.currentOrderId
        }, props.appConfig.apiToken, props.userConfig.currCurrency, props.setOrderSummary, payWith)
        if (resp.status === 200 || resp.msg === "Order Placed") {
            if (props.orderSummary.payMode === "COD") {
                setShowOTPModal(true)
            } else if (props.orderSummary.payMode === "WALLET") {
                saveFinalPayment(props.userData, props.currentOrderId, null, props.appConfig.apiToken, props.orderSummary.gross).then((resp) => {
                    if (resp.status === 200) {
                        router.push("/salt/Thankyou?id=" + resp.order_id)
                    } else {
                        setLoading(false)
                    }
                })
            } else {
                if (payWith === "razorpay")
                    payRazorPay(resp.razorpay_data.attributes.id, resp.razorpay_data.attributes.amount_due)
                else
                    router.push({
                        pathname: "/order/CCportal",
                        query: {token: resp.encrypted_data, access_code: resp.access_code}
                    }, "/order/CCportal")
            }
        } else {
            setLoading(false)
        }
    }

    let total = props.orderSummary.gross - (props.orderSummary.payment && props.orderSummary.payment.is_wallet ? props.orderSummary.payment.cash_from_wallet : 0) + (props.orderSummary.payment && props.orderSummary.payment.payment_mode === "COD" ? 80 : 0)
    let isCOD = props.orderSummary.payment && (props.orderSummary.payment.payment_mode === "COD")

    const mobileView = (
        <>
            <Accordion
                style={"mt-5"}
                animationDuration={"duration-200"}
                titleStyle={`py-5 px-5`}
                title={
                    <div className='text-xl mb-2'>
                        Review Order - <span className='text-base font-500'>{props.shoppingCart.cart.length} item in bag</span>
                    </div>
                }
                bodyStyle={`px-8 grid grid-cols-1 gap-10 border-solid`}
            >
                <ProductCartView isMobile={false}/>
            </Accordion>
            <div className='px-5 mb-24'>
                <p className='font-bold text-l mt-4'>Deliver To</p>
                <div className='p-4 border border-solid border-[#f1f2f3] mb-4'>
                    <div className='flex flex-col gap-y-1 mb-5 text-[#777]'>
                        <p className='font-500'>
                            {address.name} {address.lastname}
                        </p>
                        <p className='text-xs text-[#555]'>
                            {address.address}, {address.landmark}
                        </p>
                        <p className='text-xs text-[#555]'>
                            {address.city}, {address.state} {address.zip_code}
                        </p>
                        <p className='text-xs text-[#555]'>{address.country}</p>
                        <p className='text-xs text-[#555]'>T: {address.phone}</p>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <p className='font-bold text-l'>Amount to be paid</p>
                    <p>{currencySymbol}{total}</p>
                </div>
                <p className='font-bold text-l mt-4'>Your Size info</p>
                <div className='uppercase my-4 grid grid-cols-2'>
                    <p className='pl-4 pb-3'>Brand</p>
                    <p className='pl-4 pb-3'>{measurements.tops_brand}</p>
                    <p className='pl-4 pb-3'>Top Size</p>
                    <p className='pl-4 pb-3'>{measurements.tops_size}</p>
                    <p className='pl-4 pb-3'>Bottom Size</p>
                    <p className='pl-4 pb-3'>{measurements.jeans_pants_size}</p>
                </div>
            </div>
            <div className='bg-white text-center grid grid-cols-2 fixed h-auto w-full left-0 right-0 bottom-0 mt-4'>
                {
                    showGateway &&
                    <>
                        <button
                            className='flex text-white bg-black px-5 py-3 w-full text-center uppercase cursor-pointer justify-center items-center border-b border-r border-white'
                            onClick={() => placeOrder("razorpay")} disabled={loading}>
                            <Image src={razorpayLogo} width={95} height={20}/>
                        </button>
                        <button
                            className='flex text-white bg-black px-5 py-3 w-full text-center uppercase cursor-pointer justify-center items-center border-b border-l border-white'
                            onClick={() => placeOrder("ccavenue")} disabled={loading}>
                            <Image src={ccavenue} width={96} height={15}/>
                        </button>
                    </>
                }
                <div
                    onClick={() => {
                        props.setActive(4);
                    }}
                    className='cursor-pointer font-600 text-black py-2'
                >
                    <button className='font-600'>&lt; BACK</button>
                    <p className='text-xs'>Edit Payment Mode</p>
                </div>
                <div
                    onClick={(props.orderSummary.payment ? props.orderSummary.payment.payment_mode === "WALLET" : false) ? () => placeOrder() : isCOD ? setShowOTPModal : setShowGateways}
                    className='bg-black py-2 cursor-pointer text-white flex justify-center'
                >
                    <button
                        className='font-600 uppercase px-10 '>{(props.orderSummary.payment ? props.orderSummary.payment.payment_mode === "WALLET" : false) ? "place your order" : isCOD ? "verify otp for cod" : "Place order & pay"}</button>
                </div>
            </div>
            {showOTPModal && ReactDom.createPortal(
                <OtpModal isMobile={true} closeModal={setShowOTPModal}/>,
                document.getElementById("paymentpopup"))}
        </>
    );
    const browserView = (
        <>
            <Accordion
                style={"mt-5"}
                animationDuration={"duration-200"}
                titleStyle={`bg-[#f1f2f3] py-5 px-8`}
                title={
                    <div className='text-xl mb-2'>
                        Review Order - <span className='text-base font-500'>{props.orderSummary.cart && Object.keys(props.orderSummary.cart).length} item in bag</span>
                    </div>
                }
            >
                <div className={"pb-8 bg-[#f1f2f3] px-8 grid grid-cols-2 gap-10"}>
                    <ProductCartView/>
                </div>
            </Accordion>
        </>
    );

    return props.appConfig.isMobile ? mobileView : browserView;
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        userConfig: state.userConfig,
        userData: state.userData,
        orderSummary: state.orderData.orderSummary,
        shoppingCart: state.shoppingCart,
        currentOrderId: state.orderData.currentOrderId
    }
}

export default connect(mapStateToProps, {setOrderSummary, addBackFromPaymentIntent, addOnPaymentIntent})(ReviewOrder);

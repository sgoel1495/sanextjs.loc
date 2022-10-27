import Link from "next/link";
import Toast from "../common/Toast";
import ReactDOM from "react-dom";
import React, {Fragment, useEffect, useReducer, useState} from "react";
import {saveFinalPayment, savePayment, updateAddressForOrder} from "./functions";
import OtpModal from "./OtpModal";
import {connect} from "react-redux";
import {setOrderSummary} from "../../ReduxStore/reducers/orderSlice";
import {useRouter} from "next/router";
import razorpayLogo from "../../public/assets/images/razorpay_logo.svg"
import ccavenue from "../../public/assets/images/ccavenue.png"
import Image from "next/image";

function GiftAndPayment({setActive, appConfig, userData, userConfig, orderSummary, currentOrderId, ...props}) {
    const currencySymbol = userConfig.currSymbol;
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const router = useRouter();
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [isGift, setIsGift] = useReducer((state) => {
        return !state
    }, orderSummary.payment ? orderSummary.payment.is_gift : false);
    const [showOTPModal, setShowOTPModal] = useReducer((state) => {
        return !state
    }, false)
    const [giftData, setGiftData] = useReducer((state, e) => {
        return {...state, [e.target.name]: e.target.value}
    }, {
        gift_msg: orderSummary.payment ? orderSummary.payment.gift_msg : "",
        gift_msg_to: orderSummary.payment ? orderSummary.payment.gift_msg_to : "",
        gift_msg_from: orderSummary.payment ? orderSummary.payment.gift_msg_from : ""
    });
    const [loading, setLoading] = useState(false)
    const [payMode, setPayMode] = useState(orderSummary.payment ? orderSummary.payment.payment_mode : false);
    const [useWallet, setUseWallet] = useReducer((state) => {
        return !state
    }, orderSummary.payment ? orderSummary.payment.is_wallet : false);

    useEffect(() => {
        props.setOrderSummary({...orderSummary, "payMode": payMode})
        if (orderSummary.address_index >= 0 && orderSummary.address_index < userData.userAddresses.length) {
        } else {
            updateAddressForOrder(0, userData, {orderSummary, currentOrderId}, appConfig.apiToken, props.setOrderSummary);
        }
    }, [payMode])

    useEffect(() => {
        props.setOrderSummary({...orderSummary, "useWallet": useWallet})
    }, [useWallet])

    //for mobile
    const next = async () => {
        if (isGift) {
            if (!giftData.gift_msg) {
                setShow(true)
                setMessage("Please select your gift message")
                return
            }
        }
        if (!payMode) {
            setShow(true)
            setMessage("Please select a payment mode")
            return
        }
        savePayment(isGift, giftData, payMode, useWallet, userData, {orderSummary, currentOrderId}, appConfig.apiToken, userConfig.currCurrency, props.setOrderSummary, "razorpay")
        setActive(5);
    }

    const payRazorPay = (order_id, amount) => {
        let options = {
            "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": userConfig.currCurrency.toUpperCase(),
            "name": "Saltattire",
            "description": "Bespoke & Custom Clothing",
            "image": WEBASSETS + `/assets/images/SALT_attire_logo.png`,
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                saveFinalPayment(userData, currentOrderId, response, appConfig.apiToken).then((resp) => {
                    if (resp.status === 200) {
                        router.push("/salt/Thankyou?id=" + resp.order_id)
                    } else {
                        setLoading(false)
                    }
                })
            },
            "modal": {
                "ondismiss": function () {
                    setLoading(false)
                }
            },
            "prefill": {
                "name": userData.userServe.user_name,
                "email": userData.userServe.email,
                "contact": userData.userServe.phone_number
            },
            "theme": {
                "color": "#fffaf7"
            }
        };
        let rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            setLoading(false)
        });
        rzp1.open()
    }

    //forBrowser
    const placeOrder = async (payWith) => {
        if (isGift) {
            if (!giftData.gift_msg) {
                setShow(true)
                setMessage("Please select your gift message")
                return
            }
        }
        setLoading(true)
        let resp = await savePayment(isGift, giftData, payMode, useWallet, userData, {
            orderSummary,
            currentOrderId
        }, appConfig.apiToken, userConfig.currCurrency, props.setOrderSummary, payWith)
        if (resp.status === 200 || resp.msg === "Order Placed") {
            if (payMode === "COD") {
                setShowOTPModal(true)
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

    const labelClass = "block text-[#777] font-600 mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;
    const codEnabled = orderSummary.cart ? orderSummary.cart.filter((item) => item.product_id.includes("Giftcard")).length === 0 : true
    const mobileView = (
        <Fragment>
            <p className='text-l text-center font-bold mb-2'>How do you want to pay ?</p>
            {userData.wallet.WalletAmount > 0 ? (
                <label className='pl-5 py-2 flex items-center'>
                    <input type='checkbox' checked={useWallet} onChange={setUseWallet} className='ms-2 focus:ring-transparent text-[#777]'/>
                    <p className='px-2 font-600 text-[#5F6061] text-sm'>
                        Use Wallet
                    </p>
                </label>
            ) : null}

            <div className='border border-solid border-[#f1f2f3] mb-4 py-5 mx-5'>
                <div className='flex flex-col mx-5 text-[#777]'>
                    {
                        codEnabled &&
                        <>
                            <Link href='/salt/shipping-returns' passHref>
                                <a target={"_blank"} className='block text-[10px] font-semibold text-black underline ml-3'>COD Refund Policy</a>
                            </Link>
                            <label className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    name='paymentMode'
                                    className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                                    checked={payMode === "COD"}
                                    onChange={() => setPayMode("COD")}
                                />
                                <span className='text-[#777] font-600'>Cash on Delivery</span>
                            </label>
                        </>
                    }
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            checked={payMode === "CC"}
                            onChange={() => setPayMode("CC")}
                        />
                        <span className='text-[#777] font-600'>Cards</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            checked={payMode === "DC"}
                            onChange={() => setPayMode("DC")}
                        />
                        <span className='text-[#777] font-600'>Netbanking</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            checked={payMode === "UPI"}
                            onChange={() => setPayMode("UPI")}
                        />
                        <span className='text-[#777] font-600'>UPI</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            checked={payMode === "Paytm"}
                            onChange={() => setPayMode("Paytm")}
                        />
                        <span className='text-[#777] font-600'>Paytm</span>
                    </label>
                </div>
            </div>
            <div className='bg-white text-center grid grid-cols-2 fixed h-auto w-full left-0 right-0 bottom-0 mt-4'>
                <div onClick={() => setActive(3)} className='cursor-pointer font-600 text-black py-2'>
                    <button className='font-600'>&lt; BACK</button>
                    <p className='text-xs uppercase'>Edit Size info</p>
                </div>
                <div onClick={next} className='bg-black py-2 cursor-pointer text-white'>
                    <button className='font-600'> NEXT &gt;</button>
                    <p className='text-xs uppercase'>Review Order</p>
                </div>
            </div>
        </Fragment>
    );

    const browserView = (
        <Fragment>
            <p className='text-xl mb-2'>Payment</p>
            {userData.wallet.WalletAmount > 0 ? (
                <label className=' py-5 px-8 flex items-center'>
                    <input type='checkbox' checked={useWallet} onChange={setUseWallet} className='ms-2 focus:ring-transparent text-[#777]'/>
                    <p className='px-2 font-600 text-[#5F6061] text-base'>
                        Use Wallet
                    </p>
                </label>
            ) : null}
            <div className='bg-[#f1f2f3] py-5 px-8 grid grid-cols-3'>
                {
                    codEnabled &&
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            checked={(payMode === "COD")}
                            onChange={() => setPayMode("COD")}
                        />
                        <span className='text-[#777] font-600'>
                        Cash on Delivery
                        <Link href={'/salt/shipping-returns'}>
                            <a className='block text-[10px] text-black underline ml-3'>COD Refund Policy</a>
                        </Link>
                    </span>
                    </label>
                }
                <label className='flex items-center gap-2'>
                    <input
                        type='radio'
                        name='paymentMode'
                        className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                        checked={(payMode === "CC")}
                        onChange={() => setPayMode("CC")}
                    />
                    <span className='text-[#777] font-600'>Credit Cards</span>
                </label>
                <label className='flex items-center gap-2'>
                    <input
                        type='radio'
                        name='paymentMode'
                        className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                        checked={(payMode === "DC")}
                        onChange={() => setPayMode("DC")}
                    />
                    <span className='text-[#777] font-600'>Debit Cards / Net Banking</span>
                </label>
            </div>
            {
                !appConfig.isMobile && payMode && ReactDOM.createPortal(<>
                    {payMode === "COD" ?
                        <button className='my-5 text-white bg-black px-5 py-3 w-full text-center uppercase cursor-pointer'
                                onClick={() => placeOrder("ccavenue")} disabled={loading}>
                            verify otp for cod
                        </button>
                        :
                        <>
                            <button className='flex my-5 text-white bg-black px-5 py-3 w-full text-center uppercase cursor-pointer justify-center items-center'
                                    onClick={() => placeOrder("razorpay")} disabled={loading}>
                                <span className={"mr-2"}>Place order with</span><Image src={razorpayLogo} width={95} height={20}/>
                            </button>
                            <button className='flex mb-5 text-white bg-black px-5 py-3 w-full text-center uppercase cursor-pointer justify-center items-center'
                                    onClick={() => placeOrder("ccavenue")} disabled={loading}>
                                <span className={"mr-2"}>Place order with</span><Image src={ccavenue} width={96} height={15}/>
                            </button>
                        </>
                    }

                </>, document.getElementById("paymentButton"))
            }
            {
                !appConfig.isMobile && payMode === "COD" && ReactDOM.createPortal(<>
                    <td>COD Handling Fee</td>
                    <td>{currencySymbol}{80}</td>
                </>, document.getElementById("codCharges"))
            }
            {showOTPModal && ReactDOM.createPortal(
                <OtpModal closeModal={setShowOTPModal}/>,
                document.getElementById("paymentpopup"))}
        </Fragment>
    );

    return <>
        <label className={'font-500 my-10 flex items-center gap-2 ' + [appConfig.isMobile && "px-5"]}>
            <input
                className='ms-2 focus:ring-transparent text-[#777]'
                type='checkbox'
                name='isgift'
                id='isgift'
                checked={isGift}
                onChange={setIsGift}
            />
            <span className='text-[#777] font-600'>Is this a Gift?</span>
        </label>
        {isGift ? (
            <div className={'grid gap-x-8 -mt-6 mb-4 ' + [appConfig.isMobile ? "grid-cols-2 px-5" : "grid-cols-3"]}>
                <div className={appConfig.isMobile && "col-span-2"}>
                    <label className={labelClass} htmlFor='gift_msg'>
                        Your Personalized Message
                    </label>
                    <input
                        className={inputClass}
                        type='text'
                        name='gift_msg'
                        id='gift_msg'
                        value={giftData.gift_msg}
                        onChange={setGiftData}
                    />
                </div>
                <div>
                    <label className={labelClass} htmlFor='gift_msg_to'>
                        To
                    </label>
                    <input
                        className={inputClass}
                        type='text'
                        name='gift_msg_to'
                        id='gift_msg_to'
                        value={giftData.gift_msg_to}
                        onChange={setGiftData}
                        placeholder='Recipients Name'
                    />
                </div>
                <div>
                    <label className={labelClass} htmlFor='gift_msg_from'>
                        From
                    </label>
                    <input
                        className={inputClass}
                        type='text'
                        name='gift_msg_from'
                        id='gift_msg_from'
                        value={giftData.gift_msg_from}
                        onChange={setGiftData}
                    />
                </div>
            </div>
        ) : null}
        {appConfig.isMobile ? mobileView : browserView}
        <Toast show={show} hideToast={() => setShow(false)} bottom={"50px"}>
            <span>{message}</span>
        </Toast>
    </>;
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig,
        userConfig: state.userConfig,
        orderSummary: state.orderData.orderSummary,
        currentOrderId: state.orderData.currentOrderId
    }
}

export default connect(mapStateToProps, {setOrderSummary})(GiftAndPayment);

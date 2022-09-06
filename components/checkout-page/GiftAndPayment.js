import Link from "next/link";
import Toast from "../common/Toast";
import ReactDOM from "react-dom";
import React, {Fragment, useContext, useEffect, useReducer, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import {savePayment, updateAddressForOrder} from "./functions";
import OtpModal from "./OtpModal";
import currencyFormatter from "../../helpers/currencyFormatter";
import appSettings from "../../store/appSettings";

function GiftAndPayment({setActive}) {
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [isGift, setIsGift] = useReducer((state) => {
        return !state
    }, dataStore.orderSummary.payment ? dataStore.orderSummary.payment.is_gift : false);
    const [showOTPModal, setShowOTPModal] = useReducer((state) => {
        return !state
    }, false)
    const [giftData, setGiftData] = useReducer((state, e) => {
        return {...state, [e.target.name]: e.target.value}
    }, {
        gift_msg: dataStore.orderSummary.payment ? dataStore.orderSummary.payment.gift_msg : "",
        gift_msg_to: dataStore.orderSummary.payment ? dataStore.orderSummary.payment.gift_msg_to : "",
        gift_msg_from: dataStore.orderSummary.payment ? dataStore.orderSummary.payment.gift_msg_from : ""
    });

    const [payMode, setPayMode] = useState(dataStore.orderSummary.payment ? dataStore.orderSummary.payment.payment_mode : false);
    const [useWallet, setUseWallet] = useReducer((state) => {
        return !state
    }, dataStore.orderSummary.payment ? dataStore.orderSummary.payment.is_wallet : false);

    useEffect(() => {
        updateDataStore("orderSummary", {...dataStore.orderSummary, "payMode": payMode})
        if (dataStore.orderSummary.address_index >= 0 && dataStore.orderSummary.address_index < dataStore.userAddresses.length) {
        } else {
            updateAddressForOrder(0, dataStore, updateDataStore);
        }
    }, [payMode])

    useEffect(() => {
        updateDataStore("orderSummary", {...dataStore.orderSummary, "useWallet": useWallet})
    },[useWallet])

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
        savePayment(isGift, giftData, payMode, useWallet, dataStore, updateDataStore)
        setActive(5);
    }

    //forBrowser
    const placeOrder = async () => {
        if (isGift) {
            if (!giftData.gift_msg) {
                setShow(true)
                setMessage("Please select your gift message")
                return
            }
        }
        await savePayment(isGift, giftData, payMode, useWallet, dataStore, updateDataStore)
        if (payMode === "COD") {
            setShowOTPModal(true)
        }
    }

    const labelClass = "block text-[#777] font-600 mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;

    const mobileView = (
        <Fragment>
            <p className='text-l text-center font-bold mb-2'>How do you want to pay ?</p>
            {dataStore.userWallet.WalletAmount > 0 ? (
                <label className='pl-5 py-2 flex items-center'>
                    <input type='checkbox' checked={useWallet} onChange={setUseWallet} className='ms-2 focus:ring-transparent text-[#777]'/>
                    <p className='px-2 font-600 text-[#5F6061] text-sm'>
                        Use Wallet
                    </p>
                </label>
            ) : null}

            <div className='border border-solid border-[#f1f2f3] mb-4 py-5 mx-5'>
                <div className='flex flex-col mx-5 text-[#777]'>
                    <Link href='/salt/shipping-returns' passHref>
                        <a target={"_blank"} className='block text-[10px] font-semibold text-black underline ml-3'>COD Refund Policy</a>
                    </Link>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            checked={(payMode === "COD")}
                            onChange={() => setPayMode("COD")}
                        />
                        <span className='text-[#777] font-600'>Cash on Delivery</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            checked={(payMode === "CC")}
                            onChange={() => setPayMode("CC")}
                        />
                        <span className='text-[#777] font-600'>Cards</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            // checked={!!(payMode === "DC")}
                            // onChange={() => updatePayMode("DC")}
                        />
                        <span className='text-[#777] font-600'>Netbanking</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            // checked={!!(payMode === "DC")}
                            // onChange={() => updatePayMode("DC")}
                        />
                        <span className='text-[#777] font-600'>UPI</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            // checked={!!(payMode === "DC")}
                            // onChange={() => updatePayMode("DC")}
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
            {dataStore.userWallet.WalletAmount > 0 ? (
                <label className=' py-5 px-8 flex items-center'>
                    <input type='checkbox' checked={useWallet} onChange={setUseWallet} className='ms-2 focus:ring-transparent text-[#777]'/>
                    <p className='px-2 font-600 text-[#5F6061] text-base'>
                        Use Wallet
                    </p>
                </label>
            ) : null}
            <div className='bg-[#f1f2f3] py-5 px-8 grid grid-cols-3'>
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
                        <Link href='/salt/shipping-returns'>
                            <a className='block text-[10px] text-black underline ml-3'>COD Refund Policy</a>
                        </Link>
                    </span>
                </label>
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
                !dataStore.mobile && payMode && ReactDOM.createPortal(<div className='my-5 text-white bg-black px-5 py-3 w-full text-center uppercase'
                                                                           onClick={placeOrder}>
                    {payMode === "COD" ? "verify otp for cod" : "Place order & pay"}
                </div>, document.getElementById("paymentButton"))
            }
            {
                !dataStore.mobile && payMode === "COD" && ReactDOM.createPortal(<>
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
        <label className={'font-500 my-10 flex items-center gap-2 ' + [dataStore.mobile && "px-5"]}>
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
            <div className={'grid gap-x-8 -mt-6 mb-4 ' + [dataStore.mobile ? "grid-cols-2 px-5" : "grid-cols-3"]}>
                <div className={dataStore.mobile && "col-span-2"}>
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
        {dataStore.mobile ? mobileView : browserView}
        <Toast show={show} hideToast={() => setShow(false)} bottom={"50px"}>
            <span>{message}</span>
        </Toast>
    </>;
}

export default GiftAndPayment;

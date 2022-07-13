import Link from "next/link";
import Toast from "../common/Toast";
import React, { Fragment, useContext, useEffect, useState } from "react";
import AppWideContext from "../../store/AppWideContext";
import currencyFormatter from "../../helpers/currencyFormatter";
import orderTotal from "../../helpers/orderTotal";
import compareDecimalNumbers from "../../helpers/compareDecimalNumbers";

function GiftAndPayment({ giftPaymentComplete, updateCompleteness, setActive }) {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isGift, setIsGift] = useState(false);
    const [giftData, setGiftData] = useState({
        gift_msg: "",
        gift_msg_to: "",
        gift_msg_from: "",
    });

    const [payMode, setPayMode] = useState(null);
    const [giftCompleteness, setGiftCompleteness] = useState(false);
    const [useWallet, setUseWallet] = useState(dataStore.useWallet);

    const { finalPayable, toPay } = orderTotal(dataStore);

    const updateGift = (key, value) => {
        giftData[key] = value;
        setGiftData(giftData);
        setRefresh(!refresh);

        let completeness = true;
        if (giftData.gift_msg === "") {
            setMessage("PLease write a message for gift");
            setShow(true);
            completeness = false;
        } else if (giftData.gift_msg_to === "") {
            setMessage("Please write the name of the person receiving gift");
            setShow(true);
            completeness = false;
        } else if (giftData.gift_msg_from === "") {
            setMessage("PLease write the name of the person sending gift");
            setShow(true);
            completeness = false;
        }
        setGiftCompleteness(completeness);
        updateDataStore();
    };

    useEffect(() => {
        let completeness = false;
        if (((isGift && giftCompleteness) || !isGift) && payMode) completeness = true;

        if (completeness !== giftPaymentComplete) updateCompleteness(completeness);
    }, [isGift, giftCompleteness, payMode, giftPaymentComplete, updateCompleteness]);

    const updatePayMode = (mode) => {
        if (mode === "COD") {
            dataStore.currentOrderInCart.shipping_fee = 80.0;
        } else {
            dataStore.currentOrderInCart.shipping_fee = 0.0;
        }
        dataStore.currentOrderInCart.order = {
            order_id: dataStore.currentOrderId,
            is_gift: isGift,
            gift_msg: giftData.gift_msg,
            gift_msg_to: giftData.gift_msg_to,
            gift_msg_from: giftData.gift_msg_from,
            is_usd: !(dataStore.currCurrency === "inr"),
            payment_mode: mode,
            payment_status: "Not Paid",
            credited_in_account: false,
            curr_currency: "inr",
            ex_rate: 1,
        };
        updateDataStore("currentOrderInCart", dataStore.currentOrderInCart);
    };

    const updateUserWallet = () => {
        const newValue = !useWallet;
        updateDataStore("useWallet", newValue);
        setUseWallet(newValue);
        if (!payMode) setPayMode("COD");
    };

    const labelClass = "block text-[#777] font-600 mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;

    const mobileView = (
        <Fragment>
            <label className='font-500 my-10 flex items-center gap-2 pl-5'>
                <input
                    className='ms-2 focus:ring-transparent text-[#777]'
                    type='checkbox'
                    name='isgift'
                    id='isgift'
                    checked={isGift}
                    onChange={() => setIsGift(!isGift)}
                />
                <span className='text-[#777] font-600'>Is this a Gift?</span>
            </label>
            {isGift ? (
                <div className='grid grid-cols-1 -mt-6 mb-4 px-7'>
                    <div>
                        <label className={labelClass} htmlFor='gift_msg'>
                            Your Personalized Message
                        </label>
                        <input
                            className={inputClass}
                            type='text'
                            name='gift_msg'
                            id='gift_msg'
                            value={giftData.gift_msg}
                            onChange={(e) => updateGift("gift_msg", e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-2 mb-4'>
                        <div className='mr-0.5'>
                            <label className={labelClass} htmlFor='gift_msg_to'>
                                To
                            </label>
                            <input
                                className={inputClass}
                                type='text'
                                name='gift_msg_to'
                                id='gift_msg_to'
                                value={giftData.gift_msg_to}
                                onChange={(e) => updateGift("gift_msg_to", e.target.value)}
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
                                onChange={(e) => updateGift("gift_msg_from", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
            <p className='text-l text-center font-bold mb-2'>How do you want to pay ?</p>
            {/* {dataStore.userWallet.WalletAmount > 0 ? ( */}
            <label className='pl-5 py-5 flex items-center'>
                <input type='checkbox' checked={useWallet} onChange={() => updateUserWallet()} />
                <p className='px-2 font-medium'>
                    Use Wallet ({" "}
                    {dataStore.currCurrency === "inr"
                        ? currencyFormatter("INR").format(dataStore.userWallet.WalletAmount)
                        : currencyFormatter("USD").format(dataStore.userWallet.WalletAmount)}{" "}
                    )
                </p>
            </label>
            {/* ) : null} */}

            <div className='border border-solid border-[#f1f2f3] mb-4 py-5 mx-5'>
                <div className='flex flex-col mx-5 text-[#777]'>
                    <Link href='/salt/shipping-returns'>
                        <a className='block text-[10px] font-semibold text-black underline ml-3'>COD Refund Policy</a>
                    </Link>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            checked={!!(payMode === "COD")}
                            onChange={() => updatePayMode("COD")}
                        />
                        <span className='text-[#777] font-600'>Cash on Delivery</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            name='paymentMode'
                            className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                            checked={!!(payMode === "CC")}
                            onChange={() => updatePayMode("CC")}
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
                <div
                    onClick={() => {
                        setActive(3);
                    }}
                    className='cursor-pointer font-600 text-black py-2'
                >
                    <button className='font-600'>&lt; BACK </button>
                    <p className='text-xs uppercase'>Edit Size info</p>
                </div>
                <div
                    onClick={() => {
                        setActive(5);
                    }}
                    className='bg-black py-2 cursor-pointer text-white'
                >
                    <button className='font-600'> NEXT &gt;</button>
                    <p className='text-xs uppercase'>Review Order</p>
                </div>
            </div>
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    );
    const browserView = (
        <Fragment>
            <label className='font-500 my-10 flex items-center gap-2'>
                <input
                    className='ms-2 focus:ring-transparent text-[#777]'
                    type='checkbox'
                    name='isgift'
                    id='isgift'
                    checked={isGift}
                    onChange={() => setIsGift(!isGift)}
                />
                <span className='text-[#777] font-600'>Is this a Gift?</span>
            </label>
            {isGift ? (
                <div className='grid grid-cols-3 gap-x-8 -mt-6 mb-4'>
                    <div>
                        <label className={labelClass} htmlFor='gift_msg'>
                            Your Personalized Message
                        </label>
                        <input
                            className={inputClass}
                            type='text'
                            name='gift_msg'
                            id='gift_msg'
                            value={giftData.gift_msg}
                            onChange={(e) => updateGift("gift_msg", e.target.value)}
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
                            onChange={(e) => updateGift("gift_msg_to", e.target.value)}
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
                            onChange={(e) => updateGift("gift_msg_from", e.target.value)}
                        />
                    </div>
                </div>
            ) : null}
            <p className='text-xl mb-2'>Payment</p>
            {dataStore.userWallet.WalletAmount > 0 ? (
                <label className='bg-[#f1f2f3] py-5 px-8 grid grid-cols-1'>
                    <input type='checkbox' checked={useWallet} onChange={() => updateUserWallet()} />
                    Use Wallet ({" "}
                    {dataStore.currCurrency === "inr"
                        ? currencyFormatter("INR").format(dataStore.userWallet.WalletAmount)
                        : currencyFormatter("USD").format(dataStore.userWallet.WalletAmount)}{" "}
                    )
                </label>
            ) : null}
            <div className='bg-[#f1f2f3] py-5 px-8 grid grid-cols-3'>
                <label className='flex items-center gap-2'>
                    <input
                        type='radio'
                        name='paymentMode'
                        className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                        checked={!!(payMode === "COD")}
                        onChange={() => updatePayMode("COD")}
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
                        checked={!!(payMode === "CC")}
                        onChange={() => updatePayMode("CC")}
                    />
                    <span className='text-[#777] font-600'>Credit Cards</span>
                </label>
                <label className='flex items-center gap-2'>
                    <input
                        type='radio'
                        name='paymentMode'
                        className='text-[#777] focus:ring-transparent focus:ring-offset-0'
                        checked={!!(payMode === "DC")}
                        onChange={() => updatePayMode("DC")}
                    />
                    <span className='text-[#777] font-600'>Debit Cards / Net Banking</span>
                </label>
            </div>
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    );

    return dataStore.mobile ? mobileView : browserView;
}

export default GiftAndPayment;

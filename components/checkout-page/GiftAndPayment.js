import Link from "next/link";
import Toast from "../common/Toast";
import React, { Fragment, useContext, useEffect, useState } from "react";
import AppWideContext from "../../store/AppWideContext";

function GiftAndPayment({ giftPaymentComplete, updateCompleteness }) {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [isGift, setIsGift] = useState(false)
    const [giftData, setGiftData] = useState({
        gift_msg: "",
        gift_msg_to: "",
        gift_msg_from: ""
    })
    const [payMode, setPayMode] = useState(null)
    const [giftCompleteness,setGiftCompleteness] = useState(false)

    const updateInDatastore = ()=>{
        dataStore.currentOrderInCart.order={
            order_id: dataStore.currentOrderId,
            is_gift: isGift,
            gift_msg: giftData.gift_msg,
            gift_msg_to: giftData.gift_msg_to,
            gift_msg_from: giftData.gift_msg_from,
            is_usd: !(dataStore.currCurrency==="inr"),
            payment_mode: payMode,
            payment_status: "Not Paid",
            credited_in_account: false,
            curr_currency: "inr",
            ex_rate: 1
        }
        updateDataStore("currentOrderInCart",dataStore.currentOrderInCart)
    }

    const updateGift = (key, value) => {
        giftData[key] = value
        setGiftData(giftData)
        setRefresh(!refresh)

        let completeness = true
        if (giftData.gift_msg === "") {
            setMessage("PLease write a message for gift")
            setShow(true)
            completeness = false
        } else if (giftData.gift_msg_to === "") {
            setMessage("Please write the name of the person receiving gift")
            setShow(true)
            completeness = false
        } else if (giftData.gift_msg_from === "") {
            setMessage("PLease write the name of the person sending gift")
            setShow(true)
            completeness = false
        }
        setGiftCompleteness(completeness)
        updateDataStore()
    }


    useEffect(() => {
        let completeness = false
        if(
            ((isGift && giftCompleteness) || !isGift)
            && payMode
        )
            completeness = true

        if (completeness !== giftPaymentComplete)
            updateCompleteness(completeness)
    }, [isGift,giftCompleteness,payMode,giftPaymentComplete,updateCompleteness])

    const updatePayMode = (mode)=>{
        if(mode==="COD"){
            dataStore.currentOrderInCart.shipping_fee = 80
            updateDataStore("currentOrderInCart",dataStore.currentOrderInCart)
        }
        setPayMode(mode)
        updateInDatastore()
    }

    const labelClass = "block text-[#777] font-600 mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;

    const mobileView = null
    const browserView = (
        <Fragment>
            <label className="font-500 my-10 flex items-center gap-2">
                <input className="ms-2 focus:ring-transparent text-[#777]" type="checkbox" name="isgift" id="isgift" checked={isGift}
                    onChange={() => setIsGift(!isGift)} />
                <span className="text-[#777] font-600">Is this a Gift?</span>
            </label>
            {(isGift)
                ? <div className="grid grid-cols-3 gap-x-8 -mt-6 mb-4">
                    <div>
                        <label className={labelClass} htmlFor="gift_msg">Your Personalized Message</label>
                        <input className={inputClass} type="text" name="gift_msg" id="gift_msg"
                            value={giftData.gift_msg}
                            onChange={e => updateGift("gift_msg", e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="gift_msg_to">To</label>
                        <input className={inputClass} type="text" name="gift_msg_to" id="gift_msg_to"
                            value={giftData.gift_msg_to}
                            onChange={e => updateGift("gift_msg_to", e.target.value)}
                            placeholder="Recipients Name"
                        />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="gift_msg_from">From</label>
                        <input className={inputClass} type="text" name="gift_msg_from" id="gift_msg_from"
                            value={giftData.gift_msg_from}
                            onChange={e => updateGift("gift_msg_from", e.target.value)} />
                    </div>
                </div>
                : null
            }
            <p className="text-xl mb-2">Payment</p>
            <div className="bg-[#f1f2f3] py-5 px-8 grid grid-cols-3" value={payMode} onChange={(e) => updatePayMode(e.target.value)}>
                <label className="flex items-center gap-2">
                    <input type="radio" value="COD" name="paymentMode" className="text-[#777] focus:ring-transparent focus:ring-offset-0" />
                    <span className="text-[#777] font-600">
                        Cash on Delivery
                        <Link href="/salt/shipping-returns">
                            <a className="block text-[10px] text-black underline ml-3">COD Refund Policy</a>
                        </Link>
                    </span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" value="CC" name="paymentMode" className="text-[#777] focus:ring-transparent focus:ring-offset-0" />
                    <span className="text-[#777] font-600">Credit Cards</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" value="DC" name="paymentMode" className="text-[#777] focus:ring-transparent focus:ring-offset-0" />
                    <span className="text-[#777] font-600">Debit Cards / Net Banking</span>
                </label>
            </div>
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    )

    return (dataStore.mobile) ? mobileView : browserView
}

export default GiftAndPayment

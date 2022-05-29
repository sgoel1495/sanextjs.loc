import Link from "next/link";
import Toast from "../common/Toast";
import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import getUserO from "../../helpers/getUserO";

function GiftAndPayment({giftPaymentComplete, updateCompleteness}) {
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [refresh,setRefresh] = useState(false)
    const [isGift, setIsGift] = useState(false)
    const [giftData, setGiftData] = useState({
        gift_msg: "",
        gift_msg_to: "",
        gift_msg_from: ""
    })
    const [payMode, setPayMode] = useState(null)

    const userO = getUserO(dataStore)

    const updateGift = (key, value) => {
        giftData[key] = value
        setGiftData(giftData)
        setRefresh(!refresh)
    }

    useEffect(()=>{
        const completeness = (gitCardCompleteness && paymentCompleteness)
        if(completeness!==giftPaymentComplete)
            updateCompleteness(completeness)
    },[refresh])

    const gitCardCompleteness = ()=>{
        let completeness = false

        return completeness
    }
    const paymentCompleteness = ()=>{
        let completeness = false

        return completeness
    }


    const labelClass = "block text-[14px] mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;

    const mobileView = null
    const browserView = <Fragment>
        <label>
            <input type="checkbox" name="isgift" id="isgift" checked={isGift}
                   onChange={() => setIsGift(!isGift)}/>
            <span>Is this a Gift?</span>
        </label>
        {(isGift)
            ? <div>
                <div>
                    <label className={labelClass} htmlFor="gift_msg">Your Personalized Message</label>
                    <input className={inputClass} type="text" name="gift_msg" id="gift_msg"
                           value={giftData.gift_msg}
                           onChange={e => updateGift("gift_msg", e.target.value)}/>
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
                           onChange={e => updateGift("gift_msg_from", e.target.value)}/>
                </div>
            </div>
            : null
        }
        <div>Payment</div>
        <div value={payMode} onChange={(e) => setPayMode(e.target.value)}>
            <label>
                <input type="radio" value="Not Paid" name="paymentMode"/>
                <span>Cash on Delivery</span>
                <Link href="/salt/shipping-returns">
                    <a>COD Refund Policy</a>
                </Link>
            </label>
            <label>
                <input type="radio" value="CC" name="paymentMode"/>
                <span>Credit Cards</span>
            </label>
            <label>
                <input type="radio" value="DC" name="paymentMode"/>
                <span>Debit Cards / Net Banking</span>
            </label>
        </div>
        <Toast show={show} hideToast={() => setShow(false)}>
            <span>{message}</span>
        </Toast>
    </Fragment>

    return (dataStore.mobile) ? mobileView : browserView
}

export default GiftAndPayment

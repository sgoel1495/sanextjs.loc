import React, {Fragment, useContext, useState} from "react";
import Toast from "../common/Toast";
import AppWideContext from "../../store/AppWideContext";
import getUserO from "../../helpers/getUserO";
import {apiCall} from "../../helpers/apiCall";

function PromoCode(){
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [promoCode,setPromoCode] = useState(null)
    const userO = getUserO(dataStore)

    const applyPromo = async ()=>{
        if(!promoCode){
            setMessage("Please enter the code before applying")
            setShow(true)
        } else {
            const query = {
                user: userO,
                order:{
                    order_id: dataStore.currentOrderId,
                    coupon_code: promoCode
                }
            }
            const promoCall = await apiCall("applyCoupon",dataStore.apiToken,query)
            if(promoCall.hasOwnProperty("coupon_apply") && promoCall.coupon_apply.hasOwnProperty("msg")
                && promoCall.coupon_apply.msg==="Success"){
                updateDataStore("orderPromo",promoCall)
                setMessage("Coupon Accepted")
                setShow(true)
            } else {
                setMessage("Coupon not valid / unable to apply")
                setShow(true)
            }
        }
    }

    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;

    const mobileView = null
    const browserView = <Fragment>
        <div>Promo Code</div>
        <div>
            <div>
                <input className={inputClass} type="text" name="promocode" id="promocode" value={promoCode}
                       onChange={e => setPromoCode(e.target.value)}/>
                <span><span>*</span>Not applicable for sales item</span>
            </div>
            <div onClick={applyPromo}>
                APPLY
            </div>
        </div>
        <Toast show={show} hideToast={() => setShow(false)}>
            <span>{message}</span>
        </Toast>

    </Fragment>


    return (dataStore.mobile) ? mobileView : browserView
}

export default PromoCode
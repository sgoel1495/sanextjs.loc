import React, {Fragment, useContext, useState} from "react";
import Toast from "../common/Toast";
import AppWideContext from "../../store/AppWideContext";
import getUserO from "../../helpers/getUserO";
import {apiCall} from "../../helpers/apiCall";
import Accordion from "../common/accordion";
import {getUserObject} from "../../helpers/addTocart";

function PromoCode() {
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [promoCode, setPromoCode] = useState(dataStore.orderSummary && dataStore.orderSummary.coupon_apply ? dataStore.orderSummary.coupon_apply.coupon : "");

    const applyPromo = async () => {
        if (!promoCode) {
            setMessage("Please enter the code before applying");
            setShow(true);
        } else {
            const query = {
                user: await getUserObject(dataStore, updateDataStore),
                order: {
                    order_id: dataStore.currentOrderId,
                    coupon_code: promoCode,
                },
            };
            const promoCall = await apiCall("applyCoupon", dataStore.apiToken, query);
            if (promoCall.hasOwnProperty("coupon_apply") && promoCall.coupon_apply.hasOwnProperty("msg") && promoCall.coupon_apply.msg === "Success") {
                updateDataStore("orderSummary", {...dataStore.orderSummary, ...promoCall});
                setMessage("Coupon Accepted");
                setShow(true);
            } else {
                setMessage("Coupon not valid / unable to apply");
                setShow(true);
            }
        }
    };

    const inputClass = "block w-full border-transparent text-[14px] py-2 focus:ring-transparent focus:border-white";

    const mobileView = (
        <Fragment>
            <Accordion title={"Have a Promo code?"} style={"p-5"} titleStyle={"font-bold tracking-[0.5px]"}>
                <div className='bg-[#f1f2f3] py-5 px-8 flex gap-10'>
                    <div className='flex-[3]'>
                        <input
                            className={inputClass}
                            type='text'
                            name='promocode'
                            id='promocode'
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <span className='text-xs text-[#777] leading-none'>* Not applicable for sales item</span>
                    </div>
                    <div className='flex-[2]'>
                        <button className='bg-black px-4 py-1.5 my-1 text-white tracking-wide font-500' onClick={applyPromo}>
                            APPLY
                        </button>
                    </div>
                </div>
            </Accordion>
            <Toast show={show} hideToast={() => setShow(false)} bottom={"40px"}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    );
    const browserView = (
        <Fragment>
            <p className='text-xl mb-2'>Promo Code</p>
            <div className='bg-[#f1f2f3] py-5 px-8 flex gap-10'>
                <div className='flex-[3]'>
                    <input
                        className={inputClass}
                        type='text'
                        name='promocode'
                        id='promocode'
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <span className='text-xs text-[#777] font-500 leading-none'>* Not applicable for sales item</span>
                </div>
                <div className='flex-[2]'>
                    <button className='bg-black px-4 py-1.5 my-1 text-white tracking-wide font-500' onClick={applyPromo}>
                        APPLY
                    </button>
                </div>
            </div>
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    );

    return dataStore.mobile ? mobileView : browserView;
}

export default PromoCode;

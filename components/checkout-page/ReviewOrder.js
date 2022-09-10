import React, {Fragment, useContext, useReducer, useState} from "react";
import Accordion from "../common/accordion";
import ProductCartView from "../common/ProductCartView/ProductCartView";
import ReactDom from "react-dom";
import OtpModal from "./OtpModal";
import {connect} from "react-redux";

function ReviewOrder(props) {
    const currencySymbol = props.userConfig.currSymbol;
    const address = props.orderSummary.address ? props.orderSummary.address : {};
    const measurements = props.orderSummary.measurements ? props.orderSummary.measurements : {};
    const [showOTPModal, setShowOTPModal] = useReducer((state) => {
        return !state
    }, false)
    let total = props.orderSummary.gross - (props.orderSummary.payment && props.orderSummary.payment.is_wallet ? props.orderSummary.payment.cash_from_wallet : 0) + (props.orderSummary.payment && props.orderSummary.payment.payment_mode === "COD" ? 80 : 0)
    let isCOD = props.orderSummary.payment && (props.orderSummary.payment.payment_mode === "COD")

    const mobileView = (
        <Fragment>
            <Accordion
                style={"mt-5"}
                animationDuration={"duration-200"}
                titleStyle={`py-5 px-5`}
                title={
                    <div className='text-xl mb-2'>
                        Review Order - <span className='text-base font-500'>{props.orderSummary.cart && Object.keys(props.orderSummary.cart).length} item in bag</span>
                    </div>
                }
                bodyStyle={`px-8 grid grid-cols-1 gap-10 border-solid`}
            >
                <ProductCartView isMobile={false}/>
            </Accordion>
            <div className='px-5'>
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
                    onClick={isCOD ? setShowOTPModal : () => {
                    }}
                    className='bg-black py-2 cursor-pointer text-white'
                >
                    <button className='font-600 uppercase px-10'>{isCOD ? "verify otp for cod" : "Place order & pay"}</button>
                </div>
            </div>
            {showOTPModal && ReactDom.createPortal(
                <OtpModal isMobile={true} closeModal={setShowOTPModal}/>,
                document.getElementById("paymentpopup"))}
        </Fragment>
    );
    const browserView = (
        <Fragment>
            <Accordion
                style={"mt-5"}
                animationDuration={"duration-200"}
                titleStyle={`bg-[#f1f2f3] py-5 px-8`}
                title={
                    <div className='text-xl mb-2'>
                        Review Order - <span className='text-base font-500'>{props.orderSummary.cart && Object.keys(props.orderSummary.cart).length} item in bag</span>
                    </div>
                }
                bodyStyle={`bg-[#f1f2f3] px-8 grid grid-cols-2 gap-10`}
            >
                <ProductCartView/>
            </Accordion>
        </Fragment>
    );

    return props.appConfig.isMobile ? mobileView : browserView;
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        userConfig: state.userConfig,
        orderSummary:state.orderData.orderSummary
    }
}

export default connect(mapStateToProps)(ReviewOrder);

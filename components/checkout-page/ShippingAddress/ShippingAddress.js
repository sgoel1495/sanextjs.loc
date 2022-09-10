import React, {Fragment, useContext, useEffect, useReducer, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import DisplayAddress from "./DisplayAddress";
import AddressForm from "./AddressForm";
import Toast from "../../common/Toast";
import ReactDom from "react-dom";
import UserLogin from "../../user/login/UserLogin";
import {connect} from "react-redux";
import {setShowLogin} from "../../../ReduxStore/reducers/userConfigSlice";

function ShippingAddress({setActive, appConfig, userData, orderSummary, showLogin, ...props}) {
    const [selectedAddressIndex, setSelectedAddressIndex] = useReducer((state, payload) => {
        if (userData.userServe.email || (userData.userAddresses && userData.userAddresses.length)) {
            return payload
        } else {
            return -1
        }
    }, null);
    const [show, setShow] = useState(false);
    const [review, setReview] = useState(false)

    const openModal = () => {
        props.setShowLogin(true);
    }
    const closeModal = () => {
        props.setShowLogin(false);
    }

    const nextModal = () => {
        let index = parseInt(orderSummary.address_index)
        if (!(index >= 0 && index < userData.userAddresses.length)) {
            setShow(true);
        } else if (review) {
            setActive(3);
        } else {
            setReview(true)
        }
    }
    const back = () => {
        if (review) {
            setReview(false)
        } else {
            setActive(1)
        }
    }
    useEffect(() => {
        if (showLogin) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showLogin])

    useEffect(() => {
        if (userData.userServe.email) {
            if (userData.userAddresses && userData.userAddresses.length) {
                setSelectedAddressIndex(null)
            } else {
                setSelectedAddressIndex(-1)
            }
        } else {
            if (userData.userAddresses && userData.userAddresses.length) {
                if (appConfig.isMobile)
                    setSelectedAddressIndex(0)
                else
                    setSelectedAddressIndex(null)
            } else {
                setSelectedAddressIndex(-1)
            }

        }
    }, [userData.userServe.email, userData.userServe.temp_user_id, appConfig.isMobile])

    const mobileView = (
        <Fragment>
            {userData.userServe.email ? null : (
                <div className="grid place-items-center mt-10">
                    <button className='mb-2 underline font-500' onClick={openModal}>
                        Already have an account?
                    </button>
                </div>
            )}
            <p className='text-l font-bold mb-2 pt-2 text-center'>{review && "Review"} Shipping Address</p>
            {selectedAddressIndex == null || review ? (
                <div className='grid grid-cols-1 mx-6'>
                    {
                        review ?
                            <div className={'p-4 border-2 border-solid border-[#f1f2f3] mb-4'}>
                                <div className='flex flex-col gap-y-1 mb-5 text-[#777]'>
                                    <p className='font-500'>
                                        {orderSummary.address.name} {orderSummary.address.lastname}
                                    </p>
                                    <p className='text-xs text-[#555]'>
                                        {orderSummary.address.address}, {orderSummary.address.landmark}
                                    </p>
                                    <p className='text-xs text-[#555]'>
                                        {orderSummary.address.city}, {orderSummary.address.state} {orderSummary.address.zip_code}
                                    </p>
                                    <p className='text-xs text-[#555]'>{orderSummary.address.country}</p>
                                    <p className='text-xs text-[#555]'>T: {orderSummary.address.phone}</p>
                                </div>
                            </div>
                            :
                            <DisplayAddress setSelectedAddressIndex={setSelectedAddressIndex} isMobile={true}/>
                    }

                    <div className='bg-white text-center grid grid-cols-2 fixed h-auto w-full left-0 right-0 bottom-0 mt-4'>
                        <div
                            onClick={back}
                            className='cursor-pointer font-600 text-black py-2'
                        >
                            <button className='font-600'>&lt; BACK</button>
                            <p className='text-xs uppercase'>{review ? "edit address" : "Payment Amount"}</p>
                        </div>
                        <div
                            onClick={nextModal}
                            className='bg-black py-2 cursor-pointer text-white'
                        >
                            <button className='font-600'>NEXT &gt;</button>
                            <p className='text-xs uppercase'>{review ? "enter size info" : "Review Address"}</p>
                        </div>
                    </div>
                </div>
            ) : <AddressForm isMobile={true} selectedAddressIndex={selectedAddressIndex} setSelectedAddressIndex={setSelectedAddressIndex} setReview={setReview}
                             setActive={setActive}/>
            }
        </Fragment>
    );
    const browserView = <Fragment>
        {userData.userServe.email ? null : (
            <button className='mb-2 underline font-500' onClick={openModal}>
                Already have an account?
            </button>
        )}
        <p className='text-xl mb-2'>Shipping Address</p>
        {selectedAddressIndex == null ? (
                <div className='grid grid-cols-3 gap-6 mb-10'>
                    <DisplayAddress setSelectedAddressIndex={setSelectedAddressIndex} isMobile={false}/>
                </div>
            ) :
            <>

                <AddressForm isMobile={false} selectedAddressIndex={selectedAddressIndex} setSelectedAddressIndex={setSelectedAddressIndex}/>
            </>
        }

    </Fragment>


    return <>
        {appConfig.isMobile ? mobileView : browserView}
        <Toast show={show} hideToast={() => setShow(false)} bottom={'50px'}>
            <span>Please Select an Address</span>
        </Toast>
    </>
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig,
        orderSummary: state.orderData.orderSummary,
        showLogin: state.userConfig.showLogin
    }
}

export default connect(mapStateToProps, {setShowLogin})(ShippingAddress);

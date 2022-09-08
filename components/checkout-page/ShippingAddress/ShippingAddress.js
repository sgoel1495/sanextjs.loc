import React, {Fragment, useContext, useEffect, useReducer, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import DisplayAddress from "./DisplayAddress";
import AddressForm from "./AddressForm";
import Toast from "../../common/Toast";
import ReactDom from "react-dom";
import UserLogin from "../../user/login/UserLogin";

function ShippingAddress({setActive}) {
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [selectedAddressIndex, setSelectedAddressIndex] = useReducer((state, payload) => {
        if (dataStore.userServe.email || (dataStore.userAddresses && dataStore.userAddresses.length)) {
            return payload
        } else {
            return -1
        }
    }, null);
    const [show, setShow] = useState(false);
    const [review, setReview] = useState(false)
    const [showSidebarMenuUser, setShowSidebarMenuUser] = useState(dataStore.showSidebarMenuUser);
    const openModal = () => {
        updateDataStore("showSidebarMenuUser", false);
        setShowSidebarMenuUser(true);
    }
    const closeModal = () => {
        updateDataStore("showSidebarMenuUser", false);
        setShowSidebarMenuUser(false);
    }

    const nextModal = () => {
        let index = parseInt(dataStore.orderSummary.address_index)
        if (!(index >= 0 && index < dataStore.userAddresses.length)) {
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
        if (showSidebarMenuUser) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenuUser])

    useEffect(() => {
        if (dataStore.userServe.email) {
            if (dataStore.userAddresses && dataStore.userAddresses.length) {
                setSelectedAddressIndex(null)
            } else {
                setSelectedAddressIndex(-1)
            }
        } else {
            if (dataStore.userAddresses && dataStore.userAddresses.length) {
                if (dataStore.mobile)
                    setSelectedAddressIndex(0)
                else
                    setSelectedAddressIndex(null)
            } else {
                setSelectedAddressIndex(-1)
            }

        }
    }, [dataStore.userServe.email, dataStore.userServe.temp_user_id, dataStore.mobile])

    const mobileView = (
        <Fragment>
            {dataStore.userData.contact ? null : (
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
                                        {dataStore.orderSummary.address.name} {dataStore.orderSummary.address.lastname}
                                    </p>
                                    <p className='text-xs text-[#555]'>
                                        {dataStore.orderSummary.address.address}, {dataStore.orderSummary.address.landmark}
                                    </p>
                                    <p className='text-xs text-[#555]'>
                                        {dataStore.orderSummary.address.city}, {dataStore.orderSummary.address.state} {dataStore.orderSummary.address.zip_code}
                                    </p>
                                    <p className='text-xs text-[#555]'>{dataStore.orderSummary.address.country}</p>
                                    <p className='text-xs text-[#555]'>T: {dataStore.orderSummary.address.phone}</p>
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
        {dataStore.userData.contact ? null : (
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
        {dataStore.mobile ? mobileView : browserView}
        {!dataStore.userServe.email && showSidebarMenuUser && ReactDom.createPortal(
            <UserLogin closeModal={closeModal.bind(this)} isMobile={true}/>,
            document.getElementById("userband"))}
        <Toast show={show} hideToast={() => setShow(false)} bottom={'50px'}>
            <span>Please Select an Address</span>
        </Toast>
    </>
}

export default ShippingAddress;

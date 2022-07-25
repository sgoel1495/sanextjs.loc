import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import DisplayAddress from "./DisplayAddress";
import AddressForm from "./AddressForm";
import Toast from "../../common/Toast";

function ShippingAddress({setActive}) {
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [show, setShow] = useState(false);
    const [review, setReview] = useState(false)

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

    const mobileView = (
        <Fragment>
            <p className='text-l font-bold mb-2 pt-2 text-center'>{review && "Review"} Shipping Address</p>
            {selectedAddressIndex == null ? (
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
                            onClick={() => review ? setReview(false) : setActive(1)}
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
            ) : <AddressForm isMobile={true} selectedAddressIndex={selectedAddressIndex} setSelectedAddressIndex={setSelectedAddressIndex}/>
            }
        </Fragment>
    );
    const browserView = <Fragment>
        <p className='text-xl mb-2'>Shipping Address</p>
        {selectedAddressIndex == null ? (
                <div className='grid grid-cols-3 gap-6 mb-10'>
                    <DisplayAddress setSelectedAddressIndex={setSelectedAddressIndex} isMobile={false}/>
                </div>
            ) :
            <>
                {dataStore.userData.contact ? null : (
                    <button className='mb-2 underline font-500' onClick={() => updateDataStore("showSidebarMenuUser", true)}>
                        Already have an account?
                    </button>
                )}
                <AddressForm isMobile={false} selectedAddressIndex={selectedAddressIndex} setSelectedAddressIndex={setSelectedAddressIndex}/>
            </>
        }
    </Fragment>


    return <>
        {dataStore.mobile ? mobileView : browserView}
        <Toast show={show} hideToast={() => setShow(false)} bottom={'50px'}>
            <span>Please Select an Address</span>
        </Toast>
    </>
}

export default ShippingAddress;

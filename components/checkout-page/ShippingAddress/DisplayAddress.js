import React, {useContext} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {updateAddressForOrder} from "../functions";
import {connect} from "react-redux";
import {setOrderSummary} from "../../../ReduxStore/reducers/orderSlice";

/**
 * Display 3 addresses on the Checkout page
 * selected Address index and edit is passed back
 * It is called ONLY FOR REGISTERED USERS
 * @param editAddressIndex has 2 values. Index which tells the address in question and 2 whether to edit it
 * @constructor
 */
function DisplayAddress({setSelectedAddressIndex, isMobile, userData, orderSummary, currentOrderId, appConfig, ...props}) {

    React.useEffect(() => {
        if (orderSummary) {
            if (orderSummary.address_index >= 0 && orderSummary.address_index < userData.userAddresses.length) {
                props.setOrderSummary({...orderSummary, "address": userData.userAddresses[orderSummary.address_index]})
            } else {
                props.setOrderSummary({...orderSummary, "address": {}, "address_index": -1})
            }
        }
    }, [userData.userAddresses])


    let returnValue = userData.userAddresses.slice(0, 3).map((address, index) => {
        return <div className={isMobile ? 'p-4 border border-solid border-[#f1f2f3] mb-4' : "bg-[#f1f2f3] p-5"} key={index}>
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
            <div className='flex items-center justify-evenly text-sm'>
                <button className='underline text-[#555]' onClick={() => setSelectedAddressIndex(index)}>
                    Edit
                </button>
                {index === orderSummary.address_index ? (
                    <button className='px-5 py-2'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            className='w-5 h-full'
                            fill='#008000'
                            stroke='#008000'
                            strokeWidth={2}
                        >
                            <path d='m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z'/>
                        </svg>
                    </button>
                ) : (
                    <button className='shadow-lg border border-[#777] px-5 py-2'
                            onClick={() => updateAddressForOrder(index, userData, {orderSummary, currentOrderId}, appConfig.apiToken, props.setOrderSummary)}>
                        Ship Here
                    </button>
                )}
            </div>
        </div>
    });
    if (returnValue.length !== 3 && userData.userServe.email) {
        returnValue.push(<span className={"text-[#777777] font-600 cursor-pointer" + [isMobile ? "" : " col-span-2"]} onClick={() => setSelectedAddressIndex(-1)}>Add New</span>)
    }
    return returnValue;
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig,
        orderSummary: state.orderData.orderSummary,
        currentOrderId: state.orderData.currentOrderId
    }
}

export default connect(mapStateToProps, {setOrderSummary})(DisplayAddress);

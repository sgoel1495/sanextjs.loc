import { Fragment, useContext, useEffect, useState } from "react";
import AppWideContext from "../../store/AppWideContext";

/**
 * Display 3 addresses on the Checkout page
 * selected Address index and edit is passed back
 * It is called ONLY FOR REGISTERED USERS
 * @param editAddressIndex has 2 values. Index which tells the address in question and 2 whether to edit it
 * @constructor
 */
function DisplayAddress({ addressIndex }) {
    const { dataStore } = useContext(AppWideContext)
    const [selectedAddress, setSelectedAddress] = useState(null)


    const display = () => {
        let returnValue = null
        dataStore.userAddresses.slice(0, 3).forEach((address, index) => {
            returnValue = (
                <>
                    {returnValue}
                    <div className="bg-[#f1f2f3] p-5">
                        <div className="flex flex-col gap-y-1 mb-5 text-[#777]">
                            <p className="font-500">{address.name} {address.lastname}</p>
                            <p className="text-xs text-[#555]">{address.address}, {address.landmark}</p>
                            <p className="text-xs text-[#555]">{address.city}, {address.state} {address.zip_code}</p>
                            <p className="text-xs text-[#555]">{address.country}</p>
                            <p className="text-xs text-[#555]">T: {address.phone}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <button className="underline text-[#555]" onClick={() => addressIndex(index, true)}>Edit</button>
                            {(index === selectedAddress)
                                ? <button className="px-5 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-full" fill="#008000" stroke="#008000" strokeWidth={2}><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                                </button>
                                : <button className="shadow-lg border border-[#777] px-5 py-2" onClick={() => { setSelectedAddress(index); addressIndex(index, false) }}>
                                    Ship Here
                                </button>
                            }
                        </div>
                    </div>
                </>
            )
        })

        return returnValue
    }

    return (dataStore.mobile) ? null : display()
}

export default DisplayAddress
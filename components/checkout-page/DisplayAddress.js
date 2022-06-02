import {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../store/AppWideContext";

/**
 * Display 3 addresses on the Checkout page
 * selected Address index and edit is passed back
 * It is called ONLY FOR REGISTERED USERS
 * @param editAddressIndex has 2 values. Index which tells the address in question and 2 whether to edit it
 * @constructor
 */
function DisplayAddress({addressIndex}){
    const { dataStore } = useContext(AppWideContext)
    const [selectedAddress,setSelectedAddress] = useState(null)


    const display = ()=>{
        let returnValue = null
        dataStore.userAddresses.slice(0,3).forEach((address,index)=>{
            returnValue = <Fragment>
                {returnValue}
                <div>
                    <span>{address.name} {address.lastname}</span>
                    <span>{address.address}, {address.landmark}</span>
                    <span>{address.city}, {address.state} {address.zip_code}</span>
                    <span>{address.country}</span>
                    <span>T: {address.phone}</span>
                </div>
                <div>
                    <div onClick={()=>addressIndex(index,true)}>Edit</div>
                    {(index===selectedAddress)
                        ?<div>CHECK ICON</div>
                        :<div onClick={()=>{setSelectedAddress(index);addressIndex(index,false)}}>
                            SHIP HERE
                        </div>
                    }
                </div>
            </Fragment>
        })

        return returnValue
    }

    return (dataStore.mobile)? null: display()
}

export default DisplayAddress
import {Fragment, useContext, useState} from "react";
import AppWideContext from "../../store/AppWideContext";


function ShippingAddress(){
    const { dataStore,updateDataStore } = useContext(AppWideContext);
    const cAddress = dataStore.selectedAddress || dataStore.defaultdAddress
    const emptyAddress = {
        "name": "",
        "lastname": "",
        "email": (dataStore.userData.contact)?dataStore.userData.contact:"",
        "phone": (dataStore.userData.contact)?dataStore.userServe.phone_number:"",
        "address": "",
        "landmark": "",
        "country": "India",
        "zip_code": "",
        "state": "",
        "city": ""
    }
    const [address, setAddress]=useState((cAddress)?cAddress:emptyAddress)

    const [extraMeasure,setExtraMeasure]=useState({
        "tops_brand" : "",
        "tops_size" : "",
        "jeans_pants_size" : 0
    })

    const updateAddressValue=(key,value)=>{
        address[key]=value
        setAddress(address)
    }

    const updateExtraMeasureValue=(key,value)=>{
        extraMeasure[key]=value
        setExtraMeasure(address)
    }

    const labelClass = "block text-[14px] mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;

    const mobileView = null
    const browserView = ()=>{
        return <Fragment>
            {(dataStore.userData.contact)
                ?null
                :<div onClick={()=>updateDataStore("showSidebarMenuUser",true)}>Already have an account?</div>
            }
            <div>Shipping Address</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[#555]">
                <div>
                    <label className={labelClass} htmlFor="name">First Name</label>
                    <input className={inputClass} type="text" name="name" id="name" value={address.name} onChange={e => updateAddressValue("name", e.target.value)} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="lastname">Last Name</label>
                    <input className={inputClass} type="text" name="lastname" id="lastname" value={address.lastname} onChange={e => updateAddressValue("lastname", e.target.value)} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="email">Email</label>
                    <input className={inputClass} type="email" name="email" id="email" value={address.email} onChange={e => updateAddressValue("email", e.target.value)} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="phone">Telephone</label>
                    <input className={inputClass} type="number" name="phone" id="phone" value={address.phone} onChange={e => updateAddressValue("phone", e.target.value)} />
                </div>
            </div>

        </Fragment>
    }

    return (dataStore.mobile)? mobileView:browserView()
}

export default ShippingAddress
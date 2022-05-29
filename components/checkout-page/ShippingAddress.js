import React, {Fragment, useContext, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import {DateTime} from "luxon";
import StatesAndCitiesOptions from "../../helpers/StatesAndCitiesOptions"
import Toast from "../common/Toast";
import Link from "next/link"
import getUserO from "../../helpers/getUserO";
import {apiCall} from "../../helpers/apiCall";
import PromoCode from "./PromoCode";
import GiftAndPayment from "./GiftAndPayment";
import CreateMyAccount from "../../CreateMyAccount";

function ShippingAddress() {
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const cAddress = dataStore.selectedAddress || dataStore.defaultdAddress
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const userO = getUserO(dataStore)

    const emptyAddress = {
        "name": "",
        "lastname": "",
        "email": (dataStore.userData.contact) ? dataStore.userData.contact : "",
        "phone": (dataStore.userData.contact) ? dataStore.userServe.phone_number : "",
        "address": "",
        "landmark": "",
        "country": "India",
        "zip_code": "",
        "state": null,
        "city": ""
    }
    const [address, setAddress] = useState((cAddress) ? cAddress : emptyAddress)
    const [extraMeasure, setExtraMeasure] = useState({
        "tops_brand": "",
        "tops_size": "",
        "jeans_pants_size": 0
    })
    const [bDay,setBDay] = useState({
        birthday:"",
        anniversary:""
    })
    const [isGift,setIsGift] = useState(false)
    const [giftData,setGiftData] = useState({
        gift_msg: "",
        gift_msg_to: "",
        gift_msg_from: ""
    })
    const [payMode,setPayMode] = useState(null)
    const [refresh,setRefresh] = useState(false)
    const updateAddressValue = (key, value) => {
        address[key] = value
        setAddress(address)
        setRefresh(!refresh)
    }

    const updateZipcode = async (zip)=>{
        //checkZip with db before update
        setRefresh(!refresh)
    }

    const updateExtraMeasureValue = (key, value) => {
        extraMeasure[key] = value
        setExtraMeasure(extraMeasure)
        setRefresh(!refresh)
    }
    const updateBDay = (key, value) => {
        bDay[key] = value
        setBDay(bDay)
        setRefresh(!refresh)
    }

    const brands = [
        "Marks & Sprencer's", "Zara", "H&M", "Allen Sally", "Van Heusen", "Vero Moda", "Mango"
    ]
    const topSizes = [
        "< XS", "XS", "M", "L", "XL", "XXL",
        "UK 6", "UK 8", "UK 10", "UK 12", "UK 14", "UK 16", "UK 18",
        "EU 34", "EU 36", "EU 38", "EU 40", "EU 42", "EU 44", "EU 46",

    ]
    const pantSizes = [
        "26","28","30","32","34","36"
    ]
    const selectOptions = (w) => {
        let returnValues = <option className={inputSelect} value="">Please Select</option>;
        w.forEach(size => {
            returnValues = <Fragment>
                {returnValues}
                <option className={inputSelect} value={size}>{size}</option>
            </Fragment>
        })

        return returnValues;
    }

    const checkAndSave = async ()=>{

    }

    /*
    "{
 ""user"" : { ""contact"" : """",
   ""is_guest"" : true,
   ""temp_user_id"" : ""1600001858486""
 },
 ""order"" : {
   ""order_id"": ""1600074229"",
   ""coupon_code"": ""SUCCESS15""
 },
 ""token"" : ""b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0""
}"
     */


    const labelClass = "block text-[14px] mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;
    const optionClass = "grid grid-cols-2 gap-x-5 justify-center"
    const inputSelect = "w-[105px] font-600 text-xs focus:ring-transparent focus:border-black";
    const inputField = "w-[105px] border border-black bg-[#f1f2f3] placeholder:font-600 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black";
    const focusStyle = "focus:ring-offset-0 focus:ring-0"
    const inputStyle = `block w-full border-none bg-black/5 px-4 py-3 ${focusStyle}`;

    const mobileView = null
    const browserView = () => {
        return <Fragment>
            {(dataStore.userData.contact)
                ? null
                : <div onClick={() => updateDataStore("showSidebarMenuUser", true)}>Already have an account?</div>
            }
            <div>Shipping Address</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[#555]">
                <div>
                    <label className={labelClass} htmlFor="name">First Name</label>
                    <input className={inputClass} type="text" name="name" id="name" value={address.name}
                           onChange={e => updateAddressValue("name", e.target.value)}/>
                </div>
                <div>
                    <label className={labelClass} htmlFor="lastname">Last Name</label>
                    <input className={inputClass} type="text" name="lastname" id="lastname" value={address.lastname}
                           onChange={e => updateAddressValue("lastname", e.target.value)}/>
                </div>
                <div>
                    <label className={labelClass} htmlFor="email">Email</label>
                    <input className={inputClass} type="email" name="email" id="email" value={address.email}
                           onChange={e => updateAddressValue("email", e.target.value)}/>
                </div>
                <div>
                    <label className={labelClass} htmlFor="phone">Telephone</label>
                    <input className={inputClass} type="number" name="phone" id="phone" value={address.phone}
                           onChange={e => updateAddressValue("phone", e.target.value)}/>
                </div>
            </div>
            <div className={'flex flex-col items-center gap-y-2'}>
                <div>1. What Size Tops do you usually wear?</div>
                <div>
                    <div className={optionClass}>
                        <div className="flex flex-col gap-y-2">
                            <label className={labelClass} htmlFor="tops_brand">Brand:</label>
                            <select className={inputSelect} name="tops_brand" value={extraMeasure.tops_brand}
                                    onChange={e => updateExtraMeasureValue("tops_brand", e.target.value)}>
                                {selectOptions(brands)}
                            </select>
                            <label className={labelClass} htmlFor="tops_brand_other">Other:</label>
                            <input className={inputField} name="tops_brand_other" type="text"
                                   value={(!brands.includes(extraMeasure.tops_brand)) ? extraMeasure.tops_brand : null}
                                   onChange={e => updateExtraMeasureValue("tops_brand", e.target.value)}/>
                        </div>
                    </div>
                    <div className={optionClass}>
                        <div className="flex flex-col gap-y-2">
                            <label className={labelClass} htmlFor="tops_size">Size:</label>
                            <select className={inputSelect} name="tops_size" value={extraMeasure.tops_size}
                                    onChange={e => updateExtraMeasureValue("tops_size", e.target.value)}>
                                {selectOptions(topSizes)}
                            </select>
                            <label className={labelClass} htmlFor="tops_size_other">Other:</label>
                            <input className={inputField} name="tops_size_other" type="text"
                                   value={(!topSizes.includes(extraMeasure.tops_size)) ? extraMeasure.tops_size : null}
                                   onChange={e => updateExtraMeasureValue("tops_size", e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div>2. What is the Jeans/Pants size you wear</div>
                <div className={optionClass}>
                    <div className="flex flex-col gap-y-2">
                        <label className={labelClass} htmlFor="jeans_pants_size">Size:</label>
                        <select className={inputSelect} name="jeans_pants_size" value={extraMeasure.jeans_pants_size}
                                onChange={e => updateExtraMeasureValue("jeans_pants_size", e.target.value)}>
                            {selectOptions(pantSizes)}
                        </select>
                        <label className={labelClass} htmlFor="jeans_pants_size_other">Other:</label>
                        <input className={inputField} name="jeans_pants_size_other" type="text"
                               value={(!pantSizes.includes(extraMeasure.jeans_pants_size)) ? extraMeasure.jeans_pants_size : null}
                               onChange={e => updateExtraMeasureValue("jeans_pants_size", e.target.value)}/>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <label className={labelClass} htmlFor="birthday">Date of Birth <span>(Surprise gifts await)</span></label>
                    <input name="birthday" className={inputStyle + " w-full"} type="date" min={DateTime.now().minus({year: 18}).toISODate()}
                        onChange={e=>updateBDay("birthday",e.target.value)} value={(bDay.birthday==="")?null:bDay.birthday}
                    />
                </div>
                <div>
                    <label className={labelClass} htmlFor="anniversary">Date of Birth <span>(Surprise gifts await)</span></label>
                    <input name="anniversary" className={inputStyle + " w-full"} type="date" min={DateTime.now().minus({year: 18}).toISODate()}
                        onChange={e=>updateBDay("anniversary",e.target.value)} value={(bDay.anniversary==="")?null:bDay.anniversary}
                    />
                </div>
            </div>
            <div>
                <div>
                    <label className={labelClass} htmlFor="zip_code">Zip/Postal Code</label>
                    <input
                        className={inputClass}
                        type="text"
                        name="zip_code"
                        id="zip_code"
                        value={address.zip_code}
                        onChange={e => updateZipcode(e.target.value)}
                    />
                </div>
                <div>
                    <label className={labelClass} htmlFor="address">Address Line 1</label>
                    <input className={inputClass} type="text" name="address" id="address" value={address.address} onChange={e => updateAddressValue("address", e.target.value)} />
                </div>
            </div>
            <div>
                <div>
                    <label className={labelClass} htmlFor="landmark">Address Line 2</label>
                    <input className={inputClass} type="text" name="landmark" id="landmark" value={address.landmark} onChange={e => updateAddressValue("landmark", e.target.value)} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="country">Country</label>
                    <input className={inputClass} name="country" id="country" value={address.country} disabled={true} onChange={e => updateAddressValue("country", e.target.value)} />
                </div>
            </div>
            <div>
                <div>
                    <label className={labelClass} htmlFor="state">State/Province</label>
                    <select
                        className={inputClass}
                        name="state"
                        id="state"
                        value={address.state}
                        onChange={e => updateAddressValue("state", e.target.value)}
                        placeholder="Please select region, state or province"
                    >
                        <StatesAndCitiesOptions state={address.state} cities={false}/>
                    </select>
                </div>
                <div>
                    <label className={labelClass} htmlFor="city">City</label>
                    <select
                        className={inputClass}
                        name="city"
                        id="city"
                        value={address.city}
                        onChange={e => updateAddressValue("city", e.target.value)}
                        placeholder="Please select your city"
                    >
                        <StatesAndCitiesOptions state={address.state} cities={true} />
                    </select>
                </div>
            </div>
            <div><CreateMyAccount /></div>

            <div>
                <div>Cancel</div>
                <div onClick={checkAndSave}>SAVE</div>
            </div>

            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    }

    return (dataStore.mobile) ? mobileView : browserView()
}

export default ShippingAddress
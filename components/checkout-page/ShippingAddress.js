import React, { Fragment, useContext, useEffect, useState } from "react";
import AppWideContext from "../../store/AppWideContext";
import { DateTime } from "luxon";
import StatesAndCitiesOptions from "../../helpers/StatesAndCitiesOptions"
import Toast from "../common/Toast";
import { apiCall } from "../../helpers/apiCall";
import CreateMyAccount from "../../CreateMyAccount";
import validator from "validator";
import capitalizeTheFirstLetterOfEachWord from "../../helpers/capitalizeFirstWordOfEveryString";
import DisplayAddress from "./DisplayAddress";

function ShippingAddress({ addressComplete, updateCompleteness }) {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    const cAddress = dataStore.selectedAddress || dataStore.defaultdAddress
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [createAccount, setCreateAccount] = useState(false)
    const [editAddress, setEditAddress] = useState(true)
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null)

    const emptyAddress = {
        "name": "",
        "lastname": "",
        "email": (dataStore.userData.contact) ? dataStore.userData.contact : "",
        "phone": (dataStore.userData.contact) ? dataStore.userServe.phone_number : "",
        "address": "",
        "landmark": "",
        "country": "India",
        "zip_code": "",
        "state": "",
        "city": ""
    }
    const [address, setAddress] = useState((cAddress) ? cAddress : emptyAddress)
    const [extraMeasure, setExtraMeasure] = useState({
        "tops_brand": "",
        "tops_brand_other": "",
        "tops_size": "",
        "tops_size_other": "",
        "jeans_pants_size": 0,
        "jeans_pants_size_other": 0
    })
    const [bDay, setBDay] = useState({
        birthday: "",
        anniversary: ""
    })
    const updateAddressValue = (key, value) => {
        address[key] = value
        setAddress(address)
        setRefresh(!refresh)
    }

    const updateZipcode = async (zip) => {
        if (dataStore.currCurrency === "inr" && zip.length === 6) {
            const zipCall = await apiCall("cityByZipcode", dataStore.apiToken, { zipcode: zip })
            if (
                zipCall.hasOwnProperty("response_data")
                && zipCall.response_data.hasOwnProperty("city")
                && zipCall.response_data.hasOwnProperty("state")
                && zipCall.response_data.hasOwnProperty("zipcode")
            ) {
                address.state = capitalizeTheFirstLetterOfEachWord(zipCall.response_data.state)
                address.city = capitalizeTheFirstLetterOfEachWord(zipCall.response_data.city)
                address.zip_code = zipCall.response_data.zipcode
                setAddress(address)
                setRefresh(!refresh)
            }
        } else
            updateAddressValue("zip_code", zip)

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
        "26", "28", "30", "32", "34", "36"
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

    const checkAndSave = () => {
        let completeness = false
        if (dataStore.userData.contact
            && selectedAddressIndex
            && editAddress===false) {
            completeness = true
        } else {
            completeness = (
                addressCompleteness()
                && extraMeasureCompleteness()
                && createAccount
            )
        }

        if(completeness===true) {
            dataStore.currentOrderInCart = Object.assign({address: address})
            dataStore.currentOrderInCart = Object.assign({
                measurement: {
                    "tops_brand": extraMeasure.tops_brand || extraMeasure.tops_brand_other,
                    "tops_size": extraMeasure.tops_size || extraMeasure.tops_size_other,
                    "jeans_pants_size": extraMeasure.jeans_pants_size || extraMeasure.jeans_pants_size_other
                }
            })
            updateDataStore("currentOrderInCart", dataStore.currentOrderInCart)
        }

        // update the parent if different.
        if (completeness !== addressComplete)
            updateCompleteness(completeness)

    }

    const addressCompleteness = () => {
        let completeness = true
        //validations: all except landmark need to be filled. Email check
        let allFilled = true;
        Object.keys(address).forEach(key => {
            if (key != "landmark")
                if (address[key] == null || address[key] == "")
                    allFilled = false;
        })
        if (!allFilled) {
            setMessage("All required fields are not filled");
            setShow(true);
            completeness = false
        }

        if (allFilled && !validator.isEmail(address.email)) {
            setMessage("Email is incorrect");
            setShow(true);
            completeness = false
        } else {
            dataStore.userServe.email = address.email
            updateDataStore("userServe",dataStore.userServe)
        }

        if (dataStore.currCurrency === "inr" && address.zip_code.length !== 6) {
            setMessage("Incorrect Zipcode");
            setShow(true);
            completeness = false
        }

        return completeness
    }

    const extraMeasureCompleteness = () => {
        let completeness = true

        if (extraMeasure.tops_brand === "" && extraMeasure.tops_brand_other === "") {
            setMessage("Please select a Tops Brand")
            setShow(true)
            completeness = false
        } else if (extraMeasure.tops_size === "" && extraMeasure.tops_size_other === "") {
            setMessage("Please select a Tops Size")
            setShow(true)
            completeness = false
        } else if (extraMeasure.tops_size === "" && extraMeasure.tops_size_other === "") {
            setMessage("Please select a Jeans/Pants Size")
            setShow(true)
            completeness = false
        }

        return completeness
    }

    const addressIndex = (index, edit) => {
        console.log("AddressIndex was called")
        if (index !== selectedAddressIndex) {
            setSelectedAddressIndex(index)
            setAddress(dataStore.userAddresses[index])
            dataStore.currentOrderInCart.address=dataStore.userAddresses[index]
            updateDataStore("currentOrderInCart",dataStore.currentOrderInCart)
            updateDataStore("selectedAddress", dataStore.userAddresses[index])
            updateDataStore("addressIndex",index)
            updateCompleteness(true)
        }
        if (edit !== editAddress)
            setEditAddress(edit)
    }

    useEffect(() => {
        console.log("I WAS TRIGGERED")
        if (dataStore.userData.contact
            && dataStore.userAddresses.length > 0
            && address.address==="")
            if(editAddress!==false || selectedAddressIndex!==null) {
                console.log("I did something")
                setEditAddress(false)
                setSelectedAddressIndex(null)
            }
    }, [dataStore.userAddresses.length, dataStore.userData.contact,address.address,editAddress,selectedAddressIndex])

    const labelClass = "block font-500 mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;
    const optionClass = "grid grid-cols-2 gap-x-5 justify-center"
    const inputSelect = "w-full border-[#f1f2f3] font-500 text-sm bg-[#f1f2f3] focus:ring-transparent focus:border-black";
    const inputField = "w-full border border-[#f1f2f3] bg-[#f1f2f3] placeholder:font-600 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black";
    const focusStyle = "focus:ring-offset-0 focus:ring-0"
    const inputStyle = `block w-full border-none bg-black/5 px-4 py-3 ${focusStyle}`;

    console.log("editAddress, dataStore.userData.contact, dataStore.userAddresses.length", editAddress, dataStore.userData.contact, dataStore.userAddresses.length)

    const mobileView = null
    const browserView = () => {
        return <Fragment>
            <p className="text-xl mb-2">Shipping Address</p>
            {(!editAddress)
                ? <div className="grid grid-cols-3 gap-6 mb-10">
                    <DisplayAddress addressIndex={addressIndex.bind(this)} />
                </div>
                : <Fragment>
                    {(dataStore.userData.contact)
                        ? null
                        : <button className="mb-2 underline font-500"
                            onClick={() => updateDataStore("showSidebarMenuUser", true)}>Already have an
                            account?</button>
                    }

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[#555]">
                        <div>
                            <label className={labelClass} htmlFor="name">First Name</label>
                            <input
                                className={inputClass}
                                type="text"
                                name="name"
                                id="name" value={address.name}
                                onChange={e => updateAddressValue("name", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="lastname">Last Name</label>
                            <input
                                className={inputClass}
                                type="text"
                                name="lastname"
                                id="lastname" value={address.lastname}
                                onChange={e => updateAddressValue("lastname", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="email">Email</label>
                            <input
                                className={inputClass}
                                type="email"
                                name="email"
                                id="email" value={address.email}
                                onChange={e => updateAddressValue("email", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="phone">Telephone</label>
                            <input
                                className={inputClass}
                                type="number"
                                name="phone"
                                id="phone" value={address.phone}
                                onChange={e => updateAddressValue("phone", e.target.value)}
                            />
                        </div>
                        <p className="font-600 text-sm text-[#777] col-span-full">1. What Size Tops do you usually
                            wear?</p>
                        <div className={optionClass}>
                            <div>
                                <label className={labelClass} htmlFor="tops_brand">Brand:</label>
                                <select
                                    className={inputSelect}
                                    name="tops_brand"
                                    value={extraMeasure.tops_brand}
                                    onChange={e => updateExtraMeasureValue("tops_brand", e.target.value)}
                                >
                                    {selectOptions(brands)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass} htmlFor="tops_brand_other">Other:</label>
                                <input
                                    className={inputField} name="tops_brand_other"
                                    type="text"
                                    value={extraMeasure.tops_brand_other}
                                    onChange={e => updateExtraMeasureValue("tops_brand_other", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={optionClass}>
                            <div>
                                <label className={labelClass} htmlFor="tops_size">Size:</label>
                                <select className={inputSelect} name="tops_size" value={extraMeasure.tops_size}
                                    onChange={e => updateExtraMeasureValue("tops_size", e.target.value)}>
                                    {selectOptions(topSizes)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass} htmlFor="tops_size_other">Other:</label>
                                <input className={inputField} name="tops_size_other"
                                    type="text"
                                    value={extraMeasure.tops_size_other}
                                    onChange={e => updateExtraMeasureValue("tops_size_other", e.target.value)}
                                />
                            </div>
                        </div>
                        <p className="font-600 text-sm text-[#777] col-span-full">2. What is the Jeans/Pants size you
                            wear</p>
                        <div className={optionClass}>
                            <div>
                                <label className={labelClass} htmlFor="jeans_pants_size">Size:</label>
                                <select className={inputSelect} name="jeans_pants_size"
                                    value={extraMeasure.jeans_pants_size}
                                    onChange={e => updateExtraMeasureValue("jeans_pants_size", e.target.value)}>
                                    {selectOptions(pantSizes)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass} htmlFor="jeans_pants_size_other">Other:</label>
                                <input className={inputField} name="jeans_pants_size_other"
                                    type="text"
                                    value={extraMeasure.jeans_pants_size_other}
                                    onChange={e => updateExtraMeasureValue("jeans_pants_size_other", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className=""></div>
                        <div>
                            <label className={labelClass} htmlFor="birthday">Date of
                                Birth <span>(Surprise gifts await)</span></label>
                            <input name="birthday" className={inputStyle + " w-full"}
                                type="date"
                                min={DateTime.now().minus({ year: 18 }).toISODate()}
                                onChange={e => updateBDay("birthday", e.target.value)} value={bDay.birthday}
                            />
                        </div>
                        <div>
                            <label className={labelClass}
                                htmlFor="anniversary">Anniversary <span>(Surprise gifts await)</span></label>
                            <input name="anniversary" className={inputStyle + " w-full"}
                                type="date"
                                min={DateTime.now().minus({ year: 18 }).toISODate()}
                                onChange={e => updateBDay("anniversary", e.target.value)} value={bDay.anniversary}
                            />
                        </div>
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
                            <input className={inputClass}
                                type="text"
                                name="address"
                                id="address" value={address.address}
                                onChange={e => updateAddressValue("address", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="landmark">Address Line 2</label>
                            <input className={inputClass}
                                type="text"
                                name="landmark"
                                id="landmark" value={address.landmark}
                                onChange={e => updateAddressValue("landmark", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="country">Country</label>
                            <input className={inputClass} name="country"
                                id="country" value={address.country} disabled={true}
                                onChange={e => updateAddressValue("country", e.target.value)} />
                        </div>
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
                                <StatesAndCitiesOptions state={address.state} cities={false} />
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
                        {(dataStore.userData.contact)
                            ? null
                            : <div className="col-span-full">
                                <CreateMyAccount createAccount={createAccount}
                                    updateCreateAccount={setCreateAccount.bind(this)} />
                            </div>
                        }
                        <div className="col-span-full flex justify-center gap-10 text-sm">
                            <button className="border border-black px-4 py-1.5">Cancel</button>
                            <button className="bg-black px-4 py-1.5 text-white tracking-widest font-500"
                                onClick={checkAndSave}>SAVE
                            </button>
                        </div>
                    </div>
                    <Toast show={show} hideToast={() => setShow(false)}>
                        <span>{message}</span>
                    </Toast>
                </Fragment>
            }
        </Fragment>
    }

    return (dataStore.mobile) ? mobileView : browserView()
}

export default ShippingAddress
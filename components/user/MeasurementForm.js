import { useRouter } from "next/router";
import AppWideContext from "../../store/AppWideContext";
import React, { Fragment, useContext, useEffect, useState } from "react";
import validator from "validator/es";
import Toast from "../common/Toast";
import { apiCall } from "../../helpers/apiCall";
import StatesAndCitiesOptions from "../../helpers/StatesAndCitiesOptions";

/**
 * there is no processing for default or company at present
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

const statesAndCities = require('../../store/statesAndCities.json');

function MeasurementForm(props) {
    const router = useRouter();
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    const [measurement, setMeasurement] = useState(null);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(true);

    useEffect(()=>{
        if(props.index==-1){
            const m = require("../../store/emptyMeasurement.json");
            setMeasurement(m);
        } else
            setMeasurement(dataStore.userMeasurements[props.index])
    },[dataStore.userMeasurements,props.index])

    const saveAndReturn = async () => {
        //validations: all except landmark need to be filled. Email check
        let allFilled = true;
        const requiredFields=[];
        requiredFields.forEach(key => {
                if (measurement[key] == null || measurement[key] == "")
                    allFilled = false;
        })
        if (!allFilled) {
            setMessage("All required fields are not filled");
            setShow(true);
            return
        }

        if (props.index == -1) {

            const resp = await apiCall("addAddressBook", dataStore.apiToken, {
                "user": {
                    email: dataStore.userData.contact
                },
                "address": address
            });
            if (resp.status !== 200) {
                setMessage("Something went wrong. Please try again or contact administrator");
                setShow(true);
            } else {
                const addressCall = await apiCall("userAddresses", dataStore.apiToken, {
                    "user": {
                        email: dataStore.userData.contact
                    }
                });
                if (addressCall.hasOwnProperty("response") && addressCall.response) {
                    updateDataStore("userAddresses", [...addressCall.response]);
                    router.back();
                }
            }
        } else {

            const resp = await apiCall("updateAddressBook", dataStore.apiToken, {
                "user": {
                    email: dataStore.userData.contact
                },
                "address": {...address,"index":props.index}
            });
            if (resp.status !== 200) {
                setMessage("Something went wrong. Please try again or contact administrator");
                setShow(true);
            } else {
                const addressCall = await apiCall("userAddresses", dataStore.apiToken, {
                    "user": {
                        email: dataStore.userData.contact
                    }
                });
                if (addressCall.hasOwnProperty("response") && addressCall.response) {
                    updateDataStore("userAddresses", [...addressCall.response]);
                    router.back();
                }
            }
        }

    }

    const updateAddressValue = (key, value) => {
        address[key] = value;
        setAddress(address);
        setRefresh(!refresh);
    }

    const labelClass = "block text-[14px] mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;

    const mobileView = null;
    const browserView = <div>
        {(address)
            ? <div>
                <div>
                    {(props.index == -1)
                        ? <p className="text-[28px] mb-5">Add New Address</p>
                        : <p className="text-[28px] mb-5">Edit Address</p>
                    }
                </div>
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
                        <label className={labelClass} htmlFor="company">Company</label>
                        <input className={inputClass} type="text" name="company" id="company" value={company} onChange={e => setCompany(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="phone">Telephone</label>
                        <input className={inputClass} type="number" name="phone" id="phone" value={address.phone} onChange={e => updateAddressValue("phone", e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="address">Address Line 1</label>
                        <input className={inputClass} type="text" name="address" id="address" value={address.address} onChange={e => updateAddressValue("address", e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="landmark">Address Line 2</label>
                        <input className={inputClass} type="text" name="landmark" id="landmark" value={address.landmark} onChange={e => updateAddressValue("landmark", e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="country">Country</label>
                        <input className={inputClass} name="country" id="country" value={address.country} disabled={true} onChange={e => updateAddressValue("country", e.target.value)} />
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
                    <div>
                        <label className={labelClass} htmlFor="zip_code">Zip/Postal Code</label>
                        <input
                            className={inputClass}
                            type="text"
                            name="zip_code"
                            id="zip_code"
                            value={address.zip_code}
                            onChange={e => updateAddressValue("zip_code", e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <input
                            className="focus:ring-transparent text-[#616161] rounded mb-1 cursor-pointer"
                            type="checkbox"
                            name="default"
                            id="default"
                            checked={isDefault}
                            onChange={e => setIsDefault(e.target.checked)}
                        />
                        <label className={labelClass}>
                            Use as my default shipping address
                        </label>
                    </div>
                </div>
                <button className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md mt-6" onClick={saveAndReturn}>
                    Save Address
                </button>
                <Toast show={show} hideToast={() => setShow(false)}>
                    <span>{message}</span>
                </Toast>
            </div>
            : null}
    </div>


    return (dataStore.mobile) ? mobileView : browserView
}

export default MeasurementForm;
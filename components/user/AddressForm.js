import {useRouter} from "next/router";
import AppWideContext from "../../store/AppWideContext";
import React, {Fragment, useContext, useEffect, useState} from "react";
import validator from "validator";
import Toast from "../common/Toast";
import {apiCall} from "../../helpers/apiCall";
import StatesAndCitiesOptions from "../../helpers/StatesAndCitiesOptions"
import {isMobile} from "react-device-detect";
import {connect} from "react-redux";
import {setUserAddresses} from "../../ReduxStore/reducers/userSlice";

/**
 * there is no processing for default or company at present
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */


function AddressForm(props) {
    const [address, setAddress] = useState(props.address);
    const [company, setCompany] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const saveAndReturn = async () => {
        let allFilled = true;
        Object.keys(address).forEach(key => {
            if (key !== "landmark")
                if (address[key] == null || address[key] === "")
                    allFilled = false;
        })
        if (!allFilled) {
            setMessage("All required fields are not filled");
            setShow(true);
            return
        }

        if (allFilled && !validator.isEmail(address.email)) {
            setMessage("Email is incorrect");
            setShow(true);
            return;
        }
        let resp;
        if (props.index === -1) {
            resp = await apiCall("addAddressBook", props.appConfig.apiToken, {
                "user": {
                    email: props.userData.userServe.email
                },
                "address": address
            });

        } else {
            resp = await apiCall("updateAddressBook", props.appConfig.apiToken, {
                "user": {
                    email: props.userData.userServe.email
                },
                "address": {...address, "index": props.index}
            });
        }
        if (resp.status !== 200) {
            setMessage("Something went wrong. Please try again or contact administrator");
            setShow(true);
        } else {
            const addressCall = await apiCall("userAddresses", props.appConfig.apiToken, {
                "user": {
                    email: props.userData.userServe.email
                }
            });
            if (addressCall.hasOwnProperty("response") && addressCall.response) {
                props.setUserAddresses([...addressCall.response]);
                props.setEdit(null)
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

    const mobileView = <Fragment>
        {(address)
            ? <>
                {(props.index == -1)
                    ? <p className="text-[28px] mb-2">Add New Address</p>
                    : <p className="text-[28px] mb-2">Edit Address</p>
                }
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-[#555] w-full">
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
                        <label className={labelClass} htmlFor="company">Company</label>
                        <input className={inputClass} type="text" name="company" id="company" value={company}
                               onChange={e => setCompany(e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="phone">Telephone</label>
                        <input className={inputClass} type="number" name="phone" id="phone" value={address.phone}
                               onChange={e => updateAddressValue("phone", e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="address">Address Line 1</label>
                        <input className={inputClass} type="text" name="address" id="address" value={address.address}
                               onChange={e => updateAddressValue("address", e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="landmark">Address Line 2</label>
                        <input className={inputClass} type="text" name="landmark" id="landmark" value={address.landmark}
                               onChange={e => updateAddressValue("landmark", e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="country">Country</label>
                        <input className={inputClass} name="country" id="country" value={address.country}
                               disabled={true} onChange={e => updateAddressValue("country", e.target.value)}/>
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
                            <StatesAndCitiesOptions state={address.state} cities={true}/>
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
                </div>
                {
                    props.index === -1 ?
                        <div>
                            <input type="checkbox" id={"defaultShip"}/>
                            <label htmlFor={"defaultShip"} className={"text-xs text-[#606060] ml-2 font-500"}>Use as my default shipping address</label>
                        </div>
                        :
                        ""
                }
                <button
                    className="bg-black px-4 py-1.5 mr-[35%] text-center text-white uppercase text-sm font-500 shadow mt-6"
                    onClick={saveAndReturn}>
                    Save Address
                </button>
                <Toast show={show} hideToast={() => setShow(false)}>
                    <span>{message}</span>
                </Toast>
            </>
            : null}
    </Fragment>
    const browserView = <Fragment>
        {(address)
            ? <>
                {(props.index == -1)
                    ? <p className="text-[28px] mb-2">Add New Address</p>
                    : <p className="text-[28px] mb-2">Edit Address</p>
                }
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[#555] w-full">
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
                        <label className={labelClass} htmlFor="company">Company</label>
                        <input className={inputClass} type="text" name="company" id="company" value={company}
                               onChange={e => setCompany(e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="phone">Telephone</label>
                        <input className={inputClass} type="number" name="phone" id="phone" value={address.phone}
                               onChange={e => updateAddressValue("phone", e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="address">Address Line 1</label>
                        <input className={inputClass} type="text" name="address" id="address" value={address.address}
                               onChange={e => updateAddressValue("address", e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="landmark">Address Line 2</label>
                        <input className={inputClass} type="text" name="landmark" id="landmark" value={address.landmark}
                               onChange={e => updateAddressValue("landmark", e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="country">Country</label>
                        <input className={inputClass} name="country" id="country" value={address.country}
                               disabled={true} onChange={e => updateAddressValue("country", e.target.value)}/>
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
                            <StatesAndCitiesOptions state={address.state} cities={true}/>
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
                <button
                    className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md mt-6"
                    onClick={saveAndReturn}>
                    Save Address
                </button>
                <Toast show={show} hideToast={() => setShow(false)}>
                    <span>{message}</span>
                </Toast>
            </>
            : null}
    </Fragment>


    return (mobile) ? mobileView : browserView
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps,{setUserAddresses})(AddressForm);

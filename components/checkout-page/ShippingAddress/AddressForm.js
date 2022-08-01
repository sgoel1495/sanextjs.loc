import React, {useContext, useReducer, useState} from 'react';
import {DateTime} from "luxon";
import StatesAndCitiesOptions from "../../../helpers/StatesAndCitiesOptions";
import CreateMyAccount from "../../../CreateMyAccount";
import {apiCall} from "../../../helpers/apiCall";
import capitalizeTheFirstLetterOfEachWord from "../../../helpers/capitalizeFirstWordOfEveryString";
import validator from "validator";
import AppWideContext from "../../../store/AppWideContext";
import Toast from "../../common/Toast";
import MeasurementForm from "./MeasurementForm";
import {getUserObject} from "../../../helpers/addTocart";
import {updateAddressForOrder} from "../functions";
import {updateUserDataAfterLogin} from "../../../helpers/updateUserDataAfterLogin";

const AddressForm = ({isMobile, selectedAddressIndex, setSelectedAddressIndex, setReview, setActive}) => {
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [createAccount, setCreateAccount] = useReducer((state, e) => {
        if (e.target.name === "create") {
            return {...state, create: !state.create};
        }
        return {...state, [e.target.name]: e.target.value}
    }, {
        create: false,
        password: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false)
    const [extraMeasure, setExtraMeasure] = useReducer((state, e) => {
            return {...state, [e.target.name]: e.target.value}
        }, {
            tops_brand: "",
            tops_brand_other: "",
            tops_size: "",
            tops_size_other: "",
            jeans_pants_size: 0,
            jeans_pants_size_other: 0,
        }
    );
    const [impDates, setImpDates] = useReducer((state, e) => {
        return {...state, [e.target.name]: e.target.value}
    }, {
        birthday: dataStore.userServe.birthday,
        anniversary: dataStore.userServe.anniversary,
    });

    const emptyAddress = {
        name: dataStore.userServe.user_name,
        lastname: dataStore.userServe.last_name,
        email: dataStore.userServe.email,
        phone: dataStore.userServe.phone_number,
        address: "",
        landmark: "",
        country: "India",
        zip_code: "",
        state: "",
        city: "",
    };
    console.log(dataStore)
    const [address, setAddress] = useState(selectedAddressIndex >= 0 ? dataStore.userAddresses[selectedAddressIndex] : emptyAddress);
    const updateAddressValue = (e) => {
        setAddress({...address, [e.target.name]: e.target.value});
    };
    const updateZipcode = async (e) => {
        let zip = e.target.value;
        if (dataStore.currCurrency === "inr" && zip.length === 6) {
            const zipCall = await apiCall("cityByZipcode", dataStore.apiToken, {zipcode: zip});
            if (
                zipCall.hasOwnProperty("response_data") &&
                zipCall.response_data.hasOwnProperty("city") &&
                zipCall.response_data.hasOwnProperty("state") &&
                zipCall.response_data.hasOwnProperty("zipcode")
            ) {
                let temp = {...address}
                temp.state = capitalizeTheFirstLetterOfEachWord(zipCall.response_data.state);
                temp.city = capitalizeTheFirstLetterOfEachWord(zipCall.response_data.city);
                temp.zip_code = zipCall.response_data.zipcode;
                setAddress(temp);
            }
        } else updateAddressValue(e);
    };

    const updateAddressBook = async (isCreate) => {
        const resp = await apiCall(isCreate ? "addAddressBook" : "updateAddressBook", dataStore.apiToken, {
            "user": {
                email: dataStore.userData.contact
            },
            "address": isCreate ? address : {...address, "index": selectedAddressIndex}
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
            }
        }
    }
    const updateUserProfile = async () => {
        await apiCall("updateUserDetails", dataStore.apiToken, {
            "user": {
                "contact": dataStore.userServe.email,
                "user_name": dataStore.userServe.user_name,
                "last_name": dataStore.userServe.last_name,
                "birthday": impDates.birthday ? impDates.birthday : "",
                "anniversary": impDates.anniversary ? impDates.anniversary : "",
                "bust": dataStore.userServe.bust,
                "waist": dataStore.userServe.waist,
                "hip": dataStore.userServe.hip,
                "anyother": dataStore.userServe.anyother,
                "account": {
                    "change_password": false,
                    "password": ""
                }
            },
        });
        const serveCall = await apiCall("userServe", dataStore.apiToken, {contact: dataStore.userServe.email});
        if (serveCall.hasOwnProperty("response") && serveCall.response && serveCall.response.email) {
            updateDataStore("userServe", {...serveCall.response});
        }
    }
    const updateMeasurements = async () => {
        await apiCall("measurmentForReview", dataStore.apiToken, {
            "user": getUserObject(dataStore, updateDataStore),
            "order": {
                "order_id": dataStore.currentOrderId
            },
            "measurements": {
                "tops_brand": extraMeasure.tops_brand || extraMeasure.tops_brand_other,
                "tops_size": extraMeasure.tops_size || extraMeasure.tops_size_other,
                "jeans_pants_size": extraMeasure.jeans_pants_size || extraMeasure.jeans_pants_size_other,
            },
        })
    }

    const saveUserDataAfterSuccessfulLogin = async (username) => {
        const updateData = await updateUserDataAfterLogin(username, dataStore.apiToken, dataStore.userMeasurements, dataStore.userCart);
        Object.keys(updateData).forEach((key) => {
            updateDataStore(key, updateData[key]);
        })
        localStorage.setItem("userData", JSON.stringify(updateData["userData"]));
    }

    const checkAndSave = async () => {
        if (createAccount.create && !checkPassword()) {
            return
        }
        if (addressCompleteness()) {
            if (dataStore.userServe && dataStore.userServe.email) {
                await updateAddressBook(selectedAddressIndex === -1)
                if (!isMobile) {
                    if (dataStore.userServe.anniversary !== impDates.anniversary || dataStore.userServe.birthday !== impDates.birthday) {
                        await updateUserProfile()
                    }
                    await updateMeasurements()
                }
            } else {
                if (selectedAddressIndex === -1) {
                    updateDataStore("userAddresses", [...dataStore.userAddresses, address])
                } else {
                    let userAddresses = [...dataStore.userAddresses]
                    userAddresses[selectedAddressIndex] = address
                    updateDataStore("userAddresses", userAddresses)
                }
                let resp = await updateAddressForOrder(0, dataStore, updateDataStore, {"create_account": createAccount.create, "password": createAccount.password})
                if (createAccount.create && !resp.user.is_guest) {
                    await saveUserDataAfterSuccessfulLogin(resp.user.contact)
                }
            }
            if (isMobile && !dataStore.userServe.email) {
                setReview(true);
                setSelectedAddressIndex(0);
            } else {
                setSelectedAddressIndex(null);
            }
        }
    };

    const checkPassword = () => {
        if (!createAccount.password || !createAccount.confirmPassword || createAccount.password.length < 6 || createAccount.password !== createAccount.confirmPassword) {
            setError(true);
            return false
        }
        return true
    }

    const addressCompleteness = () => {
        let completeness = true;
        let allFilled = true;
        Object.keys(address).forEach((key) => {
            if (key !== "landmark") if (address[key] == null || address[key] === "") allFilled = false;
        });
        if (!allFilled) {
            setMessage("All required fields are not filled");
            completeness = false;
        } else if (allFilled && !validator.isEmail(address.email)) {
            setMessage("Email is incorrect");
            completeness = false;
        } else if (dataStore.currCurrency === "inr" && address.zip_code.length !== 6) {
            setMessage("Incorrect Zipcode");
            completeness = false;
        }
        if (!completeness) {
            setError(true)
            setShow(true);
        }
        return completeness;
    };

    const labelClass = "block font-500 mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2 mb-3" + focusClass;

    const focusStyle = "focus:ring-offset-0 focus:ring-0";
    const inputStyle = `block w-full border-none bg-black/5 px-4 py-3 mb-3 ${focusStyle}`;

    return (
        <>
            <div className={"grid text-[#555]" + [isMobile ? ' px-8 grid-cols-1 pb-20' : " grid-cols-2 gap-x-8 gap-y-4"]}>
                <div>
                    <label className={labelClass} htmlFor='name'>
                        First Name
                    </label>
                    <input
                        className={inputClass + [error && !address['name'] ? " border-red-500 mb-0 mb-0" : ""]}
                        type='text'
                        name='name'
                        id='name'
                        value={address.name}
                        onChange={updateAddressValue}
                    />
                    {error && !address['name'] && <div className={"text-red-500 mb-2"}>This is a required field.</div>}
                </div>
                <div>
                    <label className={labelClass} htmlFor='lastname'>
                        Last Name
                    </label>
                    <input
                        className={inputClass + [error && !address['lastname'] ? " border-red-500 mb-0" : ""]}
                        type='text'
                        name='lastname'
                        id='lastname'
                        value={address.lastname}
                        onChange={updateAddressValue}
                    />
                    {error && !address['lastname'] && <div className={"text-red-500 mb-2"}>This is a required field.</div>}
                </div>
                <div>
                    <label className={labelClass} htmlFor='email'>
                        Email
                    </label>
                    <input
                        className={inputClass + [error && !address['email'] ? " border-red-500 mb-0" : ""]}
                        type='email'
                        name='email'
                        id='email'
                        value={address.email}
                        onChange={updateAddressValue}
                    />
                    {error && !address['email'] && <div className={"text-red-500 mb-2"}>This is a required field.</div>}
                </div>
                <div>
                    <label className={labelClass} htmlFor='phone'>
                        Telephone
                    </label>
                    <input
                        className={inputClass + [error && !address['phone'] ? " border-red-500 mb-0" : ""]}
                        type='number'
                        name='phone'
                        id='phone'
                        value={address.phone}
                        onChange={updateAddressValue}
                    />
                    {error && !address['phone'] && <div className={"text-red-500 mb-2"}>This is a required field.</div>}
                </div>
                {
                    isMobile || <>
                        <MeasurementForm extraMeasure={extraMeasure} setExtraMeasure={setExtraMeasure}/>
                        <div>
                            <label className={labelClass} htmlFor='birthday'>
                                Date of Birth <span>(Surprise gifts await)</span>
                            </label>
                            <input
                                name='birthday'
                                className={inputStyle + " w-full"}
                                type='date'
                                min={DateTime.now().minus({year: 18}).toISODate()}
                                onChange={setImpDates}
                                value={impDates.birthday}
                            />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor='anniversary'>
                                Anniversary <span>(Surprise gifts await)</span>
                            </label>
                            <input
                                name='anniversary'
                                className={inputStyle + " w-full"}
                                type='date'
                                min={DateTime.now().minus({year: 18}).toISODate()}
                                onChange={setImpDates}
                                value={impDates.anniversary}
                            />
                        </div>
                    </>
                }
                <div>
                    <label className={labelClass} htmlFor='zip_code'>
                        Zip/Postal Code
                    </label>
                    <input
                        className={inputClass + [error && !address['zip_code'] ? " border-red-500 mb-0" : ""]}
                        type='text'
                        name='zip_code'
                        id='zip_code'
                        value={address.zip_code}
                        onChange={updateZipcode}
                    />
                    {error && !address['zip_code'] && <div className={"text-red-500 mb-2"}>This is a required field.</div>}
                </div>

                <div>
                    <label className={labelClass} htmlFor='address'>
                        Address Line 1
                    </label>
                    <input
                        className={inputClass + [error && !address['address'] ? " border-red-500 mb-0" : ""]}
                        type='text'
                        name='address'
                        id='address'
                        value={address.address}
                        onChange={updateAddressValue}
                    />
                    {error && !address['address'] && <div className={"text-red-500 mb-2"}>This is a required field.</div>}
                </div>
                <div>
                    <label className={labelClass} htmlFor='landmark'>
                        Address Line 2
                    </label>
                    <input
                        className={inputClass}
                        type='text'
                        name='landmark'
                        id='landmark'
                        value={address.landmark}
                        onChange={updateAddressValue}
                    />
                </div>
                <div>
                    <label className={labelClass} htmlFor='country'>
                        Country
                    </label>
                    <input
                        className={inputClass + [error && !address['country'] ? " border-red-500 mb-0" : ""]}
                        name='country'
                        id='country'
                        value={address.country}
                        disabled={true}
                        onChange={updateAddressValue}
                    />
                    {error && !address['country'] && <div className={"text-red-500 mb-2"}>This is a required field.</div>}
                </div>
                <div>
                    <label className={labelClass} htmlFor='state'>
                        State/Province
                    </label>
                    <select
                        className={inputClass + [error && !address['state'] ? " border-red-500 mb-0" : ""]}
                        name='state'
                        id='state'
                        value={address.state}
                        onChange={updateAddressValue}
                        placeholder='Please select region, state or province'
                    >
                        <StatesAndCitiesOptions state={address.state} cities={false}/>
                    </select>
                    {error && !address['state'] && <div className={"text-red-500 mb-2"}>This is a required field.</div>}
                </div>
                <div>
                    <label className={labelClass} htmlFor='city'>
                        City
                    </label>
                    <select
                        className={inputClass + [error && !address['city'] ? " border-red-500 mb-0" : ""]}
                        name='city'
                        id='city'
                        value={address.city}
                        onChange={updateAddressValue}
                        placeholder='Please select your city'
                    >
                        <StatesAndCitiesOptions state={address.state} cities={true}/>
                    </select>
                    {error && !address['city'] && <div className={"text-red-500 mb-2"}>This is a required field.</div>}
                </div>
                {dataStore.userData.contact || selectedAddressIndex !== -1 ? null : (
                    <div className='col-span-full'>
                        <CreateMyAccount createAccount={createAccount} updateCreateAccount={setCreateAccount.bind(this)} error={error} isMobile={isMobile}/>
                    </div>
                )}
                {
                    isMobile || <div className='col-span-full flex justify-center gap-10 text-sm'>
                        <button className='border border-black px-4 py-1.5' onClick={() => {
                            if (dataStore.userAddresses && dataStore.userAddresses.length)
                                setSelectedAddressIndex(null)
                        }}>Cancel
                        </button>
                        <button className='bg-black px-4 py-1.5 text-white tracking-widest font-500' onClick={checkAndSave}>
                            {selectedAddressIndex === -1 ? "Add" : "Update"}
                        </button>
                    </div>
                }
            </div>
            {
                isMobile && <div className='bg-white text-center grid grid-cols-2 fixed h-auto w-full left-0 right-0 bottom-0 mt-4'>
                    <div onClick={() => {
                        console.log(dataStore)
                        if (dataStore.userServe.email) {
                            if (dataStore.userAddresses && dataStore.userAddresses.length)
                                setSelectedAddressIndex(null)
                        } else
                            setActive(1)
                    }
                    } className='bg-black py-2 cursor-pointer text-gray-300 mr-0.5'>
                        <button className='font-600 uppercase'>Cancel</button>
                    </div>
                    <div onClick={checkAndSave} className='bg-black py-2 cursor-pointer text-white'>
                        <button className='font-600 uppercase'>{selectedAddressIndex === -1 ? "Add" : "Update"}</button>
                    </div>
                </div>
            }
            <Toast show={show} hideToast={() => setShow(false)} bottom={"40px"}>
                <span>{message}</span>
            </Toast>
        </>
    );
};

export default AddressForm;
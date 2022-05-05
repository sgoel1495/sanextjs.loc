import {useRouter} from "next/router";
import AppWideContext from "../../store/AppWideContext";
import {Fragment, useContext, useState} from "react";
import validator from "validator/es";
import Toast from "../common/Toast";
import {apiCall} from "../../helpers/apiCall";

/**
 * there is no processing for default or company at present
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function AddressForm(props) {
    const statesAndCities = require('../../store/statesAndCities.json');

    /*
        index -1 means a new address
       this will be address format
        {
      "name": "test",
      "lastname": "test",
      "email": "shailaja.s@algowire.com",
      "phone": 1234567890,
      "address": "abc block",
      "landmark": "",
      "country": "india",
      "zip_code": 110096,
      "state": "Delhi",
      "city": "New Delhi"
    }

     */
    const router = useRouter();
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const {address, setAddress} = useState(props.address);
    const {company, setCompany} = useState(null);
    const {isDefault, setIsDefault} = useState(false);
    const {message,setMessage}=useState(null);
    const {show,setShow}=useState(false);

    const saveAndReturn = async () => {
        //validations: all except landmark need to be filled. Email check
        let allFilled=true;
        Object.keys(address).forEach(key=>{
            if(key!="landmark")
                if(address[key]==null || address[key]=="")
                    allFilled=false;
        })
        if(!allFilled){
            setMessage("All required fields are not filled");
            setShow(true);
            return
        }

        if(allFilled && !validator.isEmail(address.email)){
            setMessage("Email is incorrect");
            setShow(true);
            return;
        }

        if(props.index==-1){
            /*case add
            {
                "user" : { "email" : "shailaja.s@algowire.com"
            },
                "address" : { "name" : "test",
                "lastname" : "test",
                "email" : "shailaja.s@algowire.com",
                "phone" : 1111111111,
                "address" : "Abc block",
                "landmark" : "near landmark",
                "zip_code" : 110096,
                "city" : "New Delhi",
                "state" : "Delhi",
                "country" : "India"
            }*/
            const resp = await apiCall("addAddressBook", dataStore.apiToken, {
                "user":{
                    email: dataStore.userData.contact
                },
                "address":address
            });
            if(resp.status!==200){
                setMessage("Something went wrong. Please try again or contact administrator");
                setShow(true);
            } else {
                const addressCall = await apiCall("userAddresses", dataStore.apiToken, {
                    "user":{
                        email: dataStore.userData.contact
                    }
                });
                if (addressCall.hasOwnProperty("response") && addressCall.response) {
                    updateDataStore("userAddresses", [...addressCall.response]);
                    router.back();
                }
            }
        } else {
            //case update
        }

    }

    const sncList=()=>{
        const states = [];
        const cities = [];
        statesAndCities.forEach(snc=>{
            if(states.includes(snc.state)==false)
                states.push(snc.state);
            if(address.state==snc.state)
                cities.push(snc.city);
        });
        states.sort();
        cities.sort();
        return {states,cities};
    }

    const statesOptions = ()=>{
        let returnValue = null;
        const {states} = sncList();
        states.forEach(state=>{
           if(address.state==state)
               returnValue=<Fragment>
                   {returnValue}
                   <option selected={true} value={state}>{state}</option>
               </Fragment>;
            else
               returnValue=<Fragment>
                   {returnValue}
                   <option value={state}>{state}</option>
               </Fragment>;
        });
        return returnValue;
    }

    const citiesOptions = ()=>{
        let returnValue = null;
        const {cities} = sncList();
        cities.forEach(city=>{
           if(address.city==city)
               returnValue=<Fragment>
                   {returnValue}
                   <option selected={true} value={city}>{city}</option>
               </Fragment>;
            else
               returnValue=<Fragment>
                   {returnValue}
                   <option value={city}>{city}</option>
               </Fragment>;
        });
        return returnValue;
    }

    const updateAddressValue = (e) => {

    }

    const mobileView = null;
    const browserView = <div>
        <div>
            {(props.index == -1)
                ? <div>Add New Address</div>
                : <div>Edit Address</div>}
        </div>
        <label htmlFor="name">First Name</label>
        <input type="text" name="name" id="name" value={address.name} onBlur={e => updateAddressValue("name", e.target.value)}/>
        <label htmlFor="lastname">Last Name</label>
        <input type="text" name="lastname" id="lastname" value={address.lastname}
               onBlur={e => updateAddressValue("lastname", e.target.value)}/>
        <label htmlFor="company">Company</label>
        <input type="text" name="company" id="company" value={company} onBlur={e => setCompany(e.target.value)}/>
        <label htmlFor="phone">Telephone</label>
        <input type="number" name="phone" id="phone" value={address.phone}
               onBlur={e => updateAddressValue("phone", e.target.value)}/>
        <label htmlFor="address">Address Line 1</label>
        <input type="text" name="address" id="address" value={address.address}
               onBlur={e => updateAddressValue("address", e.target.value)}/>
        <label htmlFor="landmark">Address Line 2</label>
        <input type="text" name="landmark" id="landmark" value={address.landmark}
               onBlur={e => updateAddressValue("landmark", e.target.value)}/>
        <label htmlFor="country">Country</label>
        <input name="country" id="country" value={address.country} disabled={true}
               onBlur={e => updateAddressValue("country", e.target.value)}/>
        <label htmlFor="state">State/Province</label>
        <select name="state" id="state" value={address.state} onBlur={e => updateAddressValue("state", e.target.value)}
                placeholder="Please select region, state or province">
            {statesOptions()}
        </select>
        <label htmlFor="city">City</label>
        <select name="city" id="city" value={address.city} onBlur={e => updateAddressValue("city", e.target.value)}
            placeholder="Please select your city">
            {citiesOptions()}
        </select>
        <label htmlFor="zip_code">Zip/Postal Code</label>
        <input type="text" name="zip_code" id="zip_code" value={address.zip_code}
               onBlur={e => updateAddressValue("zip_code", e.target.value)}/>
        <label>
            <input type="checkbox" name="default" id="default" checked={isDefault}
                   onBlur={e => setIsDefault(e.target.checked)}/>
            Use as my default shipping address
        </label>
        <div onClick={saveAndReturn}>
            Save Address
        </div>
        <Toast show={show} hideToast={() => setShow(false)}>
            <span>{message}</span>
        </Toast>
    </div>;

    return (dataStore.mobile) ? mobileView : browserView
}

export default AddressForm;
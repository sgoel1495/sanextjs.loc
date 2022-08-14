import AppWideContext from "../../store/AppWideContext";
import Link from "next/link";
import {useContext,useState,useEffect } from "react";
import {apiCall} from "../../helpers/apiCall";

function ContactInformation(props) {
    const {dataStore} = useContext(AppWideContext);
    const [contactInfo,setContactInfo]= useState(null);
    
    useEffect(()=>{
        apiCall("userServe", dataStore.apiToken,{contact:dataStore.userData.contact})
            .then(pData=>{
                if (pData.status === 200 && pData.response){
                    setContactInfo(pData.response)
                }
            })
            .catch(e=>console.log(e.message))
    },[dataStore.userData.contact,dataStore.apiToken]);

    const mobileView =
     contactInfo && <div className="p-4 bg-[#f1f2f3]">
        <p className="text-xl font-500 mb-2 mt-1">Contact Information</p>
        <p className="font-700">{contactInfo.user_name}</p>
        <p className="text-[#777]">{contactInfo.email}</p>
        <div className="flex gap-2">
            <Link href="/users/account">
                <a className="underline">Change Password</a>
            </Link>
            <span>|</span>
            <Link href="/users/account">
                <a className="underline">Edit</a>
            </Link>
        </div>
    </div>
    const browserView = (
        contactInfo && <div className="p-4 bg-[#f1f2f3] w-1/2">
            <p className="text-xl font-500 mb-2 mt-1">Contact Information</p>
            <p className="font-700">{contactInfo.user_name}</p>
            <p className="text-[#777]">{contactInfo.email}</p>
            <div className="flex gap-2">
                <Link href="/users/account">
                    <a className="underline">Change Password</a>
                </Link>
                <span>|</span>
                <Link href="/users/account">
                    <a className="underline">Edit</a>
                </Link>
            </div>
        </div>
    );

    return (props.mobile) ? mobileView : browserView;
}

export default ContactInformation;

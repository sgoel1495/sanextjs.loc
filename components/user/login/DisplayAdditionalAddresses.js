import Link from "next/link";
import {useContext, useState, useEffect} from "react";
import AppWideContext from "../../../store/AppWideContext";
import Toast from "../../common/Toast";
import {apiCall} from "../../../helpers/apiCall"

function DisplayAdditionalAddresses(props) {
    const {dataStore} = useContext(AppWideContext);
    const [showToaster, setShowToaster] = useState(false)
    const [userAddresses,setUserAddresses] =useState([])

    useEffect(()=>{
        apiCall("userAddresses", dataStore.apiToken,{user:{email:dataStore.userServe.email}})
            .then(pData=>{
                if (pData.status === 200 && pData.response){
                    setUserAddresses(pData.response)
                }
            })
            .catch(e=>console.log(e.message))
    },[dataStore.userServe.emailt, dataStore.apiToken]);

    const browserAddressList = () => {
        let returnValue = null;
        userAddresses.forEach((address, index) => {
            returnValue = (
                <>
                    {returnValue}
                    <div className="p-4 bg-[#f1f2f3] w-full flex flex-col items-start">
                        <p className="text-[#777]">{address.name}</p>
                        <p className="text-[#777]">{address.address}
                            {(address.landmark == "")
                                ? null
                                : <span>, {address.landmark}</span>
                            }
                        </p>
                        <p className="text-[#777]">{address.city}, {address.state}, {address.zip_code} </p>
                        <p className="text-[#555]">T:{address.phone}</p>
                        <div className="flex gap-2 items-center mt-4 text-[#555]">
                            <Link href={"/users/addressbook/edit/" + index.toString()}>
                                <a className="underline">Edit</a>
                            </Link>
                            <span>|</span>
                            <Link href={"/users/addressbook/delete/" + index.toString()}>
                                <a className="underline">Delete</a>
                            </Link>
                        </div>
                    </div>
                </>
            );
        });

        return (returnValue) ? returnValue :
            <p className="text-[#777] mb-10 font-500">No additional address on record</p>;
    }
    const mobileAddressList = () => {
        let returnValue = null;

        userAddresses.forEach((address, index) => {
            returnValue = (
                <>
                    {returnValue}
                    <div className="p-8 bg-[#f1f2f3] mx-3 my-4 flex flex-col items-start">
                        <p className="text-[#777]">{address.name}</p>
                        <p className="text-[#777]">{address.address}
                            {(address.landmark == "")
                                ? null
                                : <span>, {address.landmark}</span>
                            }
                        </p>
                        <p className="text-[#777]">{address.city}, {address.state}, {address.zip_code} </p>
                        <p className="text-[#555]">T:{address.phone}</p>
                        <div className="flex gap-2 items-center mt-4 text-[#555]">
                            <Link href={"/users/addressbook/edit/" + index.toString()}>
                                <a className="underline">Edit</a>
                            </Link>
                            <span>|</span>
                            <span
                                key={index}
                                className="underline"
                                onClick={() => {
                                    confirm("Are you sure you want to delete this address!") ? setShowToaster(true) : ''
                                }}
                            >
                                Delete
                            </span>
                        </div>
                        <Toast show={showToaster} hideToast={() => setShowToaster(false)}>
                            <span>Successfully Deleted</span>
                        </Toast>
                    </div>
                </>
            );
        });

        return (returnValue) ? returnValue :
            <p className="mx-3 text-[#777] mb-10 font-500">No additional address on record</p>;
    }

    const mobileView = <>
        <div>
            {mobileAddressList()}
        </div>
        <Link href="/users/addressbook/add">
            <a className="ml-3 bg-black px-4 py-1.5 mr-[35%] text-center text-white uppercase text-sm font-500 shadow-md my-2">
                ADD NEW ADDRESSES
            </a>
        </Link>
    </>
    const browserView = (
        <>
            <div className="grid grid-cols-2 gap-8 w-full">
                {browserAddressList()}
            </div>
            <Link href="/users/addressbook/add">
                <a className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2">
                    ADD NEW ADDRESSES
                </a>
            </Link>
        </>
    );

    return (props.mobile) ? mobileView : browserView;
}

export default DisplayAdditionalAddresses;

/*
  "defaultAddress":    {
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

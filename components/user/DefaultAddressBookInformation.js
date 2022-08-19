import Link from "next/link";
import {useRouter} from 'next/router';
import React, {useContext,useEffect,useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import {apiCall} from "../../helpers/apiCall";

function DefaultAddressBookInformation(props) {
    const router = useRouter();
    const isProfilePage = router.asPath == '/users/profile'
    const {dataStore} = useContext(AppWideContext);
    const [defaultAddress,setDefaultAddress] =useState(null);

    useEffect(()=>{
        apiCall("getDefaultAddress", dataStore.apiToken,{user:{email:dataStore.userServe.email}})
            .then(pData=>{
                if (pData.status === 200 && pData.response){
                    setDefaultAddress(pData.response)
                }
            })
            .catch(e=>console.log(e.message))
    },[dataStore.userServe.email, dataStore.apiToken]);

    const mobileView = <div className={"p-8 bg-[#f1f2f3] flex flex-col items-start "+[isProfilePage || "mx-3"]}>
        {isProfilePage && <p className="text-xl font-500 mb-2 mt-1">Address Book</p>}
        <p className="font-600 text-[#777]">{isProfilePage && "Default"} Shipping Address</p>
        {(defaultAddress)
            ? <div>
                <div>{defaultAddress.name}</div>
                <div>{defaultAddress.address}
                    {(defaultAddress.landmark === "")
                        ? null
                        : <span>, {defaultAddress.landmark}</span>
                    }
                </div>
                <div>{defaultAddress.city}, {defaultAddress.state}, {defaultAddress.zip_code} </div>
                <div className={"mt-5"}>T:{defaultAddress.phone}</div>
            </div>
            : <p className="text-[#777] mb-8 font-500">You have not set a default shipping address.</p>
        }
        {(props.manage)
            ? <Link href="/users/addressbook">
                <a className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md mt-10 mb-5">MANAGE
                    ADDRESSES</a>
            </Link>
            : null}

        {(props.showEdit)
            ? <div className="flex gap-2 items-center mt-4 text-[#555]">
                    <button className="underline" onClick={()=>props.setEdit(0)}>Edit</button>
            </div>
            : null}

    </div>
    const browserView = (
        <div className="p-4 bg-[#f1f2f3] w-full flex flex-col items-start">
            {isProfilePage && <p className="text-xl font-500 mb-2 mt-1">Address Book</p>}
            <p className="font-600 text-[#777]">{isProfilePage && "Default"} Shipping Address</p>
            {(defaultAddress)
                ? <div>
                    <div>{defaultAddress.name}</div>
                    <div>{defaultAddress.address}
                        {(defaultAddress.landmark === "")
                            ? null
                            : <span>, {defaultAddress.landmark}</span>
                        }
                    </div>
                    <div>{defaultAddress.city}, {defaultAddress.state}, {defaultAddress.zip_code} </div>
                    <div>T:{defaultAddress.phone}</div>
                </div>
                : <p className="text-[#777] mb-8 font-500">You have not set a default shipping address.</p>
            }
            {(props.manage)
                ? <Link href="/users/addressbook">
                    <a className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2">MANAGE
                        ADDRESSES</a>
                </Link>
                : null}
            {(props.showEdit)
                ? <div className="flex gap-2 items-center mt-4 text-[#555]">
                    <button className="underline" onClick={()=>props.setEdit(0)}>Edit</button>
                </div>
                : null}
        </div>
    );

    return (props.mobile) ? mobileView : browserView;
}

export default DefaultAddressBookInformation;
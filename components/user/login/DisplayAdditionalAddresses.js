import Link from "next/link";
import {Fragment, useContext} from "react";
import AppWideContext from "../../../store/AppWideContext";

function DisplayAdditionalAddresses(props) {
    const { dataStore } = useContext(AppWideContext);

    const browserAddressList = ()=>{
        let returnValue = null;

        dataStore.userAddresses.forEach((address,index)=>{
            returnValue = <Fragment>
                {returnValue}
                <div className="p-4 bg-[#f1f2f3] w-full flex flex-col items-start">
                    <p className="text-xl font-500 mb-2">Addition Addresses</p>
                        <div>
                            <div>{address.name}</div>
                            <div>{address.address}
                                {(address.landmark == "")
                                    ? null
                                    : <span>, {address.landmark}</span>
                                }
                            </div>
                            <div>{address.city}, {address.state}, {address.zip_code} </div>
                            <div>T:{address.phone}</div>
                        </div>
                    <Link href={"/users/addressbook/edit/"+index.toString()}>
                        <a>Edit</a>
                    </Link>
                    |
                    <Link href={"/users/addressbook/delete/"+index.toString()}>
                        <a>Delete</a>
                    </Link>
                </div>
            </Fragment>;
        });

        return (returnValue)?returnValue:<p className="text-[#777] mb-10 font-500">No additional address on record</p>;
    }

    const mobileView = null;
    const browserView = <Fragment>
        <div className="p-4 bg-[#f1f2f3] w-full flex flex-col items-start">
            <p className="text-xl font-500 mb-2">Address Book</p>
            <p className="font-600 text-[#777]">Default Shipping Address</p>
            {browserAddressList()}
        </div>
        <Link href="/users/addressbook/add">
            <a className="bg-black px-4 py-2 block text-white uppercase text-sm font-500 tracking-wide shadow-md">
                ADD NEW ADDRESSES
            </a>
        </Link>
    </Fragment>;

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
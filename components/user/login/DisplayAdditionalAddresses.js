import Link from "next/link";
import {Fragment, useContext} from "react";
import AppWideContext from "../../../store/AppWideContext";

function DisplayAdditionalAddresses(props) {
    const {dataStore} = useContext(AppWideContext);

    const browserAddressList = () => {

        let returnValue = null;
        dataStore.userAddresses.forEach((address, index) => {
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

    const mobileView = <>
        <div >
            {browserAddressList()}
        </div>
        <Link href="/users/addressbook/add">
            <a className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2">
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

import AppWideContext from "../../store/AppWideContext";
import Link from "next/link";
import { useContext } from "react";

function DefaultAddressBookInformation(props) {
    const { dataStore } = useContext(AppWideContext);

    const mobileView = null;
    const browserView = (
        <div className="p-4 bg-[#f1f2f3] w-full flex flex-col items-start">
            <p className="text-xl font-500 mb-2">Address Book</p>
            <p className="font-600 text-[#777]">Default Shipping Address</p>
            {(dataStore.defaultAddress)
                ? <div>
                    <div>{dataStore.defaultAddress.name}</div>
                    <div>{dataStore.defaultAddress.address}
                        {(dataStore.defaultAddress.landmark == "")
                            ? null
                            : <span>, {dataStore.defaultAddress.landmark}</span>
                        }
                    </div>
                    <div>{dataStore.defaultAddress.city}, {dataStore.defaultAddress.state}, {dataStore.defaultAddress.zip_code} </div>
                    <div>T:{dataStore.defaultAddress.phone}</div>
                </div>
                : <p className="text-[#777] mb-10 font-500">You have not set a default shipping address.</p>
            }
            <Link href="/users/addressbook">
                <a className="bg-black px-4 py-2 block text-white uppercase text-sm font-500 tracking-wide shadow-md">MANAGE ADDRESSES</a>
            </Link>
        </div>
    );

    return (props.mobile) ? mobileView : browserView;
}
export default DefaultAddressBookInformation;

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
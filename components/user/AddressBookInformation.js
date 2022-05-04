import AppWideContext from "../../store/AppWideContext";
import Link from "next";

function AddressBookInformation(props) {
    const {dataStore} = useContext(AppWideContext);

    const mobileView = null;
    const browserView = <div>
        <div>Address Book</div>
        <div>Default Shipping Address</div>
        {(dataStore.defaultAddress)?<div>
            <div>{dataStore.defaultAddress.name}</div>
            <div>{dataStore.defaultAddress.address}
                {(dataStore.defaultAddress.landmark=="")
                    ?null
                    :<span>, {dataStore.defaultAddress.landmark}</span>
                }
            </div>
            <div>{dataStore.defaultAddress.city}, {dataStore.defaultAddress.state}, {dataStore.defaultAddress.zip_code} </div>
            <div>T:{dataStore.defaultAddress.phone}</div>
        </div>
            :<div>
                You have no default address.
            </div>}
        <div>
            <Link href="/users/addressbook"><a>MANAGE ADDRESSES</a></Link>
        </div>
    </div>;

    return (props.mobile) ? mobileView : browserView;
}
export default AddressBookInformation;

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
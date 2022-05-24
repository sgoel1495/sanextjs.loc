import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import {Fragment, useContext, useEffect} from "react";

function Logout() {
    const {updateDataStore} = useContext(AppWideContext);
    const router = useRouter();
    useEffect(() => {
        const userData={
            "contact": null
        };
        const userWallet= {
            "email": "",
                "phone_number": "",
                "user_name": "",
                "wallet_amount": 0,
                "usd_wallet_amount": 0
        };
        const userServe={
            "email": "",
            "phone_number": "",
            "user_name": "",
            "favorites": [],
            "cart": {},
            "ref_id": null,
            "temp_user_id": ""
        };

        const userMeasurements={}
        const userOrderHistory={}
        const userCart=[]
        const defaultAddress=null
        const userAddresses=[]

        updateDataStore("userData", userData);
        updateDataStore("userWallet", userWallet);
        updateDataStore("userServe", userServe);
        updateDataStore("userAddresses", userAddresses);
        updateDataStore("defaultAddress", defaultAddress);
        updateDataStore("userCart", userCart);
        updateDataStore("userOrderHistory", userOrderHistory);
        updateDataStore("userMeasurements", userMeasurements);
        router.replace("/");
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    return <Fragment>Logging out ...</Fragment>;
}

export default Logout;
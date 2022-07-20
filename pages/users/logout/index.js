import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import {Fragment, useContext, useEffect} from "react";

function UsersLogoutPage() {
    const {updateDataStore} = useContext(AppWideContext);
    const router = useRouter();
    useEffect(() => {
        const userData = {
            "contact": null
        };
        let userWallet = {
            "WalletAmount": 0,
            "TotalCr": 0,
            "TotalDr": 0,
            "Wallet": []
        };
        const userServe = {
            "email": "",
            "phone_number": "",
            "user_name": "",
            "favorites": [],
            "cart": {},
            "ref_id": null,
            "temp_user_id": Date.now().toString()
        };

        const userMeasurements = {}
        const userOrderHistory = {}
        const userCart = []
        const defaultAddress = null
        const userAddresses = []

        updateDataStore("userData", userData);
        updateDataStore("userWallet", userWallet);
        updateDataStore("userServe", userServe);
        updateDataStore("userAddresses", userAddresses);
        updateDataStore("defaultAddress", defaultAddress);
        updateDataStore("userCart", userCart);
        updateDataStore("userOrderHistory", userOrderHistory);
        updateDataStore("userMeasurements", userMeasurements);
        router.replace("/");
    }, [router, updateDataStore])

    return <Fragment>Logging out ...</Fragment>;
}

export default UsersLogoutPage;

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
        updateDataStore("userData", userData);
        updateDataStore("userWallet", userWallet);
        updateDataStore("userFavs", []);
        router.replace("/");
    }, []);
    return <Fragment>Logging out ...</Fragment>;
}

export default Logout;
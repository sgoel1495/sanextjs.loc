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
        const userMeasurement={
            "status": 200,
            "msg": "success",
            "response": {
                "1621519115_m": {
                    "measure_id": "1621519115_m",
                    "bust": "34",
                    "waist": "31",
                    "hips": "36",
                    "height_f": "5",
                    "height_i": "7",
                    "biceps": "",
                    "wearing_waist": "",
                    "length": "38",
                    "abdomen": "",
                    "size": "S",
                    "jeans_pant": "",
                    "brand_top": "",
                    "brand_top_other": "",
                    "brand_top_size": "",
                    "brand_top_size_other": "",
                    "brand_pant": "",
                    "brand_pant_other": "",
                    "brand_pant_size_other": "",
                    "brand_pant_size": "",
                    "brand_dress": "",
                    "brand_dress_other": "",
                    "brand_dress_size": "",
                    "brand_dress_size_other": "",
                    "shoulder": "",
                    "fitting": "eassy & relaxed",
                    "selected_sleeve": "SL",
                    "selected_length": "KN",
                    "biceps_fit": "",
                    "name": "Marmalade",
                    "old_product_id": "Dresses-Marmalade-NotchedDress",
                    "asset_id": "Dresses-Marmalade-NotchedDress",
                    "category": "Dresses"
                }
            }
        }
        updateDataStore("userData", userData);
        updateDataStore("userWallet", userWallet);
        updateDataStore("userServe", userServe);
        router.replace("/");
    }, []);
    return <Fragment>Logging out ...</Fragment>;
}

export default Logout;
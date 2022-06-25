import React, { Fragment, useContext, useRef, useState } from "react";
import Toast from "../common/Toast";
import { apiCall } from "../../helpers/apiCall";
import Image from "next/image";
import AppWideContext from "../../store/AppWideContext";
import Link from "next/link";

function SearchModal(props) {
    const { dataStore } = useContext(AppWideContext);
    const { closeModal } = props;
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [toastMsg, setToastMsg] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const searchExecution = async () => {
        if (searchTerm.length < 3) {
            setToastMsg("Please enter at least 3 characters")
            setShowToast(true)
            return
        }
        const formData = new FormData()
        formData.append("query", searchTerm)
        const resp = await apiCall("search", "noapitokenrequried", formData)
        if (resp.msg && resp.msg === "got") {
            if (resp.search_data && resp.search_data.products) {
                setData(resp.search_data.products)
                setRefresh(!refresh)
            }
        }
    }

    const showResult = () => {
        let returnValue = null
        data.forEach((product, index) => {
            returnValue = <Fragment>
                {returnValue}
                <Link href={product.old_product_id}>
                    <a key={"product" + index}>
                        <Image src={WEBASSETS + product.img_path} alt={product.name} layout={`fill`} objectFit={`cover`} />
                        <span>{product.name}</span>
                        <p className={`text-xs`}>
                            {dataStore.currSymbol}
                            {(dataStore.currCurrency === "inr") ? product.price : product.usd_price}
                        </p>
                    </a>
                </Link>
            </Fragment>
        })
        return returnValue
    }

    const mobileView = (
        <div className={`fixed inset-0 z-50 bg-white/90`}>
            <div className="container">
                <div onClick={searchExecution} className={`mt-12 flex mx-3`}>
                    <input
                        type="text"
                        name="searchInput"
                        value={searchTerm}
                        placeholder="Enter your search text"
                        className={`flex-1 text-sm border-0 border-b border-black focus:border-black bg-transparent focus:ring-offset-0 focus:ring-0 focus:ring-offset-transparent focus:shadow-none`}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button className={`bg-black text-sm text-white px-4 py-2`}>
                        SEARCH
                    </button>
                </div>
                <button className={`w-10 h-10 absolute right-0 top-0`} onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10`} viewBox="0 0 24 24">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
                    </svg>
                </button>
            </div>
            {showResult()}
        </div>);

    const browserView = (
        <div className={`fixed inset-0 z-50 bg-white/90`}>
            <div className="w-10/12 mx-auto">
                <div onClick={searchExecution} className={`mt-10 flex`}>
                    <input
                        type="text"
                        name="searchInput"
                        value={searchTerm}
                        placeholder="Enter your search text"
                        className={`flex-1 text-xl border-0 border-b border-black focus:border-black bg-transparent focus:ring-offset-0 focus:ring-0 focus:ring-offset-transparent focus:shadow-none`}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button className={`bg-black text-white px-8`}>
                        SEARCH
                    </button>
                </div>
                <button className={`w-10 h-10 absolute right-8 top-8`} onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8`} fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </button>
                {showResult()}
            </div>
        </div>);

    return <Fragment>
        {(props.isMobile)
            ? mobileView
            : browserView
        }
        <Toast show={showToast} hideToast={() => {
            setShowToast(false)
        }}>
            <p>{toastMsg}</p>
        </Toast>
    </Fragment>
}

export default SearchModal

/*
"{
    ""msg"": ""got"",
    ""search_data"": {
        ""products"": [
            {
                ""name"": ""Flower Child"",
                ""tagline"": ""Sleeveless Dress with Pleat detail"",
                ""price"": 3850.0,
                ""old_product_id"": ""Dresses-Flower-Child-SleevelessDresswithPleatdetail"",
                ""img_path"": ""/assets/Dresses-Flower-Child-SleevelessDresswithPleatdetail/new.jpg"",
                ""category"": ""dresses""
            },
            {
                ""name"": ""Sanguine"",
                ""tagline"": ""Shirt with Knot Detail"",
                ""price"": 2750.0,
                ""old_product_id"": ""Shirts-Sanguine-ShirtwithKnotDetail"",
                ""img_path"": ""/assets/Shirts-Sanguine-ShirtwithKnotDetail/new.jpg"",
                ""category"": ""shirts""
            },
            {
                ""name"": ""Rejuvenate"",
                ""tagline"": ""Cotton Collared Pleat Dress"",
                ""price"": 3450.0,
                ""old_product_id"": ""Dresses-Rejuvenate-CottonCollaredPleatDress"",
                ""img_path"": ""/assets/Dresses-Rejuvenate-CottonCollaredPleatDress/new.jpg"",
                ""category"": ""dresses""
            },
            {
                ""name"": ""Pristine"",
                ""tagline"": ""Cotton Pleated Collared Tunic"",
                ""price"": 2850.0,
                ""old_product_id"": ""Tunics-Pristine-CottonPleatedCollaredTunic"",
                ""img_path"": ""/assets/Tunics-Pristine-CottonPleatedCollaredTunic/new.jpg"",
                ""category"": ""tunics""
            },
            {
                ""name"": ""Acceptance"",
                ""tagline"": ""Cotton Flared Pintuck Dress"",
                ""price"": 3450.0,
                ""old_product_id"": ""Dresses-Acceptance-CottonFlaredPintuckDressPintuck"",
                ""img_path"": ""/assets/Dresses-Acceptance-CottonFlaredPintuckDressPintuck/new.jpg"",
                ""category"": ""dresses""
            },
            {
                ""name"": ""Peace"",
                ""tagline"": ""Cotton Collared Drop Shoulder Tunic"",
                ""price"": 2850.0,
                ""old_product_id"": ""Tunics-Peace-CottonCollaredDropShoulderTunic"",
                ""img_path"": ""/assets/Tunics-Peace-CottonCollaredDropShoulderTunic/new.jpg"",
                ""category"": ""tunics""
            },
            {
                ""name"": ""Dream"",
                ""tagline"": ""Schiffli Puff Sleeved Shirt"",
                ""price"": 2750.0,
                ""old_product_id"": ""Shirts-Dream-SchiffliPuffSleevedShirt"",
                ""img_path"": ""/assets/Shirts-Dream-SchiffliPuffSleevedShirt/new.jpg"",
                ""category"": ""shirts""
            },
            {
                ""name"": ""Serene"",
                ""tagline"": ""Schiffli Flared Sleeve Wrap Dress"",
                ""price"": 3250.0,
                ""old_product_id"": ""Dresses-Serene-SchiffliFlaredSleeveWrapDress"",
                ""img_path"": ""/assets/Dresses-Serene-SchiffliFlaredSleeveWrapDress/new.jpg"",
                ""category"": ""dresses""
            },
            {
                ""name"": ""Tranquil"",
                ""tagline"": ""Schiffli Slit Sheath Dress"",
                ""price"": 3250.0,
                ""old_product_id"": ""Dresses-Tranquil-SchiffliSlitSheathDress"",
                ""img_path"": ""/assets/Dresses-Tranquil-SchiffliSlitSheathDress/new.jpg"",
                ""category"": ""dresses""
            },
            {
                ""name"": ""Renew"",
                ""tagline"": ""Cotton Button-Down Pleated Tunic"",
                ""price"": 2650.0,
                ""old_product_id"": ""Tunics-Renew-CottonButton-DownPleatedTunic"",
                ""img_path"": ""/assets/Tunics-Renew-CottonButton-DownPleatedTunic/new.jpg"",
                ""category"": ""tunics""
            },
            {
                ""name"": ""Revive"",
                ""tagline"": ""Schiffli Scallop Sleeved Top"",
                ""price"": 2495.0,
                ""old_product_id"": ""Tops-Revive-SchiffliScallopSleevedTop"",
                ""img_path"": ""/assets/Tops-Revive-SchiffliScallopSleevedTop/new.jpg"",
                ""category"": ""tops""
            },
            {
                ""name"": ""Free Spirit"",
                ""tagline"": ""Cotton V-neck Dress with Puff Sleeve Detail"",
                ""price"": 4250.0,
                ""old_product_id"": ""Dresses-Free-Spirit-CottonV-neckDresswithPuffSleeveDetail"",
                ""img_path"": ""/assets/Dresses-Free-Spirit-CottonV-neckDresswithPuffSleeveDetail/new.jpg"",
                ""category"": ""dresses""
            },
            {
                ""name"": ""Harmony"",
                ""tagline"": ""Cotton Dress with Lantern sleeve Detail"",
                ""price"": 3850.0,
                ""old_product_id"": ""Dresses-Harmony-CottonDresswithLanternsleeveDetail"",
                ""img_path"": ""/assets/Dresses-Harmony-CottonDresswithLanternsleeveDetail/new.jpg"",
                ""category"": ""dresses""
            },
            {
                ""name"": ""Invigorate"",
                ""tagline"": ""Puff Sleeve Shirt"",
                ""price"": 2650.0,
                ""old_product_id"": ""Shirts-Invigorate-PuffSleeveShirt"",
                ""img_path"": ""/assets/Shirts-Invigorate-PuffSleeveShirt/new.jpg"",
                ""category"": ""shirts""
            }
        ],
        ""count"": 14
    }
}"

 */
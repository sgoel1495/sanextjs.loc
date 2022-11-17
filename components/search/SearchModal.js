import React, {Fragment, useContext, useRef, useState} from "react";
import Toast from "../common/Toast";
import {apiCall} from "../../helpers/apiCall";
import Image from "next/image";
import Link from "next/link";
import {connect} from "react-redux";
import PriceDisplay from "../common/PriceDisplay";

function SearchModal(props) {
    const {closeModal} = props;
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
                <Link href={"/" + product.old_product_id}>
                    <a key={"product" + index} className="text-center">
                        <div className="relative w-full aspect-square">
                            <Image src={WEBASSETS + product.img_path} alt={product.name} layout={`fill`} objectFit={`cover`}/>
                        </div>
                        <p className="text-xs font-600">{product.name}</p>
                        <p className={`text-xs`}>
                            <PriceDisplay prod={product}/>
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
                <div className={`mt-12 flex mx-3`}>
                    <input
                        type="text"
                        name="searchInput"
                        value={searchTerm}
                        placeholder="Enter your search text"
                        className={`flex-1 text-sm border-0 border-b border-black focus:border-black bg-transparent focus:ring-offset-0 focus:ring-0 focus:ring-offset-transparent focus:shadow-none`}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button className={`bg-black text-sm text-white px-4 py-2`} onClick={searchExecution}>
                        SEARCH
                    </button>
                </div>
                <button className={`w-10 h-10 absolute right-0 top-0`} onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10`} viewBox="0 0 24 24">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                    </svg>
                </button>
            </div>
            <p className={"text-center text-lg font-500 mt-8"}>{data.length} results found</p>
            <div className={"overflow-auto h-full"}>
                <div className="grid grid-cols-2 gap-4 px-2 mt-2">
                    {showResult()}
                </div>
            </div>
        </div>);

    const browserView = (
        <div className={`fixed inset-0 z-50 bg-white/90`}>
            <div className="w-10/12 mx-auto">
                <div className={`mt-10 flex`}>
                    <input
                        type="text"
                        name="searchInput"
                        value={searchTerm}
                        placeholder="Enter your search text"
                        className={`flex-1 text-xl border-0 border-b border-black focus:border-black bg-transparent focus:ring-offset-0 focus:ring-0 focus:ring-offset-transparent focus:shadow-none`}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button className={`bg-black text-white px-8`} onClick={searchExecution}>
                        SEARCH
                    </button>
                </div>
                <button className={`w-10 h-10 absolute right-8 top-8`} onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8`} fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </button>
            </div>
            <p className="text-lg font-500 text-black/60 text-center my-3">{data.length} results found</p>
            <div className={"overflow-auto h-full"}>
                <div className="px-16 pb-16 grid grid-cols-6 gap-x-10 gap-y-4">
                    {showResult()}
                </div>
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

const mapStateToProps = (state) => {
    return {
        userConfig: state.userConfig
    }
}

export default connect(mapStateToProps)(SearchModal)

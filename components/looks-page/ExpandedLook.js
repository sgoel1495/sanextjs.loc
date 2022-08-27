import React, { useContext, useEffect, useRef } from 'react';
import Link from "next/link";
import BlockHeader from "../common/blockHeader";
import appSettings from "../../store/appSettings";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";

const LookDataBlockImage = (props) => (
    <span className={`block relative w-full h-full aspect-square`}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`} />
    </span>
)

const ExpandedLook = ({ expandLook, setExpandLook, data, isMobile }) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const expandedRef = useRef(null);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    useEffect(() => {
        if (expandedRef.current) {
            const element =
                expandedRef.current.getBoundingClientRect().top + window.scrollY - (document.getElementsByClassName("navigator")[0] ? document.getElementsByClassName("navigator")[0].getBoundingClientRect().bottom : 0)
            window.scroll({
                top: element,
                behavior: "smooth"
            })
        }
    }, [expandedRef])

    const leadTextStyle = "text-h5 font-600";
    const textStyle = "text-xs";
    const buyNowButtonStyle = "bg-black/5 font-600 text-xs tracking-widest px-2 lg:px-5 py-2 lg:py-3 block mt-6 w-fit";

    let products = null;
    let prod = null;
    let prodDetails = null;
    // the product
    if (expandLook.products && expandLook.products.length > 0) {
        prod = expandLook.products[0];
        prodDetails = data.prod[prod];
        products = (
            <>
                <div className={`grid grid-cols-2 place-items-center`}>
                    <LookDataBlockImage src={WEBASSETS + "/assets/" + prod + "/square-crop.jpg"}
                        alt={prodDetails.name} />
                    <div className={`flex flex-col items-center`}>
                        <p className={leadTextStyle}>{prodDetails.name}</p>
                        <p className={textStyle}>{prodDetails.tag_line}</p>
                        <p className={textStyle}>{currencySymbol}{(currCurrency === "inr") ? prodDetails.price : prodDetails.usd_price}</p>
                        <Link href={"/" + prod}>
                            <a className={`${buyNowButtonStyle}`}>BUY NOW</a>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
    // when the product has another item with it like top and bottom
    if (expandLook.products && expandLook.products.length > 1) {
        prod = expandLook.products[1];
        prodDetails = data.prod[prod];
        products = (
            <>
                {products}
                <div className={`grid grid-cols-2 place-items-center`}>
                    <div className={`flex flex-col items-center`}>
                        <p className={leadTextStyle}>{prodDetails.name}</p>
                        <p className={textStyle}>{prodDetails.tag_line}</p>
                        <p className={textStyle}>{currencySymbol}{(currCurrency === "inr") ? prodDetails.price : prodDetails.usd_price}</p>
                        <Link href={"/" + prod}>
                            <a className={`${buyNowButtonStyle}`}>BUY NOW</a>
                        </Link>
                    </div>
                    <LookDataBlockImage src={WEBASSETS + "/assets/" + prod + "/square-crop.jpg"}
                        alt={prodDetails.name} />
                </div>
            </>
        );
    }

    const mobileView = <>
        <span className={"block relative w-full aspect-square"}>
            <Image src={WEBASSETS + expandLook.bg_img_path} layout={`fill`} objectFit={`cover`} alt={""} />
            <span className={"absolute top-2 right-3 font-900 text-white text-lg"} onClick={() => setExpandLook({})}>
                X
            </span>
        </span>
        <div className={"relative bg-white px-5 py-6 pb-12 text-center"}>
            <span className={"block text-[#b77b3c] text-[20.5px] font-cursive italic mb-6"}>
                ~Items Featured~
            </span>
            <span className={"absolute top-2 right-3 text-xl font-800"} onClick={() => setExpandLook({})}>X</span>
            {products}
        </div>
    </>

    const browserView = <>
        <button
            onClick={() => setExpandLook({})}
            className={`absolute top-0 right-0 uppercase float-right text-black/50 flex gap-x-2`}
        >
            Close
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} fill={"currentColor"}
                viewBox="0 0 24 24">
                <path
                    d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
            </svg>
        </button>
        <BlockHeader
            space={"py-10"}
            titleStyle={"font-600 flex justify-center items-center gap-3 leading-none"}
        >
            <span className={"text-h1"}>~</span>
            <span className={'font-cursive italic text-h1'}>{expandLook.heading}</span>
            <span className={"text-h1"}>~</span>
        </BlockHeader>
        <div className={`grid grid-cols-2`}>
            <LookDataBlockImage src={WEBASSETS + expandLook.img_path} alt={expandLook.name} />
            <div className={`place-self-center bg-white h-fit w-2/3`}>
                {products}
            </div>
        </div>
    </>
    return <div className={isMobile ? "col-span-2" : `col-span-3 relative`} ref={expandedRef}>
        {isMobile ? mobileView : browserView}
    </div>

};

export default ExpandedLook;
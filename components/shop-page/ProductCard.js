import React, {Fragment, useContext, useState} from 'react';
import WishListButton from "../common/WishListButton";
import Link from "next/link";
import Image from "next/image";
import appSettings from "../../store/appSettings";
import AppWideContext from "../../store/AppWideContext";
import Toast from "../common/Toast";
import returnSizes from "../../helpers/returnSizes";
import ReactDom from "react-dom";
import NotifyMeModal from "../common/NotifyMeModal";
import {addToCart, getUserObject} from "../../helpers/addTocart";
import {useRouter} from "next/router";

const ShopDataBlockImage = (props) => (
    <span className={`block relative w-full h-full ` + [props.portrait ? "aspect-[2/3]" : "aspect-square"]}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
        {
            props.outOfStock && <span className={"absolute bg-white text-xs text-[#C69565] left-[50%] top-[50%] px-2 translate-y-[-50%] translate-x-[-50%]"}>
                    SOLD OUT
            </span>
        }
    </span>
)

const ProductCard = ({prod, isMobile, wide, portrait, isAccessory}) => {
    const router = useRouter();
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [expandShop, setExpandShop] = useState(null);
    const [showNotifyMe, setShowNotifyMe] = useState(false)
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;
    const inr = currencyData["inr"].curr_symbol;
    const usd = currencyData["usd"].curr_symbol;
    const [toastMsg, setToastMsg] = useState(null)
    const [showToast, setShowToast] = useState(false)
    const [showSize, setShowSize] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [addToCartClick, setAddToCartClick] = useState(false)
    const closeModal = (sent = null) => {
        if (sent === true) {
            setToastMsg("We will notify you when the product is back in stock")
            setShowToast(true)
            setShowNotifyMe(false)
        } else if (sent === null) {
            setToastMsg("Please complete form and try again")
            setShowToast(true)
        } else
            setShowNotifyMe(false)
    }

    const whatSizes = () => {
        const sizeData = returnSizes(prod);
        let returnValue = null
        sizeData.forEach(size => {
            returnValue = <Fragment>
                {returnValue}
                <button className={`border text-sm text-[#777] px-1 py-0.5 ${(selectedSize === size) ? "border-black" : "border-transparent"}`} onClick={() => saveToCart(size)}>
                    {size}
                </button>
            </Fragment>
        })
        return <div className='absolute bottom-16 inset-x-0 bg-white/80 z-10 py-2 flex items-center justify-center gap-x-3'>
            {returnValue}
        </div>
    }

    const saveToCart = (size = "") => {
        if (size === "T") {
            router.push("/" + prod.asset_id);
            return
        }
        if (!size) {
            setAddToCartClick(true)
        }
        if (!selectedSize && !size) {
            setShowSize(true)
            return
        } else if (size) {
            setSelectedSize(size)
        }
        if (!showSize) {
            setShowSize(true)
            setSelectedSize("")
            return
        }
        if (!addToCartClick) {
            return
        }
        const cart = {
            "product_id": prod.asset_id,
            "size": size ? size : selectedSize,
            "qty": 1,
            "is_sale": false,
            "is_tailor": false,
            "sleeve_length": "",
            "dress_length": ""
        }
        addToCart(dataStore, updateDataStore, {cart: cart}).then(r => {
            setToastMsg(`${prod.name}: Size ${size ? size : selectedSize} added to your Bag!`)
            setShowToast(true)
        })
    }
    if (isMobile) {
        if (wide) {
            return <div className={"relative rounded-3xl bg-white overflow-hidden mx-10 my-6 shadow-[24.7px_24.7px_49px_1px_rgb(0,0,0,0.07)]"}>
                {prod.is_prod_new && <span
                    className={"absolute text-white px-1.5 z-10 bg-black text-[8px] top-9 left-0 font-bold"}>NEW</span>}
                <Link href={"/" + prod.asset_id}>
                    <a className={`block z-0`} id={prod.asset_id}>
                        <ShopDataBlockImage src={WEBASSETS + prod.single_view_img} alt={prod.seo?prod.seo.imgalt:prod.name} outOfStock={prod.in_stock !== "true"}/>
                        <div className={`flex px-5 items-center leading-none py-3`}>
                            <div className='flex-1'>
                                <p className={`font-600 font-cursive italic`}>{prod.name}</p>
                                <p className={`text-[10px] font-500`}>{prod.tag_line}</p>
                            </div>
                            <div className='inline-flex flex-col items-center'>
                                <p className={`text-xs`}>
                                    {currencySymbol}
                                    {(currCurrency === "inr") ? prod.price : prod.usd_price}
                                </p>
                                <WishListButton pid={prod.asset_id} isMobile={true}/>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        }
        return <div className={"relative"}>
            <WishListButton className={`absolute left-2 top-2 z-10`} pid={prod.asset_id} isMobile={true}/>
            {prod.is_prod_new && <span
                className={"absolute text-white px-1.5 z-10 bg-black text-[8px] top-9 -left-2 font-bold"}>NEW</span>}
            <Link href={"/" + prod.asset_id}>
                <a className={`block text-center z-0`} id={prod.asset_id}>
                    <div
                        className={`rounded-3xl bg-white overflow-hidden border-2 border-white shadow-[24.7px_24.7px_49px_1px_rgb(0,0,0,0.07)]`}>
                        <ShopDataBlockImage src={WEBASSETS + prod.double_view_img} alt={prod.seo?prod.seo.imgalt:prod.name} portrait={true} outOfStock={prod.in_stock !== "true"}/>
                    </div>
                    <div className={`leading-none py-2`}>
                        <p className={`text-sm font-600 font-cursive italic`}>{prod.name}</p>
                        {prod.sale_price ? "" : <p className={`text-[10px] font-500`}>{prod.tag_line}</p>}
                        <p className={`text-xs`}>
                            <span>
                                {
                                    (currCurrency === "inr" || !prod.usd_price) ?
                                        <>
                                            {inr}
                                            <span className={prod.sale_price ? "line-through" : ""}>{prod.price}</span>
                                            {
                                                prod.sale_price && <span className={"text-rose-600 ml-2 font-600 "}>{inr}{prod.sale_price}</span>
                                            }
                                        </>
                                        :
                                        <>{usd} {prod.usd_price}</>
                                }
                            </span>
                        </p>
                    </div>
                </a>
            </Link>
        </div>

    }

    return (
        <>
            <div className={`block bg-white text-center relative z-0`} id={prod.asset_id}>
                <div
                    onMouseEnter={() => {
                        setExpandShop(true)
                    }}
                    onMouseLeave={() => {
                        setExpandShop(false)
                        setShowSize(false)
                    }}
                    className={`group relative`}
                >
                    <WishListButton className={`absolute right-4 top-4 z-10`} pid={prod.asset_id} isMobile={false}/>
                    <Link href={"/" + prod.asset_id}>
                        <a>
                            <ShopDataBlockImage
                                src={WEBASSETS + "/assets/" + prod.asset_id + (expandShop ? "/mo.new.jpg" : "/new.jpg")}
                                alt={prod.seo?prod.seo.imgalt:prod.name} portrait={portrait}/>
                        </a>
                    </Link>
                    {(showSize)
                        ? whatSizes()
                        : null
                    }
                    <div className="grid grid-cols-2 items-center h-16">
                        {(expandShop)
                            ? <Fragment>
                                {(prod.in_stock === "true")
                                    ? <Fragment>
                                        <button className={`font-800`} onClick={() => {
                                            setShowSize(true)
                                            setAddToCartClick(false)
                                        }}>SIZE
                                        </button>
                                        <div className={`font-800 cursor-pointer bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}
                                             onClick={() => saveToCart()}>
                                            <span className={`uppercase`}>Add to bag</span>
                                            <p className={`text-xs`}>
                                                {currencySymbol}
                                                {(currCurrency === "inr") ? prod.price : prod.usd_price}
                                            </p>
                                        </div>
                                    </Fragment>
                                    : <Fragment>
                                        <button className={`font-800`}>SOLD OUT</button>
                                        <div className={`font-800 cursor-pointer bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}
                                             onClick={() => setShowNotifyMe(true)}>
                                            <span className={`uppercase`}>NOTIFY ME</span>
                                        </div>
                                    </Fragment>
                                }
                            </Fragment>

                            : <div className={`col-span-2`}>
                                <p className={`text-h5 font-500`}>{prod.name}</p>
                                <p className={`text-sm font-500`}>{prod.tag_line}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Toast show={showToast} hideToast={() => {
                setShowToast(false)
            }}>
                <p>{toastMsg}</p>
            </Toast>
            {showNotifyMe &&
            ReactDom.createPortal(
                <NotifyMeModal
                    closeModal={closeModal.bind(this)}
                    isMobile={dataStore.isMobile}
                    userO={getUserObject(dataStore,updateDataStore)}
                    product={prod}
                />,
                document.getElementById("measurementmodal"))
            }

        </>
    );
};

export default ProductCard;
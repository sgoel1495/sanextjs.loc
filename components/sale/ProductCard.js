import React, {Fragment, useContext, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import appSettings from "../../store/appSettings";
import AppWideContext from "../../store/AppWideContext";
import returnSizes, {getQty, isInStock} from "../../helpers/returnSizes";
import ReactDom from "react-dom";
import WishListButton from "../common/WishListButton";
import NotifyMeModal from "../common/NotifyMeModal";
import Toast from "../common/Toast";
import {addToCart, getUserObject} from "../../helpers/addTocart";
import {useRouter} from "next/router";
import currencyFormatter from "../../helpers/currencyFormatter";
import {connect} from "react-redux";
import {setCart} from "../../ReduxStore/reducers/shoppingCartSlice";
import PriceDisplay from "../common/PriceDisplay";

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

const ProductCard = ({prod, isMobile, wide, portrait, isAccessory, userData, shoppingCart, appConfig, ...props}) => {
    const router = useRouter();
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [expandShop, setExpandShop] = useState(null);
    const [showNotifyMe, setShowNotifyMe] = useState(false)
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
        let sizeData = returnSizes(prod);
        let returnValue = null
        sizeData.forEach(size => {
            returnValue = <Fragment>
                {returnValue}
                <button
                    className={`border text-sm text-[#777] px-1 py-0.5 ${(selectedSize === size) ? "border-black" : "border-transparent"} ${prod.is_sale ? prod.inv_sizes.includes(size) ? "" : "line-through" : ""}`}
                    onClick={() => prod.is_sale ? prod.inv_sizes.includes(size) ? saveToCart(size) : {} : saveToCart(size)}>
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

        if (size) {
            setSelectedSize(size)
            if (!addToCartClick) {
                return
            }
        } else {
            setAddToCartClick(true)
            if (!selectedSize) {
                setShowSize(true)
                return
            }
        }

        const cart = {
            "product_id": prod.product_id,
            "size": size ? size : selectedSize,
            "qty": 1,
            "is_sale": false,
            "is_tailor": false,
            "sleeve_length": "",
            "dress_length": ""
        }
        addToCart(userData, shoppingCart.cart, appConfig.apiToken, props.setCart, {cart: cart}).then(r => {
            setToastMsg(`${prod.name}: Size ${size ? size : selectedSize} added to your Bag!`)
            setShowToast(true)
        })
    }

    if (isMobile) {
        return <div className={"relative"}>
            <WishListButton className={`absolute left-2 top-2 z-10`} pid={prod.asset_id} isMobile={true}/>
            <Link href={"/" + (prod.is_sale ? prod.product_id : prod.asset_id)}>
                <a className={`block text-center z-0`} id={prod.asset_id}>
                    <div
                        className={`rounded-3xl bg-white overflow-hidden border-2 border-white shadow-[24.7px_24.7px_49px_1px_rgb(0,0,0,0.07)]`}>
                        <ShopDataBlockImage src={WEBASSETS + prod.look_thumb} alt={prod.name} portrait={true} outOfStock={!isInStock(prod)}/>
                    </div>
                    <div className={`leading-none py-2`}>
                        <p className={`text-sm font-600 font-cursive italic`}>{prod.name}</p>
                        <p className={`text-xs`}>
                            <span>
                                <PriceDisplay prod={prod} isSale={true}/>
                            </span>
                        </p>
                        <p className={"text-xs"}>
                            {prod.inv_class}
                        </p>
                    </div>
                </a>
            </Link>
        </div>

    }
    return (
        <>
            <div className={`block bg-white text-center relative z-0 p-3`} id={prod.asset_id}>
                <div
                    onMouseEnter={() => {
                        setExpandShop(true)
                    }}
                    onMouseLeave={() => {
                        setSelectedSize("")
                        setExpandShop(false)
                        setShowSize(false)
                    }}
                    className={`group relative`}
                >
                    <WishListButton className={`absolute right-4 top-4 z-10`} pid={prod.asset_id} isMobile={false}/>
                    <Link href={"/" + prod.product_id}>
                        <a>
                            <ShopDataBlockImage
                                src={WEBASSETS + (expandShop ? prod.look_mo_thumb : prod.look_thumb)}
                                alt={prod.name} portrait={portrait}/>
                        </a>
                    </Link>
                    {(showSize)
                        ? whatSizes()
                        : null
                    }
                    <div className="grid grid-cols-2 items-center h-16">
                        {(expandShop)
                            ? <Fragment>
                                <button className={`font-800 bg-black text-white flex flex-col justify-center items-center h-full`} onClick={() => {
                                    setShowSize(true)
                                    setAddToCartClick(false)
                                }}>
                                    <span>SIZE</span>
                                    <span>
                                            <span className={"font-600 text-[#008000] text-[13px]"}>only {getQty(prod)} left</span>
                                            <span className={"font-600 text-[13px] tracking-wide"}> ({prod.inv_sizes.join(', ')})</span>
                                        </span>
                                </button>
                                <div className={`font-800 cursor-pointer flex flex-col gap-2 justify-center leading-none`}
                                     onClick={() => saveToCart()}>
                                    <span className={`uppercase`}>Add to bag</span>
                                    <p className={`text-xs`}>
                                        <PriceDisplay prod={prod} isSale={true}/>
                                    </p>
                                </div>
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
                        isMobile={appConfig.isMobile}
                        userO={getUserObject(userData)}
                        product={prod}
                    />,
                    document.getElementById("measurementmodal"))
            }

        </>
    );

};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        shoppingCart: state.shoppingCart,
        appConfig: state.appConfig,
    }
}

export default connect(mapStateToProps, {setCart})(ProductCard);
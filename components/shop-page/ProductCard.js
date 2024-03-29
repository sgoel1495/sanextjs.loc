import React, {Fragment, useState} from 'react';
import WishListButton from "../common/WishListButton";
import Link from "next/link";
import Image from "next/image";
import Toast from "../common/Toast";
import returnSizes, {isInStock} from "../../helpers/returnSizes";
import ReactDom from "react-dom";
import NotifyMeModal from "../common/NotifyMeModal";
import {addToCart, getUserObject} from "../../helpers/addTocart";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {setCart} from "../../ReduxStore/reducers/shoppingCartSlice";
import PriceDisplay from "../common/PriceDisplay";
import {addCartIntent} from "../../ReduxStore/reducers/intentSlice";

const ShopDataBlockImage = (props) => (
    <span className={`block relative w-full h-full ` + [props.portrait ? "aspect-[2/3]" : "aspect-square"]}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
        {
            props.extraUrl && <Image src={props.extraUrl} alt={props.name} layout={`fill`} objectFit={`cover`} className={props.expandShop ? "" : "!hidden"}/>
        }
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
    const sizeData = returnSizes(prod);

    const whatSizes = () => {

        let returnValue = null
        sizeData.forEach(size => {
            returnValue = <Fragment>
                {returnValue}
                <button className={`border text-sm text-[#777] px-1 py-0.5 ${(selectedSize === size) ? "border-black" : "border-transparent"} ${prod.hide_sizes.includes(size.toLowerCase()) ? " line-through" : ""}`}  onClick={() => prod.hide_sizes.includes(size.toLowerCase())?{}:saveToCart(size)}>
                    {size}
                </button>
            </Fragment>
        })
        return <div className='absolute bottom-16 inset-x-0 bg-white/80 z-10 py-2 flex items-center justify-center gap-x-3'>
            {returnValue}
        </div>
    }

    const saveToCart = (size = "") => {
        if (!(sizeData.length === 1 && sizeData[0] === "F")) {
            if (size === "T") {
                router.push({
                    pathname: '/' + prod.asset_id,
                    query: {tailor: true}
                }, "/" + prod.asset_id);
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
        } else {
            size = "F"
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
        addToCart(userData, shoppingCart.cart, appConfig.apiToken, props.setCart, {cart: cart}).then(r => {
            if(r){
                setToastMsg(`${prod.name}: Size ${size ? size : selectedSize} added to your Bag!`)
                props.addCartIntent()
            } else{
                setToastMsg("Please try again")
            }

            setShowToast(true)
        })
    }
    if (isMobile) {
        if (wide) {
            return <div className={"relative rounded-3xl bg-white overflow-hidden mx-10 my-6 shadow-[24.7px_24.7px_49px_1px_rgb(0,0,0,0.07)]"}>
                {prod.is_prod_new && <span
                    className={"absolute text-white px-1.5 z-10 bg-black text-[8px] top-9 left-0 font-bold"}>NEW</span>}
                <Link href={"/" + prod.asset_id}>
                    <a className={`block z-0`} id={prod.asset_id} target="_blank">
                        <ShopDataBlockImage src={WEBASSETS + prod.single_view_img} alt={prod.seo ? prod.seo.imgalt : prod.name} outOfStock={!isInStock(prod)}/>
                        <div className={`flex px-5 items-center leading-none py-3`}>
                            <div className='flex-1'>
                                <p className={`font-600 font-cursive italic`}>{prod.name}</p>
                                <p className={`text-[10px] font-500`}>{prod.tag_line}</p>
                            </div>
                            <div className='inline-flex flex-col items-center'>
                                <p className={`text-xs`}>
                                    <PriceDisplay prod={prod}/>
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
                <a className={`block text-center z-0`} id={prod.asset_id} target="_blank">
                    <div
                        className={`rounded-3xl bg-white overflow-hidden border-2 border-white shadow-[24.7px_24.7px_49px_1px_rgb(0,0,0,0.07)]`}>
                        <ShopDataBlockImage src={WEBASSETS + prod.double_view_img} alt={prod.seo ? prod.seo.imgalt : prod.name} portrait={true}
                                            outOfStock={!isInStock(prod)}/>
                    </div>
                    <div className={`leading-none py-2`}>
                        <p className={`text-sm font-600 font-cursive italic`}>{prod.name}</p>
                        {prod.sale_price ? "" : <p className={`text-[10px] font-500`}>{prod.tag_line}</p>}
                        <p className={`text-xs`}>
                            <span>
                                <PriceDisplay prod={prod}/>
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
                        setSelectedSize("")
                        setExpandShop(false)
                        setShowSize(false)
                    }}
                    className={`group relative`}
                >
                    <WishListButton className={`absolute right-4 top-4 z-10`} pid={prod.asset_id} isMobile={false}/>
                    <Link href={"/" + prod.asset_id}>
                        <a target="_blank">
                            <ShopDataBlockImage
                                src={WEBASSETS + "/assets/" + prod.asset_id + "/new.jpg"}
                                alt={prod.seo ? prod.seo.imgalt : prod.name} portrait={portrait} expandShop={expandShop}
                                extraUrl={WEBASSETS + "/assets/" + prod.asset_id + "/mo.new.jpg"}
                            />
                        </a>
                    </Link>
                    {(showSize)
                        ? whatSizes()
                        : null
                    }
                    <div className="grid grid-cols-2 items-center h-16">
                        {(expandShop)
                            ?
                            isInStock(prod)
                                ? <Fragment>
                                    <button className={`font-800 h-full`} onClick={() => {
                                        setShowSize(true)
                                        setAddToCartClick(false)
                                    }}>SIZE
                                    </button>
                                    <div className={`font-800 cursor-pointer bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}
                                         onClick={() => saveToCart()}>
                                        <span className={`uppercase`}>Add to bag</span>
                                        <p className={`text-xs`}>
                                            <PriceDisplay prod={prod}/>
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
                        closeModal={setShowNotifyMe}
                        isMobile={appConfig.isMobile}
                        userO={getUserObject(userData)}
                        product={prod}
                        setError={setToastMsg}
                        setErrorShow={setShowToast}
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
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps, {setCart,addCartIntent})(ProductCard);
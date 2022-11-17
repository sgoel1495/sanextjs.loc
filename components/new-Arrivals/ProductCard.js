import React, {Fragment, useContext, useState} from 'react';
import Link from "next/link";
import WishlistButton from "../common/WishListButton";
import Image from "next/image";
import appSettings from "../../store/appSettings";
import AppWideContext from "../../store/AppWideContext";
import {userConfigState as userConfig} from "../../ReduxStore/initialStates";
import {connect} from "react-redux";
import currencyFormatter from "../../helpers/currencyFormatter";
import {addToCart} from "../../helpers/addTocart";
import returnSizes from "../../helpers/returnSizes";
import {useRouter} from "next/router";
import Toast from "../common/Toast";
import {setCart} from "../../ReduxStore/reducers/shoppingCartSlice";
import PriceDisplay from "../common/PriceDisplay";

const ArrivalDataBlockImage = (props) => (
    <span className={`block relative w-full h-full aspect-square`}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
    </span>
)

const ProductCard = ({prod, userData, shoppingCart, appConfig, setCart}) => {
    const router = useRouter();
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [isOver, setIsOver] = useState(false);
    const [showSize, setShowSize] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [addToCartClick, setAddToCartClick] = useState(false)
    const [toastMsg, setToastMsg] = useState(null)
    const [showToast, setShowToast] = useState(false)

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
        addToCart(userData, shoppingCart.cart, appConfig.apiToken, setCart, {cart: cart}).then(r => {
            setToastMsg(`${prod.name}: Size ${size ? size : selectedSize} added to your Bag!`)
            setShowToast(true)
        })
    }
    const whatSizes = () => {
        const sizeData = returnSizes(prod);
        let returnValue = null
        sizeData.forEach(size => {
            returnValue = <Fragment>
                {returnValue}
                <button className={`border text-sm text-[#777] px-1 py-0.5 ${(selectedSize === size) ? "border-black" : "border-transparent"}  ${prod.hide_sizes.includes(size.toLowerCase()) ? "line-through" : ""}`} onClick={() => prod.hide_sizes.includes(size.toLowerCase())?{}:saveToCart(size)}>
                    {size}
                </button>
            </Fragment>
        })
        return <div className='absolute bottom-16 inset-x-0 bg-white/80 z-10 py-2 flex items-center justify-center gap-x-3'>
            {returnValue}
        </div>
    }
    const imgPath = WEBASSETS + "/assets/" + prod.asset_id + (isOver ? "/mo.new.jpg" : "/new.jpg");
    const showProd = (
        <div className={`col-span-2`}>
            <p className={`text-h5 font-500`}>{prod.name}</p>
            <p className={`text-sm font-500`}>{prod.tag_line}</p>
        </div>
    );
    const showProdDetail = (
        <>
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
        </>
    );

    return <>
        <div className={"block bg-white text-center relative z-0"} onMouseEnter={() => setIsOver(true)} onMouseLeave={() => {
            setSelectedSize("")
            setShowSize(false)
            setIsOver(false)
        }}>
            <Link href={"/" + prod.asset_id}>
                <a className={"block bg-white text-center relative z-0"}>
                    <WishlistButton className={`absolute right-4 top-4 z-10`} pid={prod.asset_id}/>
                    <ArrivalDataBlockImage src={imgPath} alt={prod.name}/>
                </a>
            </Link>
            {(showSize)
                ? whatSizes()
                : null
            }
            <div className="grid grid-cols-2 items-center h-16">
                {isOver ? showProdDetail : showProd}
            </div>
        </div>
        <Toast show={showToast} hideToast={() => {
            setShowToast(false)
        }}>
            <p>{toastMsg}</p>
        </Toast>
    </>;
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        shoppingCart: state.shoppingCart,
        appConfig: state.appConfig,
    }
}

export default connect(mapStateToProps, {setCart})(ProductCard);

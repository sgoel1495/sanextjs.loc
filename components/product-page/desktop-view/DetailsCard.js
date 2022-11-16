import React, {useContext, useState} from 'react';
import WishlistButton from "../../common/WishListButton";
import appSettings from "../../../store/appSettings";
import AppWideContext from "../../../store/AppWideContext";
import Link from "next/link";
import {apiCall} from "../../../helpers/apiCall";
import ReactDom from "react-dom";
import SizeGuide from "../SizeGuide";
import Toast from "../../common/Toast";
import returnSizes, {isInStock} from "../../../helpers/returnSizes";
import {Fragment} from "react";
import MoreColours from "../../common/MoreColours";
import {addToCart, getUserObject} from "../../../helpers/addTocart";
import Image from "next/image";
import {FaFacebookF, FaTwitter} from 'react-icons/fa';
import TailoredSize from "../TailoredSize";
import emptyMeasurement from "../../../store/emptyMeasurement.json";
import currencyFormatter from "../../../helpers/currencyFormatter";
import {connect} from "react-redux";
import {setCart} from "../../../ReduxStore/reducers/shoppingCartSlice";
import NotifyMeModal from "../../common/NotifyMeModal";
import {useRouter} from "next/router";
import PriceDisplay from "../../common/PriceDisplay";

/**
 * @Sambhav look at line 61. We need a bar(border) above and below if the size has been selected
 * @param data
 * @param hpid
 * @param selectedSize
 * @param setSelectedSize
 * @param appConfig
 * @param userData
 * @param shoppingCart
 * @param userConfig
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const DetailsCard = ({data, hpid, selectedSize, setSelectedSize, appConfig, userData, shoppingCart, userConfig, ...props}) => {
    const router = useRouter();
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const currCurrency = userConfig.currCurrency
    const curr = currCurrency.toUpperCase();
    const [deliveryAvailable, setDeliveryAvailable] = useState(null)
    const [pincode, setPinCode] = useState(null)
    const [sizeModal, setSizeModal] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [showNotifyMe, setShowNotifyMe] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [currentMeasurement, setCurrentMeasurement] = useState({...emptyMeasurement, "selected_length": data.dress_length, "selected_sleeve": data.sleeve_length});
    //for toast
    const [toastMsg, setToastMsg] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const sizeAvail = returnSizes(data)

    React.useEffect(() => {
       if(router.query.tailor){
           setShowModal(true)
       }
    },[])

    const checkDelivery = async () => {
        if (pincode == null)
            return;
        const resp = await apiCall("cityByZipcode", appConfig.apiToken, {zipcode: pincode});
        setDeliveryAvailable(!!(resp.response_data && resp.response_data.city))
    }

    const saveToCart = (currMeasurement = {...emptyMeasurement, "selected_length": data.dress_length, "selected_sleeve": data.sleeve_length}) => {
        if ((selectedSize == null || selectedSize === "") && !currMeasurement.measure_id && !(sizeAvail.length === 1 && sizeAvail[0] === "F")) {
            setToastMsg("Please select a size first")
            setShowToast(true)
            return
        }
        if (!currMeasurement.measure_id && selectedSize === "T") {
            setShowModal(true)
            return
        }
        let cart = {
            "product_id": data.product_id,
            "size": sizeAvail.length === 1 && sizeAvail[0] === "F" ? "f" : selectedSize,
            "qty": 1,
            "is_sale": data.is_sale,
            "is_tailor": !!currMeasurement.measure_id,
            "sleeve_length": currMeasurement.selected_sleeve,
            "dress_length": currMeasurement.selected_length
        }
        let measurements = {}
        if (currMeasurement.measure_id) {
            if (!selectedSize) {
                cart['size'] = sizeAvail[0]
            }
            cart["measurment_id"] = currMeasurement.measure_id
            measurements = {...currMeasurement}
        } else if (currMeasurement.selected_length !== data.dress_length || currMeasurement.selected_sleeve !== data.sleeve_length) {
            let measureID = (new Date()).getTime().toString() + "_m"
            cart["measurment_id"] = measureID
            cart["is_tailor"] = true
            measurements = {...currMeasurement, "measure_id": measureID}
        }
        addToCart(userData, shoppingCart.cart, appConfig.apiToken, props.setCart, {cart: cart, measurments: measurements}).then(r => {
            setCurrentMeasurement({...emptyMeasurement, "selected_length": data.dress_length, "selected_sleeve": data.sleeve_length})
            setToastMsg("Added to Cart")
            setShowToast(true)
        })
    }

    const whatSizes = () => {
        let returnValue = null
        sizeAvail.forEach((size, index) => {
            returnValue = <Fragment>
                {returnValue}
                <span key={"sdsda" + index}
                      className={(selectedSize == size) ? "border-t border-b border-black text-black cursor-pointer" : "cursor-pointer border-t border-b border-transparent"}
                      onClick={() => setSelectedSize(size)}>
                    {size}
                </span>
            </Fragment>
        })
        return <div className={"flex justify-between font-600 mb-4 text-black/60"}>
            {returnValue}
        </div>
    }

    const shareOnTwitter = () => {
        let url = 'https://twitter.com/intent/tweet?url=' + `https://saltattire.com/${data.asset_id}&text=${data.asset_id}`;
        window.open(url, 'TwitterWindow', "width = 1200, height = 600");
        return false;
    }
    const shareOnFB = () => {
        let url = 'https://www.facebook.com/dialog/share?app_id=253839508451663&display=popup&href=' + `https://saltattire.com/${data.asset_id}`;
        window.open(url, 'FacebookWindow', "width = 1200, height = 600");
        return false;
    }

    return (
        <div>
            <div className={"bg-white p-4 shadow-xl"}>
                <div className={"flex items-center justify-between text-black/60 text-sm font-500 mb-4"}>
                    <span><PriceDisplay prod={data}/></span>
                    <div className='flex items-center gap-2 relative'>
                        <WishlistButton pid={hpid}/>
                        <button className={"relative block h-4 w-4"} onClick={() => setShowShare(!showShare)}>
                            <Image src={WEBASSETS + "/assets/images/share-1.svg"} layout={`fill`} objectFit={`cover`} alt={""}/>
                        </button>
                        {
                            showShare &&
                            <div className="absolute top-8 right-0 flex flex-col">
                                <button title="share on facebook" onClick={shareOnFB}>
                                    <FaFacebookF/>
                                </button>
                                <button title="share on twitter" className={"mt-2"} onClick={shareOnTwitter}>
                                    <FaTwitter/>
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <div className={"text-center mb-4"}>
                    <p className={"text-2xl"}>{data.name}</p>
                    <p className={"text-sm text-black/50 font-500"}>{data.tag_line}</p>
                </div>

                {
                    sizeAvail.length === 1 && sizeAvail[0] === "F" ?
                        null
                        :
                        <>
                            {whatSizes()}
                            <p
                                className={"text-center uppercase mb-2 text-black/60 font-600 text-xs cursor-pointer"}
                                onClick={() => setSizeModal(true)}
                            >
                                size guide
                            </p>
                        </>
                }
                {
                    sizeAvail.includes("T") &&
                    <TailoredSize data={data} currentMeasurement={currentMeasurement} setCurrentMeasurement={setCurrentMeasurement} setSize={setSelectedSize} isMobile={false}
                                  saveToCart={saveToCart} showModal={showModal} setShowModal={setShowModal}/>
                }
                {
                    isInStock(data) ||
                    <div className={"uppercase w-full text-white bg-black my-4 text-[13px] text-center"}>
                        sold out
                    </div>
                }
                <div className="flex items-center justify-center mb-5">
                    <button className="bg-black/90 text-white px-10 italic font-cursive text-xl pb-1 pt-3" onClick={() => {
                        if (isInStock(data))
                            saveToCart()
                        else
                            setShowNotifyMe(true)
                    }}>
                        {
                            isInStock(data) ?
                                <>i&lsquo;ll take it</>
                                :
                                <>notify me!</>
                        }
                    </button>
                </div>
                <div className={"flex items-center"}>
                    <span className='relative h-4 w-4'>
                        <Image
                            src={WEBASSETS + "/assets/images/plus.png"}
                            layout={`fill`}
                            objectFit={`cover`}
                            alt={""}
                        />
                    </span>
                    &nbsp;
                    <a href='#product_details' className={"uppercase text-sm"}>product details</a>
                </div>
                <MoreColours hpid={hpid}/>
            </div>
            <div className={"bg-white mt-2 flex justify-evenly text-xs border-4 border-black/10 py-2"}>
                <Link href={"/salt/shipping-returns"} key="shipping">
                    <a className={"uppercase underline"}>return policy</a>
                </Link>
                <Link href={"/salt/faq"} key="faq">
                    <a className={"uppercase underline"}>faq</a>
                </Link>
            </div>
            <div className={"bg-white mt-2 border-4 border-black/10 p-1"}>
                <p className={"text-[10px] tracking-tight font-600 mb-1"}> Please enter PIN to check delivery availability.</p>
                <div className={"inline-flex justify-between"}>
                    <input placeholder={"Enter pincode"} type="number"
                           className='border border-black text-sm w-3/5 placeholder:text-black font-500'
                           onChange={e => setPinCode(e.target.value)}
                    />
                    <button
                        className={"bg-black text-white uppercase text-sm px-2"}
                        onClick={checkDelivery}
                    >Submit
                    </button>
                </div>
                {(deliveryAvailable == null)
                    ? null
                    : (deliveryAvailable)
                        ? <div>Delivery Available!</div>
                        : <div>
                            Sorry! Delivery not available to this location.
                            <Link href="/salt/contact-us" key="contact">
                                <a> Contact Us </a>
                            </Link>
                            if you do not see your pincode.
                        </div>
                }
            </div>
            {sizeModal &&
                ReactDom.createPortal(
                    <SizeGuide closeModal={() => setSizeModal(false)} isMobile={appConfig.isMobile}/>,
                    document.getElementById("measurementmodal"))
            }
            <Toast show={showToast} hideToast={() => {
                setShowToast(false)
            }}>
                <p>{toastMsg}</p>
            </Toast>
            {showNotifyMe &&
                ReactDom.createPortal(
                    <NotifyMeModal
                        closeModal={() => setShowNotifyMe(false)}
                        isMobile={appConfig.isMobile}
                        userO={getUserObject(userData)}
                        product={data}
                    />,
                    document.getElementById("measurementmodal"))
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        shoppingCart: state.shoppingCart,
        appConfig: state.appConfig,
        userConfig: state.userConfig
    }
}

export default connect(mapStateToProps, {setCart})(DetailsCard);
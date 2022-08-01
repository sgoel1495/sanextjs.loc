import React, {useContext, useState} from 'react';
import WishlistButton from "../../common/WishListButton";
import appSettings from "../../../store/appSettings";
import AppWideContext from "../../../store/AppWideContext";
import Link from "next/link";
import {apiCall} from "../../../helpers/apiCall";
import ReactDom from "react-dom";
import MeasurementModal0 from "../../../components/user/MeasurementModal0"
import MeasurementModal1 from "../../../components/user/MeasurementModal1";
import MeasurementModal2 from "../../../components/user/MeasurementModal2";
import MeasurementModal3 from "../../../components/user/MeasurementModal3";
import SizeGuide from "../SizeGuide";
import Toast from "../../common/Toast";
import returnSizes from "../../../helpers/returnSizes";
import {Fragment} from "react";
import MoreColours from "../../common/MoreColours";
import {addToCart, getUserObject} from "../../../helpers/addTocart";
import Image from "next/image";
import {FaFacebookF, FaTwitter} from 'react-icons/fa';

/**
 * @Sambhav look at line 61. We need a bar(border) above and below if the size has been selected
 * @param data
 * @param hpid
 * @param selectedSize
 * @param setSelectedSize
 * @returns {JSX.Element}
 * @constructor
 */

const DetailsCard = ({data, hpid, selectedSize, setSelectedSize}) => {
    const {dataStore, updateDataStore} = useContext(AppWideContext)
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const currCurrency = dataStore.currCurrency
    const currencyData = appSettings("currency_data")
    const currencySymbol = currencyData[currCurrency].curr_symbol;
    const [deliveryAvailable, setDeliveryAvailable] = useState(null)
    const [pincode, setPinCode] = useState(null)
    const [sizeModal, setSizeModal] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [refresh, setRefresh] = useState(false)
    //for toast
    const [toastMsg, setToastMsg] = useState(null)
    const [showToast, setShowToast] = useState(false)

    //for tailored model
    const [showModal0, setShowModal0] = useState(false)
    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [showModal3, setShowModal3] = useState(false)
    const [showModalPastOrders, setShowModalPastOrders] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [currentMeasureProduct, setCurrentMeasurementProduct] = useState(null)
    const [currentMeasurement, setCurrentMeasurement] = useState(null)
    const measurementKeys = Object.keys(dataStore.userMeasurements)
    const nextModal = () => {
        if (showModal0) {
            setShowModal0(false)
            setShowModal1(true)
            setShowModal2(false)
            setShowModal3(false)
        } else if (showModal1) {
            setShowModal0(false);
            setShowModal1(false);
            setShowModal2(true);
            setShowModal3(false);
        } else if (showModal2) {
            setShowModal0(false);
            setShowModal1(false);
            setShowModal2(false);
            setShowModal3(true);
        }
    }
    const lastModal = () => {
        if (showModal1) {
            setShowModal0(true);
            setShowModal1(false);
            setShowModal2(false);
            setShowModal3(false);
        } else if (showModal2) {
            setShowModal0(false);
            setShowModal1(true);
            setShowModal2(false);
            setShowModal3(false);
        } else if (showModal3) {
            setShowModal1(false);
            setShowModal1(false);
            setShowModal2(true);
            setShowModal3(false);
        }
    }
    const getNewKey = () => {
        const baseKey = dataStore.userServe.temp_user_id || Date.now();

        let newKey = "";
        for (let x = 1; x < 100; x++) {
            newKey = baseKey + "_" + x.toString();
            if (!measurementKeys.includes(newKey))
                break;
        }
        return newKey;
    }
    const addNewModal = (m) => {
        setCurrentProduct(data)
        setCurrentMeasurement(m);
        nextModal()
    }
    const pastOrdersModal = () => {
        setShowModal0(false)
        setShowModal1(false)
        setShowModal2(false)
        setShowModal3(false)
        setShowModalPastOrders(true)
    }
    const closeModal = () => {
        setShowModal0(false)
        setShowModal1(false)
        setShowModal2(false)
        setShowModal3(false)
        setShowModalPastOrders(false)
    }
    const updateValues = (key, value) => {
        currentMeasurement[key] = value;
        setCurrentMeasurement(currentMeasurement);
        setRefresh(!refresh);
    }
    const refreshDataStore = async () => {
        const measurementCall = await apiCall("userMeasurements", dataStore.apiToken, {
            "user": getUserObject(dataStore, updateDataStore)
        });

        let userMeasurements = {};
        if (measurementCall.hasOwnProperty("response") && measurementCall.response && Object.keys(measurementCall.response).length > 0)
            userMeasurements = measurementCall.response
        updateDataStore("userMeasurements", dataStore.userMeasurements)
    }

    const delMeasurement = async (m) => {
        //only delete. no refresh
        delete dataStore.userMeasurements[m.measure_id]
        if (dataStore.userData.contact) {
            //logged in user
            await apiCall("removeMeasurements", dataStore.apiToken, {
                user: getUserObject(dataStore, updateDataStore),
                measurments: {
                    measure_id: m.measure_id
                }
            });
        }
    }

    const saveModal = async () => {

        if (currentMeasurement.measure_id == "") {
            // add new
            currentMeasurement.measure_id = getNewKey();
        } else {
            //case update - we simply remove and add
            await delMeasurement(currentMeasurement)
        }

        if (dataStore.userData.contact) {
            // we have a valid user
            await apiCall("addMeasurements", dataStore.apiToken, {
                "user": getUserObject(dataStore, updateDataStore),
                "measurments": currentMeasurement
            })

            // update DataStore
            await refreshDataStore()
        } else {
            //non logged in case
            dataStore.userMeasurements[currentMeasurement.measure_id] = currentMeasurement
            updateDataStore("userMeasurements", dataStore.userMeasurements)
        }

        closeModal()
    }

    const sizeByProduct = (p) => {
        //p is the item
        setCurrentMeasurementProduct(p)
        closeModal()
        addNewModal(p.measurement)
    }

    const addTailorToCart = async () => {

    }

    const checkDelivery = async () => {
        if (pincode == null)
            return;
        const resp = await apiCall("cityByZipcode", dataStore.apiToken, {zipcode: pincode});
        setDeliveryAvailable((resp.response_data && resp.response_data.city) ? true : false)
    }

    const saveToCart = async () => {
        if (selectedSize == null || selectedSize === "") {
            setToastMsg("Please select a size first")
            setShowToast(true)
            return
        }
        const cart = {
            product_id: hpid,
            size: selectedSize,
            qty: "1",
            is_sale: false,
            is_tailor: false,
            sleeve_length: "",
            dress_length: ""
        }
        addToCart(dataStore, updateDataStore, {cart: cart}).then(r => {
            setToastMsg("Added to Cart")
            setShowToast(true)
        })
    }

    const whatSizes = () => {
        const sizeData = returnSizes(data);
        let returnValue = null
        sizeData.forEach((size, index) => {
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
                    <span>{currencySymbol} {currCurrency === "inr" ? data.price : data.usd_price}</span>
                    <div className='flex items-center gap-2 relative'>
                        <WishlistButton pid={hpid}/>
                        <button className={"relative block h-4 w-4"} onClick={() => setShowShare(!showShare)}>
                            <Image src={WEBASSETS + "/assets/images/share-1.svg"} layout={`fill`} objectFit={`cover`}/>
                        </button>
                        {
                            showShare &&
                            <div className="absolute top-8 right-0 flex flex-col">
                                <button title="share on facebook"  onClick={shareOnFB}>
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
                {whatSizes()}
                <p
                    className={"text-center uppercase mb-2 text-black/60 font-600 text-xs cursor-pointer"}
                    onClick={() => setSizeModal(true)}
                >
                    size guide
                </p>
                <div className={"flex justify-center items-center gap-2 font-700 text-sm text-black/60 mb-4"} onClick={() => setShowModal0(true)}>
                    <span className={"uppercase underline cursor-pointer"}>tailor it</span>
                    <span className={""}>/</span>
                    <span className={"uppercase underline cursor-pointer"}>customise</span>
                </div>
                <div className="flex items-center justify-center mb-5">
                    <button className="bg-black/90 text-white px-10 italic font-cursive text-xl pb-1 pt-3" onClick={saveToCart}>
                        i&lsquo;ll take it
                    </button>
                </div>
                <div className={"flex items-center"}>
                    <span className='relative h-4 w-4'>
                        <Image
                            src={WEBASSETS + "/assets/images/plus.png"}
                            layout={`fill`}
                            objectFit={`cover`}
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
                <SizeGuide closeModal={() => setSizeModal(false)} isMobile={dataStore.isMobile}/>,
                document.getElementById("measurementmodal"))
            }
            {showModal0 &&
            ReactDom.createPortal(
                <MeasurementModal0
                    closeModal={closeModal.bind(this)}
                    isMobile={dataStore.isMobile}
                    addNew={addNewModal.bind(this)}
                    pastOrders={pastOrdersModal.bind(this)}
                    measureProduct={currentMeasureProduct}
                />,
                document.getElementById("measurementmodal"))
            }
            {showModal1 &&
            ReactDom.createPortal(
                <MeasurementModal1
                    closeModal={closeModal.bind(this)}
                    isMobile={dataStore.isMobile}
                    measurement={currentMeasurement}
                    lastModal={lastModal.bind(this)}
                    nextModal={nextModal.bind(this)}
                    updateValues={updateValues.bind(this)}
                    product={currentProduct}
                />,
                document.getElementById("measurementmodal"))
            }
            {showModal2 &&
            ReactDom.createPortal(
                <MeasurementModal2
                    closeModal={closeModal.bind(this)}
                    isMobile={dataStore.isMobile}
                    measurement={currentMeasurement}
                    nextModal={nextModal.bind(this)}
                    lastModal={lastModal.bind(this)}
                    updateValues={updateValues.bind(this)}
                    product={currentProduct}
                />,
                document.getElementById("measurementmodal"))
            }
            {showModal3 &&
            ReactDom.createPortal(
                <MeasurementModal3
                    closeModal={closeModal.bind(this)}
                    isMobile={dataStore.isMobile}
                    measurement={currentMeasurement}
                    lastModal={lastModal.bind(this)}
                    saveModal={saveModal.bind(this)}
                    addTailorToCart={addTailorToCart.bind(this)}
                    product={currentProduct}
                />,
                document.getElementById("measurementmodal"))
            }

            {showModalPastOrders &&
            ReactDom.createPortal(
                <MeasurementModal3
                    closeModal={closeModal.bind(this)}
                    isMobile={dataStore.isMobile}
                    sizeByProduct={sizeByProduct.bind(this)}
                />,
                document.getElementById("measurementmodal"))
            }
            <Toast show={showToast} hideToast={() => {
                setShowToast(false)
            }}>
                <p>{toastMsg}</p>
            </Toast>
        </div>
    );
};

export default DetailsCard;
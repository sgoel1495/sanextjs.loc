import React, {useContext, useState} from 'react';
import Image from "next/image";
import ReactDom from "react-dom";
import StarSVG from "./StarSVG";
import Modal from "./MyOrdersModals"
import {DateTime} from "luxon";
import AppWideContext from "../../../store/AppWideContext";
import Toast from "../../common/Toast";

const MyOrderProductCard = ({product, itemIndex, isMobile, getOrderHistory}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [showModal, setShowModal] = useState(0)
    const [toastMsg, setToastMsg] = React.useState(false)

    const mobile = <div className={"flex flex-col bg-[#f7f7f7] mx-2 py-3"}>
        <div className={"flex justify-between gap-4"}>
            <div className={"flex flex-col"}>
                <Image
                    src={WEBASSETS + "/assets/" + product.item[itemIndex].asset_id + "/thumb.jpg"} alt="cart"
                    width="129" height="208"/>
                <span className={"flex flex-col items-center"}>
                    <span> {product.item.tagline}</span>
                    <span className={"flex gap-2 text-xs"}>Qty: {product.item[itemIndex].qty}<span>SIZE {product.item[itemIndex].size}</span></span>
                </span>
            </div>
            <div className={"flex flex-col"}>
                <span className={"block text-xs"}>ORDER # {product.order_id}</span>
                <div>
                    <strong>ORDER PLACED</strong>
                    <span className={"block mb-3"}>{product.order_date_time}</span>
                    <strong>TOTAL AMOUNT:</strong>
                    <span> {"Rs."}{product.payable}</span>
                </div>
                <div className={"flex flex-col my-2"}>
                    <strong> SHIP TO:</strong>
                    <span className={"text-xs"}>{product.delivery_address.address}</span>
                    <span className={"text-xs"}>{product.delivery_address.country}, {product.delivery_address.state}</span>
                    <span className={"text-xs"}>{product.delivery_address.city},{product.delivery_address.zip_code}</span>
                    <span
                        onClick={() => {
                            setShowModal(1)
                        }}
                        className={"text-xs"}
                    >
                        Change Shipping Address
                    </span>
                </div>
                <div className={"flex flex-col gap-1 mb-5"}>
                    <strong>
                        ORDER CONFIRMED
                    </strong>
                    <span
                        onClick={() => {
                            setShowModal(2)
                        }}
                    >
                        <StarSVG type={"filledBlackStar"}/>RATE &amp; REVIEW PRODUCT
                    </span>
                </div>
            </div>
        </div>
        <div className={"flex flex-col items-center"}>
            {
                Object.keys(product.item_status).length <= 1 ?
                    <button
                        onClick={() => {
                            setShowModal(3)
                        }}
                        className="ml-3 w-[60%] bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-2"
                    >
                        CANCEL
                    </button>
                    :
                    null
            }
            <button
                onClick={() => {
                    setShowModal(4)
                }}
                className="ml-3 w-[60%] bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-2">
                TRACK YOUR ORDER
            </button>
        </div>
    </div>

    const browser = <div className={"flex bg-[#f7f7f7] w-full p-3"}>
        <div className={"flex justify-between items-start gap-4"}>
            <div className={"flex flex-col relative"}>
                <Image
                    src={WEBASSETS + "/assets/" + product.item[itemIndex].asset_id + "/thumb.jpg"} alt="cart"
                    width="174" height="282"
                />
                <div className={"absolute inset-x-0 bottom-0 bg-white/90 flex items-start p-3 text-xs"}>
                    <div className='flex-1'>{product.item.tagline} Name</div>
                    <div className='text-right'>
                        <p>{product.item[itemIndex].qty}</p>
                        <p>{product.item[itemIndex].size}</p>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col"}>
                <span className={"block text-xs mb-2 font-500"}>ORDER # {product.order_id}</span>
                <div>
                    <strong className='leading-[1] text-sm'>ORDER PLACED</strong>
                    <span className={"block mb-3 text-sm font-500 text-sm"}>{new DateTime.fromISO(product.order_date_time).toLocaleString(DateTime.DATETIME_SHORT)}</span>
                    <strong>TOTAL AMOUNT:</strong>
                    <span className='block text-sm font-500'>{dataStore.currSymbol} {product.payable}</span>
                </div>
                <div className={"flex flex-col my-2"}>
                    <strong> SHIP TO:</strong>
                    <span className={"text-[13px] font-500"}>{product.delivery_address.address}</span>
                    <span className={"text-[13px] font-500"}>{product.delivery_address.country}, {product.delivery_address.state}</span>
                    <span className={"text-[13px] font-500"}>{product.delivery_address.city},{product.delivery_address.zip_code}</span>
                    {
                        Object.keys(product.item_status).length <= 1 ?
                            <span
                                onClick={() => {
                                    setShowModal(1)
                                }}
                                className={"text-[11px] font-600 hover:underline cursor-pointer"}
                            >
                                Change Shipping Address
                            </span>
                            :
                            null
                    }
                </div>
                <div className={"flex flex-col gap-1 mb-5 mt-1 text-sm"}>
                    <strong>
                        ORDER CONFIRMED
                    </strong>
                    <span
                        onClick={() => {
                            setShowModal(2)
                        }}
                        className='font-700 flex items-center mt-2'
                    >
                        <StarSVG type={"filledBlackStar"}/>RATE &amp; REVIEW PRODUCT
                    </span>
                </div>
            </div>
        </div>
        <div className={"flex flex-col items-center flex-1"}>
            <button
                onClick={() => {
                    setShowModal(3)
                }}
                className="ml-3 w-[60%] bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-2"
            >
                CANCEL
            </button>
            <button
                onClick={() => {
                    setShowModal(4)
                }}
                className="ml-3 w-[60%] bg-black px-4 py-1.5 text-white uppercase text-sm font-500 shadow-md my-2">
                TRACK YOUR ORDER
            </button>
        </div>
    </div>

    return <>
        {isMobile ? mobile : browser}
        {
            showModal > 0
            && ReactDom.createPortal(
                <Modal
                    isMobile={isMobile}
                    setShowModal={setShowModal}
                    index={showModal}
                    data={product}
                    itemIndex={itemIndex}
                    setToastMsg={setToastMsg}
                    getOrderHistory={getOrderHistory}
                />,
                document.getElementById("measurementmodal")
            )
        }
        <Toast show={toastMsg} hideToast={() => setToastMsg(false)}>
            {toastMsg}
        </Toast>
    </>
};

export default MyOrderProductCard;

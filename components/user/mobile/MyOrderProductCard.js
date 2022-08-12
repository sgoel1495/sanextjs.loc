import React, {useState} from 'react';
import Image from "next/image";
import ReactDom from "react-dom";
import StarSVG from "./StarSVG";
import Modal from "./MyOrdersModals"


const MyOrderProductCard = ({product, itemIndex}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showModal, setShowModal] = useState(0)

console.log('aaya')
    return (<>
        <div className={"flex flex-col bg-[#f7f7f7] mx-2 py-3"}>
            <div className={"flex justify-between gap-4"}>
                <div className={"flex flex-col"}>
                    <Image
                        src={WEBASSETS + "/assets/"+product.item[itemIndex].asset_id+"/thumb.jpg"} alt="cart"
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
        {
            showModal > 0
            && ReactDom.createPortal(
                <Modal
                    setShowModal={setShowModal}
                    index={showModal}
                    data={product}
                />,
                document.getElementById("measurementmodal")
            )
        }

    </>);
};

export default MyOrderProductCard;

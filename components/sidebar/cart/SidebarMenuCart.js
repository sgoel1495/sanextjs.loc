import Image from "next/image";
import React, { useContext, useState} from "react";
import ReactDom from "react-dom";
import "swiper/css";
import AppWideContext from "../../../store/AppWideContext";
import qtyInCart from "../../../helpers/qtyInCart";
import CartModal from "./CartModal";



/**
 * @todo No api for media buzz or testimonial. Hardcoded.
 * @params {isMobile} props
 * @constructor
 */

function SidebarMenuCart(props) {
    const {dataStore} = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenuCart, setShowSidebarMenuCart] = useState(false);
    React.useEffect(() => {
        if (showSidebarMenuCart) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenuCart])
    const closeModal = () => {
        setShowSidebarMenuCart(false);
    }
    const data = [];

    let iconHeight;
    switch (props.type) {
        case "shopMenu":
            iconHeight = "h-12"
            break;
        default:
            iconHeight = "h-6"
    }


    return (
        <span className={`block relative w-6 ${iconHeight}`}>
            {
                props.type !== "menu"
                &&
                <a
                    onClick={() => props.isMobile ? null : setShowSidebarMenuCart(true)}
                    href={props.isMobile ? "/homepage/cart" : "javascript:;"}
                    className={`block relative w-6 cursor-pointer ${iconHeight}`}
                >
                    <span className="absolute top-1 -right-1 font-600 text-[#777] text-xs">{qtyInCart(dataStore)}</span>
                    <Image
                        src={WEBASSETS + "/assets/images/cart.png"}
                        alt="carticon"
                        layout={`fill`}
                        objectFit={`contain`}
                    />
                </a>
            }
            {
                showSidebarMenuCart
                &&
                ReactDom.createPortal(<CartModal data={data} closeModal={closeModal.bind(this)}/>,
                    document.getElementById("cartside"))
            }
        </span>
    );
}

export default SidebarMenuCart;



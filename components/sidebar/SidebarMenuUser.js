import Link from "next/link";
import Image from "next/image";
import React, {Fragment, useState} from "react";
import ReactDom from "react-dom";

/**
 * @todo No api for media buzz or testimonial. Hardcoded.
 * @params {isMobile} props
 * @constructor
 */

function UserModal(props) {
    /*
    @Sambahav Please complete the modal as you see correct
     */
    const {closeModal} = props

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView = null;

    const browserView = (
        <div onClick={closeModal}>
        </div>);

    return props.isMobile ? mobileView : browserView
}


function SidebarMenuUser(props) {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);

    React.useEffect(() => {
        if (showSidebarMenu) document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset"
    }, [showSidebarMenu])

    const closeModal = () => {
        setShowSidebarMenu(false);
    }
    const data = [];

    const mobileView = null;

    const browserView = (
        <>
            <div onClick={() => setShowSidebarMenu(true)} className={"ml-2"}>
                <Image src={WEBASSETS + "/assets/images/usericon.png"} alt="menuicon" width="24" height="24"/>
            </div>
            {showSidebarMenu && ReactDom.createPortal(
                <CartModal data={data} closeModal={closeModal.bind(this)}/>,
                document.getElementById("userband"))}
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SidebarMenuUser;



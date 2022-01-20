import Image from "next/image";
import {Fragment, useState} from "react";
import ReactDom from "react-dom";
import Link from "next/link";

/**
 * @todo We do not have to api to list the menu
 * @params {isMobile } props
 * @constructor
 */

function HamburgerModal(props) {

    /*
    @Sambhav
    please create an icon to close the modal and call props.closeModal on it
    added global css for testing. should be removed when button in place
    At present we do not have data for this. so create static.
    You also have to set the css so that the modal has precedence
     */
    return <div className="hamburger" onClick={props.closeModal}>
        <ul>
            <Link href="#">
                <a className="">ACCOUNT<span className="mob-side-sub">Login/Signup</span></a>
            </Link>
            <Link href="#">
                <a className="">ACCOUNT<span className="mob-side-sub">Login/Signup</span></a>
            </Link>
        </ul>
    </div>;
};


function SidebarMenuHamburger(props) {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);

    const closeModal = () => {
        setShowSidebarMenu(false);
    }
    const data = [];

    const mobileView = null;


    const browserView = <Fragment>
        {!showSidebarMenu &&
            <div onClick={() => setShowSidebarMenu(true)} className={"ml-2"}>
                <Image src={WEBASSETS + "/assets/images/menuicon_v1.png"} alt="menuicon" width="24" height="24"/>
            </div>}
        {showSidebarMenu && ReactDom.createPortal(<HamburgerModal data={data} closeModal={closeModal.bind(this)}/>,
            document.getElementById("hamburger"))}
    </Fragment>;

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SidebarMenuHamburger;

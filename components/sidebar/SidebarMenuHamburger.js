import Image from "next/image";
import {Fragment, useState} from "react";

/**
 * @params {isMobile } props
 * @constructor
 */

function SidebarMenuHamburger(props) {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);

    const mobileView = null;

    const browserView = <Fragment>
        <div onClick={() => setShowSidebarMenu(true)} className={"ml-2"}>
            <Image src={WEBASSETS + "/assets/images/menuicon_v1.png"} alt="menuicon" width="24" height="24"/>
        </div>
    </Fragment>;

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SidebarMenuHamburger;

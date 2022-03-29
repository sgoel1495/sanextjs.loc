/**
 * @params {isMobile} props
 * @constructor
 */
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import SaltIcon from "./SaltIcon";
import SidebarMenuHamburger from "../sidebar/SidebarMenuHamburger";
import CurrencySwitcher from "./CurrencySwitcher";
import SearchMenu from "../search/SearchMenu";
import Menu from "./Menu";
import SidebarMenuCart from "../sidebar/SidebarMenuCart";
import SidebarMenuUser from "../sidebar/SidebarMenuUser";

function Navbar(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const navStyle = "px-4 py-1 uppercase"
    const iconHeightWeight = "30"

    const mobileView = <>
        <div className={navStyle} style={{background:"var(--very-light-pink)"}}>
            <div className={"text-center mb-2"}>
                <div className={"flex items-center justify-center"}>
                    <SaltIcon isMobile={true}/>
                    <CurrencySwitcher isMobile={true}/>
                </div>
                <p className={'text-xs'}>BESPOKE &amp; CUSTOM CLOTHING</p>
            </div>
        </div>
        <div className={"z-10 sticky top-0 pt-2 " + navStyle} style={{background:"var(--very-light-pink)"}}>
            <ul className={"flex gap-5 justify-between"}>
                <li>
                    <SidebarMenuHamburger isMobile={false}/>
                </li>
                <li>
                    <Link href="/homepage/signin">
                        <a>
                            <Image className={"w-6 h-6"} src={WEBASSETS + "/assets/images/user_icon.svg"} alt="user" width={iconHeightWeight} height={iconHeightWeight}/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/new-arrivals/all">
                        <a>
                            <Image src={WEBASSETS + "/assets/images/new_icon.svg"} alt="new" width={iconHeightWeight} height={iconHeightWeight}/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/homepage/signin">
                        <a>
                            <Image src={WEBASSETS + "/assets/images/fav_icon.svg"} alt="fav" width={iconHeightWeight} height={iconHeightWeight}/>
                        </a>
                    </Link>
                </li>
                <li>
                    <SearchMenu isMobile={true}/>
                </li>
                <li>
                    <SidebarMenuCart isMobile={true}/>
                </li>
            </ul>
        </div>
    </>;

    const browserView = (
        <nav className={navStyle + " flex items-center gap-x-4"}>
            <SaltIcon isMobile={false}/>
            <SidebarMenuHamburger isMobile={false}/>
            <Menu source="exploreNewArrivals" isMobile={false}/>
            <SearchMenu isMobile={false}/>
            <CurrencySwitcher isMobile={false}/>
            <SidebarMenuUser isMobile={false}/>
            <SidebarMenuCart isMobile={false}/>
        </nav>
    );

    return props.isMobile ? mobileView : browserView

}

export default Navbar;

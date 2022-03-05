/**
 * @todo @Sambhav css pls
 * @params {isMobile} props
 * @constructor
 */

import Image from "next/image";
import Link from "next/link";
import SaltIcon from "./SaltIcon";
import SidebarMenuHamburger from "../sidebar/SidebarMenuHamburger";
import CurrencySwitcher from "./CurrencySwitcher";
import SearchMenu from "../search/SearchMenu";
import Menu from "./Menu";
import SidebarMenuCart from "../sidebar/SidebarMenuCart";
import SidebarMenuUser from "../sidebar/SidebarMenuUser";

function LooksNavbar(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const navStyle = "px-8 py-4"
    const iconHeightWeight = "30"

    const mobileView = <nav className={navStyle}>
        <div className={"text-center mb-4"}>
            <SaltIcon isMobile={true}/>
            <CurrencySwitcher isMobile={false}/>
            <p className={'text-xs'}>BESPOKE &amp; CUSTOM CLOTHING</p>
        </div>
        <ul className={"flex gap-5 justify-between"}>
            <li key="sidebarhamburger">
                <SidebarMenuHamburger isMobile={false}/>
            </li>
            <li key="signin">
                <Link href="/homepage/signin">
                    <a>
                        <Image className={"w-6 h-6"} src={WEBASSETS + "/assets/images/user_icon.svg"} alt="user" width={iconHeightWeight} height={iconHeightWeight}/>
                    </a>
                </Link>
            </li>
            <li key="new-arrivals">
                <Link href="/new-arrivals/all">
                    <a>
                        <Image src={WEBASSETS + "/assets/images/new_icon.svg"} alt="new" width={iconHeightWeight} height={iconHeightWeight}/>
                    </a>
                </Link>
            </li>
            <li key="signin">
                <Link href="/homepage/signin">
                    <a>
                        <Image src={WEBASSETS + "/assets/images/fav_icon.svg"} alt="fav" width={iconHeightWeight} height={iconHeightWeight}/>
                    </a>
                </Link>
            </li>
            <li key="searchmenu">
                <SearchMenu isMobile={true}/>
            </li>
            <li key="sidebarmenu">
                <SidebarMenuCart isMobile={true}/>
            </li>
        </ul>
    </nav>;

    const browserView = (
        <nav className={navStyle + " flex items-start gap-x-4 relative"}>
            <SaltIcon type={`looksPage`} isMobile={false}/>
            <SidebarMenuHamburger type={`looksPage`} isMobile={false}/>
            <Menu source="getLooksData" isMobile={false}/>
            <SearchMenu type={`looksPage`} isMobile={false}/>
            <CurrencySwitcher type={`looksPage`} isMobile={false}/>
            <SidebarMenuUser type={`looksPage`} isMobile={false}/>
            <SidebarMenuCart type={`looksPage`} isMobile={false}/>
        </nav>
    );

    return props.isMobile ? mobileView : browserView

}

export default LooksNavbar;

/**
 * @params {isMobile} props
 * @constructor
 */

import Image from "next/image";
import Link from "next/link";
import SaltIcon from "./SaltIcon";
import SidebarMenuHamburger from "../sidebar/SidebarMenuHamburger";
import CurrencySwitcher from "./CurrencySwitcher";
import UserLoginMenu from "../user/UserLoginMenu";
import CartMenu from "../cart/CartMenu";
import SearchMenu from "../search/SearchMenu";
import Menu from "./Menu";

function Navbar(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const navStyle = "bg-[#ffffff99] hover:bg-white px-4 py-1"
    const navIconsStyle = "w-6 h-6";
    const iconHeightWeight = "30"

    const mobileView = <nav className={navStyle}>
        <div className={"text-center mb-4"}>
            <SaltIcon isMobile={true}/>
            <CurrencySwitcher isMobile={false}/>
            <p className={'text-xs'}>BESPOKE &amp; CUSTOM CLOTHING</p>
        </div>
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
                <CartMenu isMobile={true}/>
            </li>
        </ul>
    </nav>;

    const browserView = (
        <nav className={navStyle + " flex"}>
            <SaltIcon isMobile={false}/>
            <SidebarMenuHamburger isMobile={false}/>
            <Menu isMobile={false}/>
            <SearchMenu isMobile={false}/>
            <CurrencySwitcher isMobile={false}/>
            <UserLoginMenu isMobile={false}/>
            <CartMenu isMobile={false}/>
        </nav>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default Navbar;

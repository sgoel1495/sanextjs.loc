/**
 * @params {isMobile} props
 * @constructor
 */
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
    const menuRef = useRef(null);
    const subMenuRef = useRef(null);
    const [show, setShow] = useState(false)

    const toggleShow = useCallback((e) => {
        if (show) {
            if ((window.scrollY - menuRef.current.getBoundingClientRect().bottom) < subMenuRef.current.clientHeight)
                setShow(false)

        } else {
            if (window.scrollY - menuRef.current.getBoundingClientRect().bottom > subMenuRef.current.clientHeight)
                setShow(true)
        }
    }, [show])

    useEffect(() => {
        if (props.subMenu)
            window.addEventListener('scroll', toggleShow);
        return () => {
            if (props.subMenu)
                window.removeEventListener('scroll', toggleShow);
        }
    }, [toggleShow])


    let navStyle = "px-4 py-1 uppercase"
    const iconHeightWeight = "30"

    switch (props.type) {
        case "shopMenu":
            navStyle = "py-1 px-4 relative"
    }

    let mobileView, browserView;

    switch (props.type) {
        case "shopMenu":
            browserView =
                <nav className={navStyle + " flex items-center gap-x-4"}>
                    <SaltIcon type={props.type} isMobile={false}/>
                    <CurrencySwitcher type={props.type} isMobile={false}/>
                    <Menu type={props.type} isMobile={false}/>
                    <SidebarMenuUser type={props.type} isMobile={false}/>
                    <SearchMenu type={props.type} isMobile={false}/>
                    <SidebarMenuCart type={props.type} isMobile={false}/>
                </nav>
            mobileView = <>
                <div className={navStyle + " flex items-center justify-between"} style={{background: "var(--very-light-pink)"}}>
                    <div className={"flex items-center"}>
                        <SidebarMenuHamburger isMobile={false}/>
                        <SaltIcon isMobile={true} type={props.type}/>
                        <p className={'text-xs'}>BESPOKE &amp; <br/> CUSTOM CLOTHING</p>
                    </div>
                    <div className={"flex items-center"}>
                        <SearchMenu isMobile={true}/>
                        <SidebarMenuCart isMobile={true}/>
                    </div>
                </div>
                <div className={"z-20 sticky top-0 pt-2 " + navStyle} style={{background: "var(--very-light-pink)"}} ref={menuRef}>
                    <ul className={"flex gap-5 justify-between overflow-x-scroll z-20"}>
                        <li className={"sticky left-0"}>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/new-arrivals/all"}>NEW IN</Link>
                        </li>
                        <Menu isMobile={true}/>
                    </ul>
                    <div className={"absolute w-full  -mb-1 shadow-[7.1px_7.1px_14.6px_0.5px_rgb(0,0,0,0.08)] transition-[top] duration-700 ease-in-out"}
                         style={{top: show ? menuRef.current.getBoundingClientRect().bottom - 1 : 0, left: show ? 0 : -1000}} ref={subMenuRef}>
                        {props.subMenu}
                    </div>
                </div>
            </>;
            break;
        case "minimal":
            browserView =
                <nav className={navStyle + " flex items-center gap-x-4"}>
                    <SaltIcon type={props.type} isMobile={false}/>
                    <SidebarMenuHamburger type={props.type} isMobile={false}/>
                    <CurrencySwitcher type={props.type} isMobile={false}/>
                    <Menu type={props.type} isMobile={false} filterData={props.filterData}/>
                    <SearchMenu type={props.type} isMobile={false}/>
                    <SidebarMenuCart type={props.type} isMobile={false}/>
                </nav>
            mobileView = (
                <div className={"flex justify-between items-center bg-white/90 z-20 px-4"}>
                    <div className={"inline-flex items-center gap-x-5"}>
                        <Link href={"/homepage/signin"}>
                            <a className={"relative block w-6 h-6"}>
                                <Image src={WEBASSETS + "/assets/images/user_icon.svg"} alt="user" layout={`fill`} objectFit={`cover`}/>
                            </a>
                        </Link>
                        <SearchMenu isMobile={true}/>
                    </div>
                    <div className={"flex-1 inline-flex justify-center"}>
                        <SaltIcon type={props.type} isMobile={true}/>
                    </div>
                    <div className={"inline-flex items-center gap-x-5"}>
                        <SidebarMenuCart isMobile={true}/>
                        <SidebarMenuHamburger isMobile={false}/>
                    </div>
                </div>
            );
            break;
        default:
            browserView =
                <nav className={navStyle + " flex items-center gap-x-4"}>
                    <SaltIcon type={props.type} isMobile={false}/>
                    <SidebarMenuHamburger type={props.type} isMobile={false}/>
                    <Menu type={props.type} isMobile={false}/>
                    <SearchMenu type={props.type} isMobile={false}/>
                    <CurrencySwitcher type={props.type} isMobile={false}/>
                    <SidebarMenuUser type={props.type} isMobile={false}/>
                    <SidebarMenuCart type={props.type} isMobile={false}/>
                </nav>
            mobileView = <>
                <div className={navStyle} style={{background: "var(--very-light-pink)"}}>
                    <div className={"text-center mb-2"}>
                        <div className={"flex items-center justify-center"}>
                            <SaltIcon type={props.type} isMobile={true}/>
                            <CurrencySwitcher isMobile={true}/>
                        </div>
                        <p className={'text-xs'}>BESPOKE &amp; CUSTOM CLOTHING</p>
                    </div>
                </div>
                <div className={"z-10 sticky top-0 pt-2 " + navStyle} style={{background: "var(--very-light-pink)"}}>
                    <ul className={"flex gap-5 justify-between"}>
                        <li>
                            <SidebarMenuHamburger isMobile={false}/>
                        </li>
                        <li>
                            <Link href={"/homepage/signin"}>
                                <a>
                                    <Image className={"w-6 h-6"} src={WEBASSETS + "/assets/images/user_icon.svg"} alt="user" width={iconHeightWeight} height={iconHeightWeight}/>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/new-arrivals/all"}>
                                <a>
                                    <Image src={WEBASSETS + "/assets/images/new_icon.svg"} alt="new" width={iconHeightWeight} height={iconHeightWeight}/>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/homepage/signin"}>
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
    }


    return props.isMobile ? mobileView : browserView

}

export default Navbar;

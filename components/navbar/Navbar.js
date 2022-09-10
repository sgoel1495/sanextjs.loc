/**
 * @params {isMobile} props
 * @constructor
 */
import React, {Fragment, useCallback,useEffect, useRef, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import SaltIcon from "./SaltIcon";
import SidebarMenuHamburger from "../sidebar/SidebarMenuHamburger";
import CurrencySwitcher from "./CurrencySwitcher";
import SearchMenu from "../search/SearchMenu";
import Menu from "./Menu";
import SidebarMenuCart from "../sidebar/cart/SidebarMenuCart";
import SidebarMenuUser from "../sidebar/SidebarMenuUser";
import {connect} from "react-redux";

function Navbar(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const menuRef = useRef(null);
    const subMenuRef = useRef(null);
    const [show, setShow] = useState(false)

    const toggleShow = useCallback(() => {
        if (menuRef.current && subMenuRef.current)
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
    }, [props.subMenu, toggleShow])


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
                <nav className={navStyle + " flex items-center gap-x-4 h-[80px]"}>
                    <SaltIcon type={props.type} isMobile={false}/>
                    <CurrencySwitcher type={props.type} isMobile={false}/>
                    <Menu type={props.type} isMobile={false}/>
                    <SidebarMenuUser type={props.type} isMobile={false}/>
                    <SearchMenu type={props.type} isMobile={false}/>
                    <SidebarMenuCart type={props.type} isMobile={false}/>
                </nav>
            mobileView = <Fragment>
                <div className={navStyle + " flex items-center justify-between bg-white"}>
                    <SidebarMenuHamburger/>
                    <SaltIcon isMobile={true} type={props.type}/>
                    <p className={'text-[10px] font-500 leading-none'}>BESPOKE &amp; <br/> CUSTOM CLOTHING</p>
                    <SearchMenu isMobile={true}/>
                    <SidebarMenuCart isMobile={true}/>
                </div>
                <div className="z-30 sticky top-0 pt-2 flex items-center bg-white" ref={menuRef}>
                    <Link href="/">
                        <a className="block px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1360 1024" className='w-5 h-5'>
                                <path d="M169.387067 0h1020.161199v1020.1612H169.387067z" fill="#FFFFFF"
                                      fillOpacity="0"/>
                                <path
                                    d="M949.50328 997.968135h-101.968135c-35.268978 0-64.059981-28.791003-64.059981-64.059981V734.530459c0-2.279288-1.799438-4.078725-4.078725-4.078725H583.377694c-2.279288 0-4.078725 1.799438-4.078725 4.078725v199.377695c0 35.268978-28.791003 64.059981-64.059981 64.059981h-101.968135c-35.268978 0-64.059981-28.791003-64.059981-64.059981V523.276476c0-2.279288-1.799438-4.078725-4.078726-4.078725h-53.383318c-26.391753 0-49.66448-15.835052-59.501405-40.307404-9.716963-24.472352-3.718838-52.06373 15.475164-70.17807L637.480787 39.947516c11.876289-11.276476 27.471415-17.514527 43.90628-17.514526 16.794752 0 32.749766 6.477976 44.746016 18.234301L1112.052484 416.269916c18.714152 18.114339 24.592315 45.585754 14.755389 69.818181-9.836926 24.35239-33.109653 39.947516-59.381444 39.947517h-49.784442c-2.279288 0-4.078725 1.799438-4.078726 4.078725v403.673852c0 35.508903-28.791003 64.179944-64.059981 64.179944z m-366.125586-327.497657h196.018745c35.268978 0 64.059981 28.791003 64.059981 64.059981v199.377695c0 2.279288 1.799438 4.078725 4.078725 4.078725h101.968135c2.279288 0 4.078725-1.799438 4.078726-4.078725V530.234302c0-35.268978 28.791003-64.059981 64.059981-64.059981h49.784442c0.839738 0 2.759138 0 3.718838-2.519213 0.9597-2.519213-0.239925-3.718838-0.9597-4.318651L684.266167 83.613871c-0.9597-0.9597-2.159325-1.199625-2.8791-1.199625-1.079663 0-1.9194 0.359888-2.759138 1.079662L288.989691 452.258669c-0.599813 0.599813-1.9194 1.9194-0.9597 4.438613s2.8791 2.519213 3.718837 2.519213h53.383318c35.268978 0 64.059981 28.791003 64.059981 64.059981v410.631678c0 2.279288 1.799438 4.078725 4.078726 4.078725h101.968135c2.279288 0 4.078725-1.799438 4.078725-4.078725V734.530459c0-35.268978 28.67104-64.059981 64.059981-64.059981z"
                                    fill="#333333"/>
                            </svg>
                        </a>
                    </Link>
                    <ul className="inline-flex gap-5 items-center justify-between overflow-x-scroll z-20 text-xs font-600 py-2">
                        <li className='min-w-max'>
                            <Link href="/new-arrivals/all">
                                <a>NEW IN</a>
                            </Link>
                        </li>
                        <Menu type={props.type} isMobile={true}/>
                    </ul>
                    <div
                        className="absolute w-full shadow-[7.1px_7.1px_14.6px_0.5px_rgb(0,0,0,0.08)] transition-[top] duration-700 ease-in-out"
                        style={{
                            top: show ? menuRef.current.getBoundingClientRect().bottom - 5 : 0,
                            left: show ? 0 : -1000
                        }} ref={subMenuRef}>
                        {props.subMenu}
                    </div>
                </div>
            </Fragment>;
            break

        case "menu":
        case "minimal":
            browserView =
                <nav className={navStyle + " flex items-center gap-x-4"}>
                    <SaltIcon type={props.type} isMobile={false}/>
                    <SidebarMenuHamburger type={props.type} isMobile={false}/>
                    <CurrencySwitcher type={props.type} isMobile={false}/>
                    <Menu type={"minimal"} isMobile={false} availableFilters={props.availableFilters}/>
                    <SearchMenu type={props.type} isMobile={false}/>
                    <SidebarMenuCart type={props.type} isMobile={false}/>
                </nav>
            mobileView = (
                <div className={"flex justify-between items-center bg-white/90 z-20 px-4"}>
                    <div className={"inline-flex items-center gap-x-5"}>
                        {
                            (props.userData.userServe.user_name !== "") ?
                                <div className={"grid place-items-center h-7 w-7 rounded-full bg-slate-400 text-white"}>
                                    {props.userData.userServe.user_name[0].toUpperCase()}
                                </div>
                                :
                                <Link href={"/homepage/signin"}>
                                    <a>
                                        <Image className={"w-6 h-6"} src={WEBASSETS + "/assets/images/user_icon.svg"}
                                               alt="user" width={iconHeightWeight} height={iconHeightWeight}/>
                                    </a>
                                </Link>
                        }
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
                <nav className={navStyle + " flex items-center gap-x-4 absolute bg-white/60 w-full hover:bg-white transition-colors shadow"}>
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
                            {
                                (props.userData.userServe.user_name !== "") ?
                                    <div className={"grid place-items-center h-7 w-7 rounded-full bg-slate-400 text-white"}>
                                        {props.userData.userServe.user_name[0].toUpperCase()}
                                    </div>
                                    :
                                    <Link href={"/homepage/signin"}>
                                        <a>
                                            <Image className={"w-6 h-6"} src={WEBASSETS + "/assets/images/user_icon.svg"}
                                                   alt="user" width={iconHeightWeight} height={iconHeightWeight}/>
                                        </a>
                                    </Link>
                            }
                        </li>
                        <li>
                            <Link href={"/new-arrivals/all"}>
                                <a>
                                    <Image src={WEBASSETS + "/assets/images/new_icon.svg"} alt="new"
                                           width={iconHeightWeight} height={iconHeightWeight}/>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/homepage/signin"}>
                                <a>
                                    <Image src={WEBASSETS + "/assets/images/fav_icon.svg"} alt="fav"
                                           width={iconHeightWeight} height={iconHeightWeight}/>
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
            break
    }


    return props.isMobile ? mobileView : browserView

}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    }
}

export default connect(mapStateToProps)(Navbar);

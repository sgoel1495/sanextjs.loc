import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import AppWideContext from "../../store/AppWideContext";

/**
 * @Sambhav css please
 * @params {isMobile} props
 * @constructor
 */

function AccountMenu(props) {
    const [topSpace, setTopSpace] = useState();

    useEffect(() => {
        const topHeight = document.getElementsByClassName("navigator")[0];
        setTopSpace(topHeight.offsetHeight);
    }, [])

    const mobileView = null;

    const browserView = (
        <div id="userlogindiv" className={`bg-theme-900/50 fixed inset-0 z-10`} onClick={props.closeModal} onMouseOver={props.closeModal}>
            <div className={"bg-white h-fit pb-20 flex flex-col items-end text-xs uppercase font-500 pr-20"} style={{ paddingTop: topSpace + 10 + 'px' }} onClick={e => e.stopPropagation()} onMouseOver={e => e.stopPropagation()}>
                <Link href="/users/profile">
                    <a>My Profile</a>
                </Link>
                <Link href="/users/orderhistory">
                    <a>My Orders</a>
                </Link>
                <Link href="/users/wallet">
                    <a>My Wallet</a>
                </Link>
                <Link href="/users/wallet">
                    <a>Redeem Voucher</a>
                </Link>
                <Link href="/users/favourites">
                    <a>My Favourites</a>
                </Link>
                <Link href="/users/measurements">
                    <a>My Measurements</a>
                </Link>
                <Link href="/users/my-referral">
                    <a>My Referral</a>
                </Link>
                <Link href="/users/logout">
                    <a>Logout</a>
                </Link>
            </div>
        </div>
    );

    if(topSpace == undefined) return null;
    return props.isMobile ? mobileView : browserView

}

export default AccountMenu;
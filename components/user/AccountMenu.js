import Link from "next/link";
import React, { useContext } from "react";
import AppWideContext from "../../store/AppWideContext";

/**
 * @Sambhav css please
 * @params {isMobile} props
 * @constructor
 */

function AccountMenu(props) {
    const { dataStore } = useContext(AppWideContext);

    const mobileView = null;

    const browserView = (
        <div id="userlogindiv" className={`bg-theme-900/50 fixed inset-0 z-10`} onClick={props.closeModal}>
            <div className="bg-white h-fit py-20 flex flex-col items-end text-xs uppercase font-500 pr-20" onClick={e => e.stopPropagation()}>
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

    return props.isMobile ? mobileView : browserView

}

export default AccountMenu;
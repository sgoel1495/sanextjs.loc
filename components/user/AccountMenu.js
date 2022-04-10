import Link from "next/link";
import React from "react";
import AppWideContext from "../../store/AppWideContext";

/**
 * @Sambhav css please
 * @params {isMobile} props
 * @constructor
 */

function AccountMenu(props){
    const {dataStore} = useContext(AppWideContext);

    const mobileView = null;

  const browserView = (
      <div id="userlogindiv" className={`bg-theme-900/50 fixed inset-0 z-20`}>
          <button className={`w-8 h-8 absolute right-10 top-10`} onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8`} viewBox="0 0 24 24">
                  <path
                      d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
              </svg>
          </button>
      <Link href="/users/profile">
          <a className={"leading-none"}> My Profile</a>
      </Link>
      <Link href="/users/orderhistory">
          <a className={"leading-none"}> My Orders</a>
      </Link>
      <Link href="/users/wallet">
          <a className={"leading-none"}> My Wallet</a>
      </Link>
      <Link href="/users/wallet">
          <a className={"leading-none"}> Redeem Voucher</a>
      </Link>
      <Link href="/users/favourites">
          <a className={"leading-none"}> My Favourites</a>
      </Link>
      <Link href="/users/measurements">
          <a className={"leading-none"}> My Measurements</a>
      </Link>
      <Link href="/users/my-referral">
          <a className={"leading-none"}> My Referral</a>
      </Link>
      <Link href="/users/logout">
          <a className={"leading-none"}> Logout</a>
      </Link>
    </div>
  );

  return props.isMobile ? mobileView : browserView

}

export default AccountMenu;
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

  const mobileView = <nav>
    <div>
      <SaltIcon isMobile={false}/>
      <CurrencySwitcher isMobile={false}/>
    </div>
    <div>BESPOKE &amp; CUSTOM CLOTHING</div>
    <div>
      <ul>
        <li>
          <SidebarMenuHamburger isMobile={false}/>
        </li>
        <li>
          <Link href="/homepage/signin">
            <a>
              <Image src={WEBASSETS + "/assets/images/user_icon.svg"} alt="user"/>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/new-arrivals/all">
            <a>
              <Image src={WEBASSETS + "/assets/images/new_icon.svg"} alt="new"/>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/homepage/signin">
            <a>
              <Image src={WEBASSETS + "/assets/images/fav_icon.svg"} alt="fav"/>
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
    </div>
  </nav>;


  const browserView = <nav>
    <SaltIcon isMobile={false}/>
    <SidebarMenuHamburger isMobile={false}/>
    <Menu isMobile={false}/>
    <SearchMenu isMobile={false}/>
    <CurrencySwitcher isMobile={false}/>
    <UserLoginMenu isMobile={false}/>
    <CartMenu isMobile={false}/>
  </nav>;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default Navbar;
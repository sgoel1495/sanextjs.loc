import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";

/**
 * @params {isMobile} props
 * @constructor
 */

function CartMenu(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = <div>
        <Link href="/homepage/cart">
            <a className={"leading-none"}>
                <Image src={WEBASSETS + "/assets/images/cart_icon.svg"} alt="cart" width="24" height="24"/>
                <sup>0</sup>
            </a>
        </Link>
    </div>;

    const browserView = <div>
        <Cart isMobile={false}/>
        <Image src={WEBASSETS + "/assets/images/cart.png"} alt="cart" width="24" height="24"/>
        <sup>0</sup>
    </div>;

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default CartMenu;

import Link from "next/link";
import SubMenu from "./SubMenu";
import React from 'react';

/**
 *
 * @param {isMobile} props
 * @constructor
 */

function Menu(props) {

    const browserViewStyle = "block px-4 py-1 mx-1 leading-none border-b border-transparent hover:border-black";

    const mobileView = null;
    const browserView =
        <>
            <ul className={"flex flex-1 justify-center"}>
                <li>
                    <Link href="/new-arrivals/all">
                        <a className={browserViewStyle + " bg-[#B5DDF5] text-white"}>New In</a>
                    </Link>
                </li>
                <li>
                    <Link href="/looks">
                        <a className={browserViewStyle}>Looks</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-tops">
                        <a className={browserViewStyle}>Tops</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-sweaters">
                        <a className={browserViewStyle}>Sweaters</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-shirts">
                        <a className={browserViewStyle}>Shirts</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-tunics">
                        <a className={browserViewStyle}>Tunics</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-jumpsuits">
                        <a className={browserViewStyle}>Jumpsuits</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-shorts">
                        <a className={browserViewStyle}>Shorts</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-tailored-pants">
                        <a className={browserViewStyle}>Pants</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-tailored-skirts">
                        <a className={browserViewStyle}>Skirts</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-dresses">
                        <a className={browserViewStyle}>Dresses</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop-outerwear">
                        <a className={browserViewStyle}>Outerwear</a>
                    </Link>
                </li>
                <li className={"relative group"}>
                    <span className={browserViewStyle + " group-hover:border-black"}>Accessories</span>
                    <SubMenu isMobile={false} menu="accessories"/>
                </li>
            </ul>
        </>
    ;

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default Menu;

/**
 * @params {isMobile} props
 * @constructor
 */
import React, {Fragment} from "react";
import Link from "next/link";
import Image from "next/image";

function WhySalt(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const myContainer = " container w-3/5 xl:w-2/5 mx-auto py-16"
    const featureStyle = "flex-1 text-center tracking-wide p-8"

    const mobileView = null;

    const browserView =
        <>
            <div className={myContainer + " flex items-center leading-none"}>
                <Link href="/salt/about-us/why-salt">
                    <>
                        <div className={"flex-1"}>
                            <p className={"text-[112px]"}>Why</p>
                            <p className={"text-[120px]"}>Salt?</p>
                        </div>
                        <div className={"flex-1"}>
                            <p className={"text-[60px]"}>Elegant</p>
                            <p className={"text-[60px]"}>Thoughtful</p>
                            <p className={"text-[60px]"}><span className={"text-black/50"}>&amp; </span>Classy</p>
                            <p className={"text-[30px] mt-2"}>Clothing from desk to dinner</p>
                        </div>
                    </>
                </Link>
            </div>
            <div className={myContainer + " flex"}>
                <div className={featureStyle}>
                    <Image src={WEBASSETS + "/assets/images/free-delivery.svg"} alt="free-delivery lazy" width="85" height="85"/>
                    <p>Free Shipping<br/>across India</p>
                </div>
                <div className={featureStyle + " border-x"}>
                    <Image src={WEBASSETS + "/assets/images/return.svg"} alt="free-delivery lazy" width="85" height="85"/>
                    <p>7-day<br/>Easy Return</p>
                </div>
                <div className={featureStyle}>
                    <Image src={WEBASSETS + "/assets/images/cod.svg"} alt="free-delivery lazy" width="85" height="85"/>
                    <p>COD<br/>Available</p>
                </div>
            </div>
        </>;

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default WhySalt;

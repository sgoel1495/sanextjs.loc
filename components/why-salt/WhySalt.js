/**
 * @params {isMobile} props
 * @constructor
 */
import React, {Fragment} from "react";
import Link from "next/link";
import Image from "next/image";

function WhySalt(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const myContainer = "py-20 max-w-max mx-auto"
    const featureStyle = "flex flex-col gap-3 items-center py-8 flex-1 text-center leading-none"

    const mobileView = null;

    const browserView =
        <section className={"whySalt"}>
            <div className={myContainer}>
                <div className="flex gap-20 items-center leading-none">
                    <Link href="/salt/about-us/why-salt">
                        <>
                            <div>
                                <p className={"text-8xl"}>Why</p>
                                <p className={"text-9xl"}>Salt?</p>
                            </div>
                            <div>
                                <p className={"text-6xl"}>Elegant</p>
                                <p className={"text-6xl"}>Thoughtful</p>
                                <p className={"text-6xl"}><span className={"text-black/50"}>&amp; </span>Classy</p>
                                <p className={"text-3xl mt-2"}>Clothing from desk to dinner</p>
                            </div>
                        </>
                    </Link>
                </div>
                <div className={"flex mt-16"}>
                    <div className={featureStyle}>
                        <span className={"relative block h-20 w-20"}>
                            <Image
                                src={WEBASSETS + "/assets/images/free-delivery.svg"}
                                alt="free-delivery lazy"
                                layout="fill"
                                objectFit="cover"
                            />
                        </span>
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
            </div>
        </section>;

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default WhySalt;

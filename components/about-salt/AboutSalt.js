/**
 * @params {isMobile} props
 * @constructor
 */
import Link from "next/link";
import Image from "next/image";
import React from 'react';


function AboutSalt(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const myContainer = " container w-[50%] py-16";
    const blockStyle = "text-center leading-none tracking-wide flex flex-col gap-4 items-center";
    const blockHeaderStyle = "text-center";
    const blockParaStyle = "text-center italic font-600";

    const mobileView = null;
    const browserView = (
        <div className={myContainer}>
            <div className={"grid grid-cols-3 items-center text-center mb-16"}>
                <hr/>
                <p className={"text-h2"}>About SALT</p>
                <hr/>
            </div>
            <div id="about-salt-features" className={"grid grid-cols-3 gap-x-5 gap-y-20 items-center"}>
                <Link href="/blog/about-salt/why-custom-tailored-clothing">
                    <a className={blockStyle}>
                        <Image src={WEBASSETS + "/assets/images/Made-to-measure_300.jpg"} alt="free-delivery lazy" width={"280"} height={"280"}/>
                        <p className={blockHeaderStyle}>MADE TO MEASURE</p>
                        <p className={blockParaStyle}>Custom Clothing, Tailored to you</p>
                    </a>
                </Link>

                <Link href="/blog/about-salt/styling-service">
                    <a className={blockStyle}>
                        <Image src={WEBASSETS + "/assets/images/styling-services_300.jpg"} alt="free-delivery lazy" width="280" height="280"/>
                        <p className={blockHeaderStyle}> STYLING SERVICES </p>
                        <p className={blockParaStyle}> Free Styling Sessions In-Store or Online </p>
                    </a>
                </Link>

                <Link href="/blog/about-salt/free-alteration">
                    <a className={blockStyle}>
                        <Image src={WEBASSETS + "/assets/images/free-alteration_300.jpg"} alt="free-delivery lazy" width="280" height="280"/>
                        <p className={blockHeaderStyle}> FREE ALTERATIONS </p>
                        <p className={blockParaStyle}> Alterations available at no additional cost </p>
                    </a>
                </Link>

                <Link href="/blog/about-salt/premium-fabric-quality">
                    <a className={blockStyle}>
                        <Image src={WEBASSETS + "/assets/images/premium-fabric_300.jpg"} alt="free-delivery lazy" width="280" height="280"/>
                        <p className={blockHeaderStyle}> PREMIUM FABRIC &amp; QUALITY </p>
                        <p className={blockParaStyle}> Premium Quality Fabric &amp; Finishing </p>
                    </a>
                </Link>

                <Link href="/blog/about-salt/no-inventory-no-mass-production">
                    <a className={blockStyle}>
                        <Image src={WEBASSETS + "/assets/images/minimal-wasteage.jpg"} alt="free-delivery lazy" width="280" height="280"/>
                        <p className={blockHeaderStyle}> MINIMAL WASTAGE </p>
                        <p className={blockParaStyle}> No Inventory, No Mass Production </p>
                    </a>
                </Link>
                <Link href="/blog/about-salt/no-inventory-no-mass-production">
                    <a className={blockStyle}>
                        <Image src={WEBASSETS + "/assets/images/ethical-&-fair_300.jpg"} alt="free-delivery lazy" width="280" height="280"/>
                        <p className={blockHeaderStyle}> ETHICAL & FAIR </p>
                        <p className={blockParaStyle}> Good Working Conditions </p>
                    </a>
                </Link>

                <Link href="/get-appointment">
                    <a className={blockStyle + " col-start-1 col-end-4"}>
                        <span className="block relative">
                            <Image src={WEBASSETS + "/assets/images/our_store_800_v1.jpg"} alt="free-delivery lazy" width="869" height="652"/>
                        </span>
                        <p className={blockHeaderStyle}>Book An Appointment In Store</p>
                        <p className={blockParaStyle + ' underline'}>Dlf Mega Mall, Gurgaon</p>
                    </a>
                </Link>

                <Link href="/get-virtual-appointment">
                    <a className={blockStyle + " col-start-2 col-end-3"}>
                        <p className={blockHeaderStyle}>Book A Virtual Styling Session</p>
                        <p className={blockParaStyle + ' underline'}>Video Call</p>
                    </a>
                </Link>
            </div>
        </div>);

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default AboutSalt;

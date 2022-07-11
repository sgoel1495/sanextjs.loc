/**
 * @params {isMobile} props
 * @constructor
 */
import Link from "next/link";
import Image from "next/image";
import React from 'react';
import BlockHeader from "../common/blockHeader";


const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

const actualData = [
    {
        link: "/blog/about-salt/why-custom-tailored-clothing",
        image: WEBASSETS + "/assets/images/Made-to-measure_300.jpg",
        title: "Made to Measure",
        description: "Custom Clothing, Tailored to you"
    },
    {
        link: "/blog/about-salt/styling-service",
        image: WEBASSETS + "/assets/images/styling-services_300.jpg",
        title: "Styling Services",
        description: "Free Styling Sessions In-Store or Online"
    },
    {
        link: "/blog/about-salt/free-alteration",
        image: WEBASSETS + "/assets/images/free-alteration_300.jpg",
        title: "Free Alteration",
        description: "Alterations available at no additional cost"
    },
    {
        link: "/blog/about-salt/premium-fabric-quality",
        image: WEBASSETS + "/assets/images/premium-fabric_300.jpg",
        title: "PREMIUM FABRIC & QUALITY",
        description: "Premium Quality Fabric & Finishing"
    },
    {
        link: "/blog/about-salt/no-inventory-no-mass-production",
        image: WEBASSETS + "/assets/images/minimal-wasteage.jpg",
        title: "MINIMAL WASTAGE",
        description: "No Inventory, No Mass Production"
    },
    {
        link: "/blog/about-salt/no-inventory-no-mass-production",
        image: WEBASSETS + "/assets/images/ethical-&-fair_300.jpg",
        title: "ETHICAL & FAIR",
        description: "Good Working Conditions"
    },
]

function AboutSaltHomepage(props) {
    const blockStyle = "leading-none flex flex-col gap-5";
    const blockHeaderStyle = "text-center uppercase";
    const blockParaStyle = "text-center tracking-wider font-cursive italic font-700";

    const mobileView = null;

    const browserView = (
        <section className={"aboutSalt"}>
            <div className={"max-w-[50vw] mx-auto pb-20"}>
                <BlockHeader
                    line
                    blockHeaderStyle={"bg-white"}
                    space={"py-10"}
                    titleStyle={"text-h2"}
                >
                    About SALT
                </BlockHeader>
                <div id="about-salt-features" className={"grid grid-cols-3 gap-x-5 gap-y-16 items-center"}>
                    {actualData.map((item, index) => {
                        return (
                            <Link href={item.link} key={index}>
                                <a className={blockStyle}>
                                    <span className={"relative block h-[300px] w-full"}>
                                        <Image
                                            src={item.image}
                                            alt={item.title + " lazy"}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </span>
                                    <p className={blockHeaderStyle}>{item.title}</p>
                                    <p className={blockParaStyle}>{item.description}</p>
                                </a>
                            </Link>
                        )
                    })}
                    <Link href="/get-appointment">
                        <a className={blockStyle + " col-start-1 col-end-4"}>
                            <span className="block relative h-[650px] w-full">
                                <Image
                                    src={WEBASSETS + "/assets/images/our_store_800_v1.jpg"}
                                    alt="free-delivery lazy"
                                    layout="fill"
                                    objectFit="cover"
                                />
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
            </div>
        </section>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default AboutSaltHomepage;

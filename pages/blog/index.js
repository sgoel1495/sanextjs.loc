import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import React from "react";
import {connect} from "react-redux";
import Footer from "../../components/footer/Footer";
import Image from "next/image";
import Link from "next/link";

function BlogPage({isMobile}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const items = [
        {
            img: "/assets/images/Ace-Waist-Up_300.jpg",
            label: "ace waist-up",
            title: "Ace waist-up dressing while you Work from home",
            link: "/blog/ace-waist-up/ace-waist-up"
        }, {
            img: "/assets/images/Decoding_300.jpg",
            label: "decoding the best looks in linen",
            title: "Decoding the best looks in linen",
            link: "/blog/decoding-the-best-looks-in-linen/decoding-the-best-looks-in-linen"
        }, {
            img: "/assets/images/made-to-measure_800.jpg",
            label: "about salt",
            title: "Why Custom & Tailored Clothing?",
            link: "/blog/about-salt/why-custom-tailored-clothing"
        }, {
            img: "/assets/images/styling_service_800.jpg",
            label: "about salt",
            title: "Styling Services",
            link: "/blog/about-salt/styling-service"
        }, {
            img: "/assets/images/free_alteration_800.jpg",
            label: "about salt",
            title: "Free Alterations",
            link: "/blog/about-salt/free-alteration"
        }, {
            img: "/assets/images/premium_fabric_quality_800.jpg",
            label: "about salt",
            title: "Premium Fabric & Quality",
            link: "/blog/about-salt/premium-fabric-quality"
        }, {
            img: "/assets/images/minimal-wasteage_800.jpg",
            label: "about salt",
            title: "No Inventory, No Mass Production",
            link: "/blog/about-salt/no-inventory-no-mass-production"
        }, {
            img: "/assets/images/ethical-fair_800.jpg",
            label: "about salt",
            title: "Ethical & Fair Treatment",
            link: "/blog/about-salt/ethical-fair-treatment"
        }
    ]
    return <>
        <PageHead url="/blog" id="blog" isMobile={isMobile}/>
        <Header type={isMobile ? "minimal" : ""} isMobile={isMobile}/>
        <div className={"grid " + [isMobile ? "grid-cols-1 gap-10 mt-24" : "grid-cols-3 container mt-24 gap-32"]}>
            {
                items.map((item, index) =>
                    <Link key={index} href={item.link}>
                        <a>
                            <span className={"block relative w-full aspect-square"}>
                                <Image src={WEBASSETS + item.img} layout={"fill"} objectFit={`cover`}/>
                                <span className={"absolute bottom-0 right-12 translate-y-1/2 "}>
                                    <span className={"block relative h-12 aspect-square"}>
                                        <Image src={WEBASSETS + "/assets/images/black_arrow.svg"} layout={"fill"} objectFit={`cover`}/>
                                    </span>
                                </span>
                            </span>
                            <div className={"mx-3"}>
                                <div className={"text-xs text-[#222] uppercase my-4"}>{item.label}</div>
                                <div className={"font-600 capitalize font-cursive tracking-wide "+[isMobile?"text-lg":"text-[28px]"]}>{item.title}</div>
                            </div>
                        </a>
                    </Link>
                )
            }
        </div>
        {
            isMobile && <Footer isMobile={true}/>
        }
    </>
}

const mapStateToProps = (state) => {
    return {
        isMobile: state.appConfig.isMobile
    }
}

export default connect(mapStateToProps)(BlogPage);
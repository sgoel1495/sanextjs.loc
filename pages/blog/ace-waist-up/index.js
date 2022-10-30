import React from 'react';
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import {connect} from "react-redux";
import Image from "next/image";
import Link from "next/link";

const Index = ({isMobile}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <>
            <PageHead url="/bolg/ace-waist-up" id="ace-waist-up" isMobile={isMobile}/>
            <Header type={isMobile ? "minimal" : ""} isMobile={isMobile}/>
            <div className={"relative w-full aspect-[12/5]"}>
                <Image src={WEBASSETS + "/assets/images/Ace-Waist-Up_banner.jpg"} layout={`fill`} objectFit={`cover`}/>
            </div>
            <div className={"pb-16"}>
                <div className={"px-12 py-6 "+[isMobile?"":"text-center"]}>
                    <p className={"text-2xl tracking-wider font-900 font-cursive"}>Ace Waist-Up</p>
                    <p className={"text-[#444] "+[isMobile?"tracking-wider font-900":""]}>Ace waist-up dressing while you Work from home</p>
                </div>
                <div className={isMobile?"":"grid grid-cols-3 container gap-8"}>
                    <Link href={"/blog/ace-waist-up/ace-waist-up"}>
                        <a>
                    <span className={"block relative w-full aspect-square"}>
                        <Image src={WEBASSETS + "/assets/images/Ace-Waist-Up_300.jpg"} layout={"fill"} objectFit={`cover`}/>
                        <span className={"absolute bottom-0 right-12 translate-y-1/2 "}>
                            <span className={"block relative h-12 aspect-square"}>
                                <Image src={WEBASSETS + "/assets/images/black_arrow.svg"} layout={"fill"} objectFit={`cover`}/>
                            </span>
                        </span>
                    </span>
                            <div className={isMobile ? "mx-12" : "mx-3"}>
                                <div className={"text-[10px] text-[#222] uppercase my-4 " + [isMobile ? " mb-1 tracking-widest font-800" : ""]}>ace waist-up</div>
                                <div className={"font-600 capitalize font-cursive tracking-wider " + [isMobile ? "text-lg font-900 tracking-wide" : "text-[28px]"]}>Ace waist-up dressing
                                    while you Work from home
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>

            {
                isMobile && <Footer isMobile={true}/>
            }

        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isMobile: state.appConfig.isMobile
    }
}

export default connect(mapStateToProps)(Index);